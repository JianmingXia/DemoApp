import UITemplate from "../../Nireus/UI/UITemplate";
import UIText from "../../Nireus/UI/UIText";
import { CARD_BORDER_WIDTH } from "./Constants";

export default class CardSprite extends UITemplate {
    private _card_bg: cc.LayerColor;
    private _card_label: UIText;
    private _number: number;

    constructor(num: number, position_x: number, position_y: number, width: number, height = width) {
        super();

        this._initCard(num, position_x, position_y, width, height);
    }

    get number() {
        return this._number;
    }

    set number(num: number) {
        this._number = num;

        if (this._number > 0) {
            this._card_label.setString(this._number.toString());

            switch(this._number) {
                case 2:
                    this._card_bg.setColor(cc.color(240, 230, 221));
                    break;
                case 4:
                    this._card_bg.setColor(cc.color(241, 222, 201));
                    break;
            }
        } else {
            this._card_label.setString("");
            this._card_bg.setColor(cc.color(200, 190, 180));
        }
    }

    private _initCard(num: number, position_x: number, position_y: number, width: number, height: number) {
        this._number = num;

        this._card_bg = new cc.LayerColor(new cc.Color(200, 190, 180, 255), width - CARD_BORDER_WIDTH, height - CARD_BORDER_WIDTH);
        this._card_bg.x = position_x;
        this._card_bg.y = position_y;

        this._card_label = new UIText();
        this._card_label.setFontSize(50);
        this._card_label.x = this._card_bg.width / 2;
        this._card_label.y = this._card_bg.height / 2;
        this._card_bg.addChild(this._card_label);

        this.addChild(this._card_bg);
    }
}