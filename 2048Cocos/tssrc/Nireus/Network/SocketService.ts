import WebSocketItem from "./WebSocketItem";
import NetData from "./NetData";
import { NetDataFunc, ThrowNetDataFunc, SocketServiceStruct } from "./Types";
import { VoidFunc } from "../CommonTypes";
import * as _ from "lodash";

export default class SocketService {
    public static getInstance(): SocketService {
        return this._instance || (this._instance = new SocketService());
    }

    private static _instance: SocketService;
    private _socket: WebSocketItem;
    private _on_connect_callback: VoidFunc;
    private _on_connect_error_callback: VoidFunc;
    private _on_connect_close_callback: VoidFunc;
    private _on_throw_callback: ThrowNetDataFunc;

    private constructor() {
        this._socket = new WebSocketItem();

        this._socket.setOnConnect(_.bind(this._onSocketConnect, this));
        this._socket.setOnClose(_.bind(this._onSocketClose, this));
        this._socket.setOnError(_.bind(this._onSocketError, this));
        this._socket.setOnThrow(_.bind(this._onSocketThrow, this));
    }

    public doConnect() {
        this._socket.doConnect();
    }

    public disConnect() {
        this._socket.disConnect();
    }

    public isConnected(): boolean {
        return this._socket.isConnected();
    }

    public initWithSocketServiceStruct(data: SocketServiceStruct) {
        this.setTarget(data.host, data.port, data.protocol);
        this.setOnConnect(data.on_connect_callback);
        this.setOnClose(data.on_connect_close_callback);
        this.setOnError(data.on_connect_error_callback);
        this.setOnThrow(data.on_throw_callback);
    }

    public setTarget(host: string, port: number, protocol = "ws") {
        this._socket.setTarget(protocol, host, port);
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
        this._socket.sendProc(netdata);
    }

    public callProc(netdata: NetData, succ_reply: NetDataFunc, fail_reply?: NetDataFunc) {
        this._socket.callProc(netdata, succ_reply, fail_reply);
    }

    public registerNotify(proc: number, notify_func: NetDataFunc) {
        this._socket.registerNotify(proc, notify_func);
    }

    public deleteNotify(proc: number) {
        this._socket.deleteNotify(proc);
    }

    public _onSocketConnect() {
        if (this._on_connect_callback) {
            this._on_connect_callback();
        } else {
            cc.log("onSocketConnect");
        }
    }

    public _onSocketClose() {
        if (this._on_connect_close_callback) {
            this._on_connect_close_callback();
        } else {
            cc.log("onSocketClose");
            this._reConnect();
        }
    }

    public _onSocketError() {
        if (this._on_connect_error_callback) {
            this._on_connect_error_callback();
        } else {
            cc.log("onSocketFail");

            this._reConnect();
        }
    }

    public _onSocketThrow(result: number, netdata: NetData) {
        if (this._on_throw_callback) {
            this._on_throw_callback(result, netdata);
        } else {
            cc.log("onSocketThrow");
        }
    }

    private _reConnect() {
        this._socket.doConnect();
    }
}
