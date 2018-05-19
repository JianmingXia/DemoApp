import UTF8 from "./UTF8";
import { TypedArraySize } from "./NetConst";

export default class ByteArray {
    private _bytes: Uint8Array;
    private _data: DataView;
    private _read_position: number;
    private _write_position: number;
    private _is_little_endian = true;

    constructor() {
        this.bytes = new Uint8Array(0);
        this._read_position = 0;
        this._write_position = 0;
    }

    set bytes(bytes: Uint8Array) {
        this._bytes = bytes;
        this._data = new DataView(this._bytes.buffer);
    }

    get bytes() {
        return this._bytes;
    }

    get length() {
        return this._bytes.length;
    } 
    
    public get bytesAvailable(): number {
        return this._data.byteLength - this._read_position;
    }

    get read_position() {
        return this._read_position;
    }

    get write_position() {
        return this._write_position;
    }

    set write_position(write_position: number) {
        this._write_position = write_position;
    }

    get is_little_endian() {
        return this._is_little_endian;
    }

    public writeBool(value: boolean) {
        this._ensureBuffer(TypedArraySize.SIZE_OF_BOOLEAN);

        this._bytes[this._write_position++] = value ? 1 : 0;
    }

    public writeByte(value: number) {
        this._ensureBuffer(TypedArraySize.SIZE_OF_INT8);
        this._bytes[this._write_position++] = value & 0xff;
    }

    public writeShort(value: number) {
        this._ensureBuffer(TypedArraySize.SIZE_OF_INT16);
        this._data.setInt16(this._write_position, value, this._is_little_endian);
        this._write_position += TypedArraySize.SIZE_OF_INT16;
    }

    public writeInt(value: number) {
        this._ensureBuffer(TypedArraySize.SIZE_OF_INT32);
        this._data.setInt32(this._write_position, value, this._is_little_endian);
        this._write_position += TypedArraySize.SIZE_OF_INT32;
    }

    public writeFloat(value: number) {
        this._ensureBuffer(TypedArraySize.SIZE_OF_FLOAT32);
        this._data.setFloat32(this._write_position, value, this._is_little_endian);
        this._write_position += TypedArraySize.SIZE_OF_FLOAT32;
    }

    public writeUTF(value: string) {
        const valueHex = UTF8.encode(value);
        let length = valueHex.length;
        this._ensureBuffer(TypedArraySize.SIZE_OF_INT16 + length);

        let tmp_data = [];
        for (let each_char of valueHex) {
            tmp_data.push(each_char.charCodeAt(0));
        }

        this._data.setUint16(this._write_position, length, this._is_little_endian);
        this._write_position += TypedArraySize.SIZE_OF_INT16;

        this._bytes.set(new Uint8Array(tmp_data), this._write_position);
        this._write_position += length;
    }

    public writeString(value: string) {
        this.writeUTF(value);
    }

    public writeInt64(value: number) {
        this.writeUTF(value.toString());
    }

    public writeBytes(bytes: ByteArray, offset = 0, length = 0) {
        let writable_length: number;

        if (offset < 0 || length < 0) {
            return;
        }
        if (length === 0) {
            writable_length = bytes.length - offset;
        } else {
            writable_length = Math.min(bytes.length - offset, length);
        }

        if (writable_length > 0) {
            this._ensureBuffer(writable_length);
            this._bytes.set(bytes.bytes.subarray(offset, offset + writable_length), this._write_position);
            this._write_position += writable_length;
        }
    }

    public readBool() {
        if (this._validateRead(TypedArraySize.SIZE_OF_BOOLEAN)) {
            return !!this._bytes[this._read_position++];
        }
    }

    public readByte() {
        if (this._validateRead(TypedArraySize.SIZE_OF_INT8)) {
            return this._data.getInt8(this._read_position++);
        }
    }

    public readShort() {
        if (this._validateRead(TypedArraySize.SIZE_OF_INT16)) {
            let value = this._data.getInt16(this._read_position, this._is_little_endian);
            this._read_position += TypedArraySize.SIZE_OF_INT16;

            return value;
        }
    }

    public readInt() {
        if (this._validateRead(TypedArraySize.SIZE_OF_INT32)) {
            let value = this._data.getInt32(this._read_position, this._is_little_endian);
            this._read_position += TypedArraySize.SIZE_OF_INT32;

            return value;
        }
    }

    public readFloat() {
        if (this._validateRead(TypedArraySize.SIZE_OF_FLOAT32)) {
            let value = this._data.getFloat32(this._read_position, this._is_little_endian);
            this._read_position += TypedArraySize.SIZE_OF_FLOAT32;

            return value;
        }
    }

    public readUTF() {
        let length = this.readShort();
        if (length > 0) {
            return this.readUTFBytes(length);
        } else {
            return "";
        }
    }

    public readInt64() {
        return parseInt(this.readUTF(), 10);
    }

    public readString() {
        return this.readUTF();
    }

    public readUTFBytes(length: number) {
        if (this._validateRead(length)) {
            let bytes = new Uint8Array(this._data.buffer, this._data.byteOffset + this._read_position, length);

            let str = "";
            for (let i = 0; i < length; i++) {
                str += String.fromCharCode(this._bytes[this._read_position + i]);
            }

            this._read_position += length;
            return UTF8.decode(str);
        }
    }

    public readBytes(bytes: ByteArray, offset = 0, length = 0) {
        let available = this.bytesAvailable;
        if (available < 0 || offset < 0 || length < 0) {
            return;
        }
        if (length === 0) {
            length = available;
        } else if (length > available) {
            return;
        }

        bytes._ensureBuffer(offset + length, true);
        bytes._bytes.set(this._bytes.subarray(this._read_position, this._read_position + length), offset);
        bytes.write_position = offset + length;

        this._read_position += length;
    }

    protected _ensureBuffer(write_len: number, ignore_write_position = false) {
        let offset = ignore_write_position ? 0 : this._write_position;
        if (this.length < write_len + offset) {
            let tmp: Uint8Array;

            tmp = new Uint8Array(offset + write_len);

            tmp.set(this._bytes);
            this.bytes = tmp;
        }
    }

    protected _validateRead(read_len: number) {
        const length = this.length;
        if (length > 0 && read_len <= this.bytesAvailable) {
            return true;
        } else {
            console.log("ByteArray::_validateRead not long enough");
        }
    }
}
