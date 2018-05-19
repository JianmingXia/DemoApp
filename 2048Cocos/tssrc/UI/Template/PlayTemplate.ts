import UITemplate from "../../Nireus/UI/UITemplate";
import GlobalConfig from "../../Common/GlobalConfig";

export default class PlayTemplate extends UITemplate {
    constructor() {
        super();

        this.createChildren();
    }

    protected createChildren() {
        var layer = new cc.LayerColor(new cc.Color(180, 170, 160, 255));
        this.addChild(layer); 
    }
}