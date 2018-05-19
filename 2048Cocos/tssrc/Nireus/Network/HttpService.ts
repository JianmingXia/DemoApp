import { ResponseResult, ResponseResultFunc } from "./Types";
import { StringMap } from "../CommonTypes";
import * as _ from "lodash";
import * as Promise from "bluebird";
import { ContentType } from "./NetConst";
import Utils from "../../Common/Utils";

enum RequestMode {
    GET = "GET",
    POST = "POST"
}

type RequestParam = {
    url: string;
    params?: StringMap;
    callback_func?: ResponseResultFunc;
    headers?: StringMap;
    ignore_common_cb?: boolean;
};

type SendRequestParam = {
    url: string;
    params?: StringMap;
    headers?: StringMap;
};

export default class HttpService {
    public static getInstance(): HttpService {
        return this._instance || (this._instance = new HttpService());
    }

    private static _instance: HttpService;
    // 通用回调
    private _request_callback: ResponseResultFunc;

    private constructor() {
    }

    // 注册全局通用回调
    public registerCommonCallback(callback_func: ResponseResultFunc) {
        if (callback_func) {
            this._request_callback = callback_func;
        }
    }

    public get(request_param: RequestParam) {
        this._send(request_param, RequestMode.GET).then(
            _.bind(this._onResolve, this, request_param),
            _.bind(this._onReject, this, request_param)
        );
    }

    public post(request_param: RequestParam) {
        this._send(request_param, RequestMode.POST).then(
            _.bind(this._onResolve, this, request_param),
            _.bind(this._onReject, this, request_param)
        );
    }

    public syncLoad(url: string, content_type = ContentType.COMMON) {
        let sync_result = this._syncLoad(url);

        if (content_type === ContentType.COMMON) {
            content_type = this._getTypeBySuffix(url);
        }
        
        switch (content_type) {
            case ContentType.JSON:
                return Utils.parseJson(sync_result);
            default:
                return sync_result;
        }
    }

    private _getXMLHttpRequest() {
        return XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
    }

    private _send({ url, headers = {}, params = {} }: SendRequestParam, mode: string) {
        return new Promise((resolve: ResponseResultFunc, reject: ResponseResultFunc) => {
            const xhr = this._getXMLHttpRequest();
            xhr.withCredentials = true;

            xhr.onload = () => {
                resolve(this._succResponse(xhr));
            };

            xhr.onerror = () => {
                reject(this._errorResponse(xhr, "Failed to request."));
            };

            xhr.ontimeout = () => {
                reject(this._errorResponse(xhr, "Request took longer than expected."));
            };

            // add extra headers
            let json_mode = false;

            const deep_headers = _.cloneDeep(headers);
            if (mode !== RequestMode.GET) {
                let found = false;
                if (deep_headers) {
                    _.keys(deep_headers).map((key: string) => {
                        if (key.toLowerCase() === "content-type") {
                            found = true;
                            if (deep_headers[key] === "application/json") {
                                json_mode = true;
                            }
                        }
                    });
                }

                if (found === false) {
                    deep_headers["Content-Type"] = "application/x-www-form-urlencoded";
                }
            }

            // add extra params
            let params_str = "";
            if (typeof params === "object") {
                if (json_mode) {
                    params_str = JSON.stringify(params);
                } else {
                    params_str = this._queryParams(params);
                }
            }

            if (params_str && mode === RequestMode.GET) {
                url = url + (url.indexOf("?") !== -1 ? "&" : "?") + params_str;
                params_str = "";
            }

            xhr.open(mode, url);

            if (deep_headers) {
                _.keys(deep_headers).map((key: string) => {
                    xhr.setRequestHeader(key, deep_headers[key]);
                });
            }

            xhr.send(params_str);
        });
    }

    private _onResolve(request_param: RequestParam, data: ResponseResult) {
        this._onCallback(request_param, data);
    }

    private _onReject(request_param: RequestParam, data: ResponseResult) {
        this._onCallback(request_param, data);
    }

    private _onCallback(request_param: RequestParam, data: ResponseResult) {
        if (request_param.ignore_common_cb !== true) {
            this._requestCommonCallback(data);
        }

        if (request_param.callback_func) {
            request_param.callback_func(data);
        }
    }

    private _requestCommonCallback(data: ResponseResult) {
        if (this._request_callback) {
            this._request_callback(data);
        }
    }

    private _queryParams(params: StringMap = {}) {
        return _.keys(params)
            .map((k: string) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
            .join("&");
    }

    private _succResponse(xhr: XMLHttpRequest): ResponseResult {
        return {
            data: xhr.responseText,
            headers: xhr.getAllResponseHeaders(),
            headerMap: (): StringMap => this._getHeaderMap(xhr.getAllResponseHeaders()),
            json: <T>() => this._parseJson(xhr.responseText) as T,
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            status_text: xhr.statusText,
        };
    }

    private _errorResponse(xhr: XMLHttpRequest, message?: string): ResponseResult {
        return {
            data: message || xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            headerMap: (): StringMap => this._getHeaderMap(xhr.getAllResponseHeaders()),
            json: <T>() => this._parseJson(message || xhr.statusText) as T,
            ok: false,
            status: xhr.status,
            status_text: xhr.statusText,
        };
    }

    private _parseJson(data: string) {
        try {
            return JSON.parse(data);
        } catch (e) {
            cc.log(e.toString());
        }
    }

    private _getHeaderMap(headers: string): StringMap {
        let arr = headers.trim().split(/[\r\n]+/);

        const header_map: StringMap = {};
        arr.forEach((line: string) => {
            let parts = line.split(": ");
            let header = parts.shift();
            let value = parts.join(": ");

            if (header) {
                header_map[header] = value;
            }
        });

        return header_map;
    }

    private _syncLoad(url: string) {
        let xhr = this._getXMLHttpRequest();

        xhr.open("GET", url, false);
        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            // IE-specific logic here
            xhr.setRequestHeader("Accept-Charset", "utf-8");
        } else {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("text\/plain; charset=utf-8");
            }
        }

        xhr.send();
        if (xhr.readyState === 4 && xhr.status === 200) {
            return xhr.responseText;
        }

        return undefined;
    }

    private _getTypeBySuffix(url: string) {
        if (url.endsWith(".json")) {
            return ContentType.JSON;
        } else {
            return ContentType.COMMON;
        }
    }
}
