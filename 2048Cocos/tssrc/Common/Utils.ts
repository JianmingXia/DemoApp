import { ResponseResult } from "../Nireus/Network/Types";
import NetData from "../Nireus/Network/NetData";
import SocketService from "../Nireus/Network/SocketService";

export default class Utils {
    public static parseJson(str: string) {
        try {
            return JSON.parse(str);
        } catch (e) {
            cc.log(`Utils::parseJson catch exception ${e}`);
        }
    }

    public static add(a: number, b: number) {
        return a + b;
    }

    public static commonCallback(data: ResponseResult) {
        cc.log(data);
    }

    public static succ(data: ResponseResult) {
        cc.log(data);
        cc.log(data.json());
        cc.log(data.headerMap());
    }

    public static A() {
        cc.log(111);
    }

    public static B() {
        this.A();
    }

    public static showLayerActionFunction(layer: cc.Node, alpha: number) {
        layer.setOpacity(0);
        let fadeto = cc.fadeTo(1, alpha);
        layer.runAction(fadeto);
    }

    public static onSocketCallback() {
        let netdata = new NetData();
        netdata.proc = 10000;
        netdata.writeBool(true);
        netdata.writeBool(false);
        netdata.writeByte(87);
        netdata.writeShort(87);
        netdata.writeInt(87000000);
        netdata.writeFloat(87.87);
        netdata.writeUTF("hahah𠮷hahah啦啦啦aha啦啦ha");
        netdata.writeInt64(111111111111111);
        netdata.writeString("𠮷啦啦abc");
        netdata.writeBool(true);

        SocketService.getInstance().sendProc(netdata);
    }

    public static onSendProc10000(netdata: NetData) {
        cc.log(netdata.proc);
        cc.log(netdata.readBool());
        cc.log(netdata.readBool());
        cc.log(netdata.readByte());
        cc.log(netdata.readShort());
        cc.log(netdata.readInt());
        cc.log(netdata.readFloat());
        cc.log(netdata.readUTF());
        cc.log(netdata.readInt64());
        cc.log(netdata.readString());
        cc.log(netdata.readBool());
    }
}
