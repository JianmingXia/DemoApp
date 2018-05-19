import { PackType, ProcType, TypedArraySize } from "./NetConst";
import UTF8 from "./UTF8";
import ByteArray from "./ByteArray";

export default class NetData extends ByteArray {
    private static _s_client_order = 0;
    // 1同步，4异步
    private _pack_type: PackType;
    // 协议类型，为0就好
    private _proc_type: ProcType;
    // 协议号
    private _proc: number;
    // 包id,区分包，自增
    private _client_order: number;
    // 链接id，用于区分链接，可忽略
    private _client_id: number;

    constructor() {
        super();

        this._pack_type = PackType.PACK_TYPE__ASYNCPROC;
        this._proc_type = ProcType.PROC_TYPE__USER;
        this._proc = 0;
        this._client_order = 0;
        this._client_id = 0;
    }

    public initWithBuf(buf: string, buf_size: number) {
        const stream = new Uint8Array(buf_size);
        for (let i = 0; i < buf_size; ++i) {
            stream[i] = buf.charCodeAt(i);
        }

        this._initWithStream(stream);
    }

    public initWithStream(stream: Uint8Array) {
        this._initWithStream(stream);
    }

    set client_order(client_order: number) {
        this._client_order = client_order;
    }

    get client_order() {
        if (this._client_order === 0) {
            this._client_order = ++NetData._s_client_order;
        }

        return this._client_order;
    }

    set proc_type(proc_type: ProcType) {
        this._proc_type = proc_type;
    }

    get proc_type() {
        return this._proc_type;
    }

    set pack_type(pack_type: PackType) {
        this._pack_type = pack_type;
    }

    get pack_type() {
        return this._pack_type;
    }

    set proc(value: number) {
        this._proc = value;
    }

    get proc() {
        return this._proc;
    }

    set client_id(client_id: number) {
        this._client_id = client_id;
    }

    public getData() {
        const headLen = 18;
        let bodyLen = this.length;

        let send_data = new ArrayBuffer(headLen + bodyLen);

        let offset = 0;
        this.bpack(TypedArraySize.SIZE_OF_INT8, this._pack_type, send_data, offset);
        offset += TypedArraySize.SIZE_OF_INT8;

        this.bpack(TypedArraySize.SIZE_OF_INT8, this._proc_type, send_data, offset);
        offset += TypedArraySize.SIZE_OF_INT8;

        this.bpack(TypedArraySize.SIZE_OF_INT32, this._proc, send_data, offset);
        offset += TypedArraySize.SIZE_OF_INT32;

        this.bpack(TypedArraySize.SIZE_OF_INT32, this._client_order, send_data, offset);
        offset += TypedArraySize.SIZE_OF_INT32;

        this.bpack(TypedArraySize.SIZE_OF_INT32, this._client_id, send_data, offset);
        offset += TypedArraySize.SIZE_OF_INT32;

        this.bpack(TypedArraySize.SIZE_OF_INT32, bodyLen, send_data, offset);
        offset += TypedArraySize.SIZE_OF_INT32;

        let body = new Uint8Array(send_data, offset);
        body.set(this.bytes);

        return send_data;
    }

    public bpack(type: TypedArraySize, data: number, buffer: ArrayBuffer, offset: number) {
        if (offset === undefined || offset < 0) {
            offset = 0;
        }

        switch (type) {
            case TypedArraySize.SIZE_OF_INT8:
                let buf8 = new Uint8Array(buffer, offset);
                buf8[0] = data;
                break;
            case TypedArraySize.SIZE_OF_INT32:
                let buf32 = new Uint8Array(buffer, offset, TypedArraySize.SIZE_OF_INT32);
                let dataview = new DataView(buf32.buffer);
                dataview.setInt32(offset, data, this.is_little_endian);
                break;
            default:
                break;
        }
    }

    private _initWithStream(stream: Uint8Array) {
        let offset = 0;
        this._pack_type = stream[offset++];
        this._proc_type = stream[offset++];

        let stream_data = new DataView(stream.buffer);
        this._proc = stream_data.getInt32(offset, this.is_little_endian);
        offset += TypedArraySize.SIZE_OF_INT32;

        this._client_order = stream_data.getInt32(offset, this.is_little_endian);
        offset += TypedArraySize.SIZE_OF_INT32;

        this._client_id = stream_data.getInt32(offset, this.is_little_endian);
        offset += TypedArraySize.SIZE_OF_INT32;

        const body_len = stream_data.getInt32(offset, this.is_little_endian);
        offset += TypedArraySize.SIZE_OF_INT32;

        if (body_len !== stream.length - offset) {
            console.log("NetData::_initWithStream stream maybe have a problem");
        }

        let tmp = new Uint8Array(stream.length - offset);
        tmp.set(stream.subarray(offset, stream.length));
        this.bytes = tmp;
    }
}
