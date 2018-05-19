import { ProcType, SocketConst, PackType } from "./NetConst";
import NetData from "./NetData";
import { NetDataFunc, NetDataFuncMap, ThrowNetDataFunc } from "./Types";
import { VoidFunc } from "../CommonTypes";

export default class WebSocketItem {
    private _protocol: string;
    private _host: string;
    private _port: number;
    private _socket_item: WebSocket;
    private _on_connect_callback: VoidFunc;
    private _on_connect_error_callback: VoidFunc;
    private _on_connect_close_callback: VoidFunc;
    private _on_throw_callback: ThrowNetDataFunc;
    private _notify_function_map: NetDataFuncMap;
    private _reply_succ_function_map: NetDataFuncMap;
    private _reply_fail_function_map: NetDataFuncMap;

    constructor() {
        this._protocol = "";
        this._host = "";
        this._port = 0;

        this._notify_function_map = {};
        this._reply_succ_function_map = {};
        this._reply_fail_function_map = {};
    }

    public setTarget(protocol: string, host: string, port: number) {
        this._protocol = protocol;
        this._host = host;
        this._port = port;
    }

    public doConnect() {
        if (this._socket_item &&
            (this._socket_item.readyState === WebSocket.CONNECTING ||
                this._socket_item.readyState === WebSocket.OPEN)) {
            return;
        }

        this._socket_item = new WebSocket(`${this._protocol}://${this._host}:${this._port}`);
        this._socket_item.onopen = this._onSocketOpen.bind(this);
        this._socket_item.onerror = this._onSocketError.bind(this);
        this._socket_item.onclose = this._onSocketClose.bind(this);
        this._socket_item.onmessage = this._onSocketMessage.bind(this);
    }

    public isConnected(): boolean {
        return this._socket_item.readyState === WebSocket.OPEN;
    }

    public disConnect() {
        this._socket_item.close();
    }

    public setOnConnect(on_connect_func: VoidFunc) {
        this._on_connect_callback = on_connect_func;
    }

    public setOnClose(on_connect_close: VoidFunc) {
        this._on_connect_close_callback = on_connect_close;
    }

    public setOnError(on_connect_error: VoidFunc) {
        this._on_connect_error_callback = on_connect_error;
    }

    public setOnThrow(on_throw_func: ThrowNetDataFunc) {
        this._on_throw_callback = on_throw_func;
    }

    public sendProc(netdata: NetData) {
        this._socket_item.send(netdata.getData());
    }

    public callProc(netdata: NetData, succ_reply: NetDataFunc, fail_reply: NetDataFunc) {
        netdata.pack_type = PackType.PACK_TYPE__SYNCPROC;

        this._registerReply(netdata.proc, netdata.client_order, succ_reply, fail_reply);

        this._socket_item.send(netdata.getData());
    }

    public registerNotify(proc: number, notify_func: NetDataFunc) {
        if (notify_func) {
            this._notify_function_map[proc] = notify_func;
        }
    }

    public deleteNotify(proc: number) {
        if (this._notify_function_map.hasOwnProperty(proc.toString())) {
            delete this._notify_function_map[proc];
        }
    }

    private _onSocketOpen(event: Event) {
        cc.log("websocket-init-onopen" + event);

        if (this._on_connect_callback) {
            this._on_connect_callback();
        }
    }

    private _onSocketError(event: Event) {
        cc.log("websocket-init-onopen event = " + event);

        if (this._on_connect_error_callback) {
            this._on_connect_error_callback();
        }
    }

    private _onSocketClose(event: Event) {
        cc.log("websocket-init-onclose" + event);

        if (this._on_connect_close_callback) {
            this._on_connect_close_callback();
        }
    }

    private _onSocketMessage(event: MessageEvent) {
        const response = event.data;
        cc.log("onCallMessage receive a data");

        this._bin2Netdata(response);
    }

    private _bin2Netdata(binStream: Blob) {
        if (binStream.size < 19) {
            cc.log("Illegal response");
            return;
        }

        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            let netdata = new NetData();

            let stream = new Uint8Array(fileReader.result);
            netdata.initWithStream(stream);

            if (netdata.pack_type === PackType.PACK_TYPE__PROCREPLY) {
                this._onReply(netdata);
            } else if (netdata.pack_type === PackType.PACK_TYPE__DISPATCH) {
                this._onReceive(netdata);
            }
        };

        fileReader.readAsArrayBuffer(binStream);
    }

    private _registerReply(proc: number, order: number, succ_reply: NetDataFunc, fail_reply: NetDataFunc) {
        if (succ_reply && false === this._reply_succ_function_map.hasOwnProperty(order.toString())) {
            this._reply_succ_function_map[order] = succ_reply;
        }

        if (fail_reply && false === this._reply_fail_function_map.hasOwnProperty(proc.toString())) {
            this._reply_fail_function_map[proc] = fail_reply;
        }
    }

    private _onReply(netdata: NetData) {
        let proc = netdata.proc;

        // TODO：需要跟后端约定
        let result = netdata.readShort();

        if (result === SocketConst.SOCKET_RESULT_SUCC) {
            let order = netdata.client_order;
            if (this._reply_succ_function_map.hasOwnProperty(order.toString())) {
                this._reply_succ_function_map[order](netdata);
            }
        } else if (result === SocketConst.SOCKET_RESULT_FAIL) {
            if (this._reply_fail_function_map.hasOwnProperty(proc.toString())) {
                this._reply_fail_function_map[proc](netdata);
            }
        } else {
            if (this._on_throw_callback) {
                this._on_throw_callback(result, netdata);
            }
        }

        delete this._reply_succ_function_map[netdata.client_order];
    }

    private _onReceive(netdata: NetData) {
        let proc = netdata.proc;

        if (this._notify_function_map.hasOwnProperty(proc.toString())) {
            this._notify_function_map[proc](netdata);
        }
    }
}
