import NireusScene from "../../Nireus/Scene/NireusScene";
import GlobalConfig from "../../Common/GlobalConfig";
import PlayTemplate from "../../UI/Template/PlayTemplate";
import UIText from "../../Nireus/UI/UIText";
import SceneManager from "../../Nireus/Scene/SceneManager";
import { CARD_ROW_NUM, INITIAL_CARD_NUMBER, CardIndex, NUMBER_TWO_PERCENT, Direction } from "./Constants";
import CardSprite from "./CardSprite";

export default class PlayScene extends NireusScene {
    public static getInstance(): PlayScene {
        return this._instance || (this._instance = new PlayScene());
    }

    private static _instance: PlayScene;

    private _play_tpl: PlayTemplate;
    private _card_arr: CardSprite[][];
    private _play_border = 40;
    private _touch_began_position: cc.Point;

    private constructor() {
        super();

        this._play_tpl = new PlayTemplate();
        this.addChild(this._play_tpl);

        this._initCardSprites();

        for (let i = 0; i < INITIAL_CARD_NUMBER; i++) {
            this._autoFillCardNumber();
        }

        this._addEventListener();
    }

    private _addEventListener() {
        let listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this._onTouchBegan.bind(this),
            onTouchEnded: this._onTouchEnded.bind(this)
        });

        cc.eventManager.addListener(listener, this._play_tpl);
    }

    private _initCardSprites() {
        this._card_arr = new Array(CARD_ROW_NUM);
        for (let i = 0; i < CARD_ROW_NUM; i++) {
            this._card_arr[i] = new Array(CARD_ROW_NUM);
        }

        const card_width = (GlobalConfig.getInstance().frame_width - this._play_border * 2) / CARD_ROW_NUM;
        const base_height = (GlobalConfig.getInstance().frame_height - GlobalConfig.getInstance().frame_width) / 2;

        for (let row = 0; row < CARD_ROW_NUM; row++) {
            for (let col = 0; col < CARD_ROW_NUM; col++) {
                let card_sprite = new CardSprite(0, card_width * col + this._play_border,
                    card_width * row + base_height, card_width);

                this._card_arr[row][col] = card_sprite;
                this.addChild(card_sprite);
            }
        }
    }

    private _autoFillCardNumber() {
        let can_filled_card = this._canFilledCard();

        let valid_index = Math.floor(Math.random() * can_filled_card.length);
        let card_index = can_filled_card[valid_index];

        let initial_num = this._generateInitialNum();

        this._card_arr[card_index.x][card_index.y].number = initial_num;
    }

    private _canFilledCard() {
        let can_filled_card: CardIndex[] = [];

        for (let row = 0; row < CARD_ROW_NUM; row++) {
            for (let col = 0; col < CARD_ROW_NUM; col++) {
                if (this._card_arr[row][col].number === 0) {
                    can_filled_card.push({
                        x: row,
                        y: col
                    });
                }
            }
        }

        return can_filled_card;
    }

    private _generateInitialNum() {
        if (Math.floor(Math.random() * 100) < NUMBER_TWO_PERCENT) {
            return 2;
        } else {
            return 4;
        }
    }

    private _onTouchBegan(touch: cc.Touch, event: cc.Event) {
        this._touch_began_position = touch.getLocation();
        return true;
    }

    private _onTouchEnded(touch: cc.Touch, event: cc.Event) {
        let direction = this._getTouchDirection(touch.getLocation());

        // Valid Direction
        this._slideCard(direction);
        this._autoFillCardNumber();
    }

    private _getTouchDirection(end_postion: cc.Point) {
        let offset_x = end_postion.x - this._touch_began_position.x;
        let offset_y = end_postion.y - this._touch_began_position.y;

        if (Math.abs(offset_x) > Math.abs(offset_y)) {
            if (offset_x > 0) {
                cc.log("RIGHT");
                return Direction.RIGHT;
            } else {
                cc.log("LEFT");
                return Direction.LEFT;
            }
        } else {
            if (offset_y > 0) {
                cc.log("UP");
                return Direction.UP;
            } else {
                cc.log("DOWN");
                return Direction.DOWN;
            }
        }
    }

    private _slideCard(direction: Direction) {
        switch (direction) {
            case Direction.UP:
                this._slideCardUP();
                break;
        }
    }

    private _slideCardUP() {
        let have_num_count_arr = this._alignCardUP();

        for (let col = 0; col < CARD_ROW_NUM; col++) {
            if (have_num_count_arr[col] < 2) {
                continue;
            } else {
                let num_arr: number[] = [];
                for (let i = 0; i < have_num_count_arr[col]; i++) {
                    num_arr[i] = this._card_arr[CARD_ROW_NUM - i - 1][col].number;
                }

                num_arr = this._mergeNum(num_arr);

                if (num_arr.length !== have_num_count_arr[col]) {
                    for (let i = 0; i < have_num_count_arr[col]; i++) {
                        if (i < num_arr.length) {
                            this._card_arr[CARD_ROW_NUM - i - 1][col].number = num_arr[i];
                        } else {
                            this._card_arr[CARD_ROW_NUM - i - 1][col].number = 0;
                        }
                    }
                }
            }
        }
    }

    private _mergeNum(num_arr: number[]) {
        let len = num_arr.length;

        let new_num_arr: number[] = [];
        for (let i = 0; i < len; i++) {
            if (i !== len - 1 && num_arr[i] === num_arr[i + 1]) {
                new_num_arr.push(2 * num_arr[i]);
                i++;
            } else {
                new_num_arr.push(num_arr[i]);
            }
        }

        return new_num_arr;
    }

    private _alignCardUP() {
        let have_num_count_arr: number[] = [];

        // realign
        for (let col = 0; col < CARD_ROW_NUM; col++) {
            have_num_count_arr[col] = 0;
            for (let row = CARD_ROW_NUM - 1; row >= 0; row--) {
                if (this._card_arr[row][col].number > 0) {
                    have_num_count_arr[col]++;
                    if (have_num_count_arr[col] + row !== CARD_ROW_NUM) {
                        this._card_arr[CARD_ROW_NUM - have_num_count_arr[col]][col].number =
                            this._card_arr[row][col].number;
                        this._card_arr[row][col].number = 0;
                    }
                }
            }
        }

        return have_num_count_arr;
    }
}
