import NetData from "./NetData";
import { VoidFunc, StringMap } from "../CommonTypes";

// Function
export type NetDataFunc = (netdata: NetData) => void;

export type ThrowNetDataFunc = (result: number, netdata: NetData) => void;

export type NetDataFuncMap = {
    [propname: number]: NetDataFunc;
};

export type ResponseResultFunc = (data: ResponseResult) => void;

// object
export type SocketServiceStruct = {
    host: string;
    port: number;
    protocol?: string;
    on_connect_callback?: VoidFunc;
    on_connect_error_callback?: VoidFunc;
    on_connect_close_callback?: VoidFunc;
    on_throw_callback?: ThrowNetDataFunc;
};

export type ResponseResult = {
    readonly ok: boolean;
    readonly status: number;
    readonly status_text: string;
    readonly data: string;
    readonly headers: string;
    readonly json: <T>() => T;
    readonly headerMap: () => StringMap;
};
