import UITemplate from "../../Nireus/UI/UITemplate";
import GlobalConfig from "../../Common/GlobalConfig";
import ButtonStart from "../Material/Button/ButtonStart";

export default class PlayTemplate extends UITemplate {
    constructor() {
        super();

        this.createChildren();
    }

    protected createChildren() {
        let bg_sprite = new cc.Sprite("res/background.png");
        bg_sprite.x = GlobalConfig.getInstance().frame_width / 2;
        bg_sprite.y = GlobalConfig.getInstance().frame_height / 2;

        bg_sprite.setRotation(180);
        this.addChild(bg_sprite);
    }
}
