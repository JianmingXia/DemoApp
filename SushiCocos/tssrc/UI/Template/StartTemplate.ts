import UITemplate from "../../Nireus/UI/UITemplate";
import GlobalConfig from "../../Common/GlobalConfig";
import ButtonStart from "../Material/Button/ButtonStart";

export default class StartTemplate extends UITemplate {
    public start_bt: ButtonStart;

    constructor() {
        super();
        this.createChildren();
    }

    protected createChildren() {
        let bg_sprite = new cc.Sprite("res/background.png");
        bg_sprite.x = GlobalConfig.getInstance().frame_width / 2;
        bg_sprite.y = GlobalConfig.getInstance().frame_height / 2;

        this.addChild(bg_sprite);

        this.start_bt = new ButtonStart();

        this.addChild(this.start_bt);
        this.start_bt.x = GlobalConfig.getInstance().frame_width / 2;
        this.start_bt.y = GlobalConfig.getInstance().frame_height / 2;
    }
}
