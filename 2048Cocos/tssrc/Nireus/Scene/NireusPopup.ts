import UITemplate from "../UI/UITemplate";
import IPopup from "./Base/IPopup";
import { AnimType } from "./SceneConst";

export default class NireusPopup extends UITemplate implements IPopup {
    public anim_type = AnimType.NO_ANIM;
    public alpha: number;
    public touch_outside_remove = false;

    constructor() {
        super();
    }

    public onShow(param?: any) {
        cc.log("NireusPopup onShow");
        return;
    }

    public onHide() {
        cc.log("NireusPopup onHide");
        return;
    }
}
