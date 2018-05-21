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
        } else {
            this._card_label.setString("");
        }

        this._updateByNumber();
    }

    private _initCard(num: number, position_x: number, position_y: number, width: number, height: number) {
        this._number = num;

        this._card_bg = new cc.LayerColor(cc.color(200, 190, 180), width - CARD_BORDER_WIDTH, 
            height - CARD_BORDER_WIDTH);
        this._card_bg.x = position_x;
        this._card_bg.y = position_y;

        this._card_label = new UIText();
        this._card_label.setFontSize(50);
        this._card_label.x = this._card_bg.width / 2;
        this._card_label.y = this._card_bg.height / 2;
        this._card_bg.addChild(this._card_label);

        this.addChild(this._card_bg);
    }

    private _updateByNumber() {
        switch (this._number) {
            case 0:
                this._card_bg.setColor(cc.color(200, 190, 180));
                break;
            case 2:
                this._card_bg.setColor(cc.color(240, 230, 220));
                break;
            case 4:
                this._card_bg.setColor(cc.color(240, 220, 200));
                break;
            case 8:
                this._card_bg.setColor(cc.color(240, 180, 120));
                break;
            case 16:
                this._card_bg.setColor(cc.color(240, 140, 90));
                break;
            case 32:
                this._card_bg.setColor(cc.color(240, 120, 90));
                break;
            case 64:
                this._card_bg.setColor(cc.color(240, 90, 60));
                break;
            case 128:
                this._card_bg.setColor(cc.color(240, 200, 120));
                break;
            case 256:
                this._card_bg.setColor(cc.color(240, 200, 100));
                break;
            case 512:
                this._card_bg.setColor(cc.color(240, 200, 80));
                break;
            case 1024:
                this._card_bg.setColor(cc.color(240, 200, 80));
                break;
            case 2048:
                this._card_bg.setColor(cc.color(240, 200, 80));
                break;
            case 4096:
                this._card_bg.setColor(cc.color(240, 60, 60));
                break;
            default:
                this._card_bg.setColor(cc.color(260, 30, 30));
                break;
        }
    }
}
