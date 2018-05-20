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

        if (this._isValidDirec(direction)) {
            this._slideCard(direction);
            this._autoFillCardNumber();
        }
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
        let now_number_arr = this._getNowNumber();

        switch (direction) {
            case Direction.UP:
                {
                    const new_up_number_arr = this._mergeNum(this._transToCardUP(now_number_arr));

                    this._resetCardNumber(now_number_arr, this._transFromCardUP(new_up_number_arr));
                    break;
                }
            case Direction.DOWN:
                {
                    const new_down_number_arr = this._mergeNum(this._transToCardDown(now_number_arr));

                    this._resetCardNumber(now_number_arr, this._transFromCardDown(new_down_number_arr));
                    break;
                }
            case Direction.RIGHT:
                {
                    const new_right_number_arr = this._mergeNum(this._transToCardRight(now_number_arr));

                    this._resetCardNumber(now_number_arr, this._transFromCardRight(new_right_number_arr));
                    break;
                }
            case Direction.LEFT:
                {
                    const new_left_number_arr = this._mergeNum(now_number_arr);

                    this._resetCardNumber(now_number_arr, new_left_number_arr);
                    break;
                }
        }
    }

    private _transToCardUP(now_number_arr: number[][]) {
        let trans_number_arr: number[][] = [];
        for (let i = 0; i < CARD_ROW_NUM; i++) {
            trans_number_arr[i] = [];
            for (let j = 0; j < CARD_ROW_NUM; j++) {
                trans_number_arr[i].push(now_number_arr[CARD_ROW_NUM - j - 1][i]);
            }
        }

        return trans_number_arr;
    }

    private _transFromCardUP(now_number_arr: number[][]) {
        let normal_num_arr: number[][] = [];
        for (let i = 0; i < CARD_ROW_NUM; i++) {
            normal_num_arr[i] = [];
            for (let j = 0; j < CARD_ROW_NUM; j++) {
                normal_num_arr[i].push(now_number_arr[j][CARD_ROW_NUM - i - 1]);
            }
        }

        return normal_num_arr;
    }

    private _transToCardDown(now_number_arr: number[][]) {
        let trans_number_arr: number[][] = [];
        for (let i = 0; i < CARD_ROW_NUM; i++) {
            trans_number_arr[i] = [];
            for (let j = 0; j < CARD_ROW_NUM; j++) {
                trans_number_arr[i].push(now_number_arr[j][i]);
            }
        }

        return trans_number_arr;
    }

    private _transFromCardDown(now_number_arr: number[][]) {
        let normal_num_arr: number[][] = [];
        for (let i = 0; i < CARD_ROW_NUM; i++) {
            normal_num_arr[i] = [];
            for (let j = 0; j < CARD_ROW_NUM; j++) {
                normal_num_arr[i].push(now_number_arr[j][i]);
            }
        }

        return normal_num_arr;
    }

    private _transToCardRight(now_number_arr: number[][]) {
        let trans_number_arr: number[][] = [];
        for (let i = 0; i < CARD_ROW_NUM; i++) {
            trans_number_arr[i] = [];
            for (let j = 0; j < CARD_ROW_NUM; j++) {
                trans_number_arr[i].push(now_number_arr[i][CARD_ROW_NUM - j - 1]);
            }
        }

        return trans_number_arr;
    }

    private _transFromCardRight(now_number_arr: number[][]) {
        let normal_num_arr: number[][] = [];
        for (let i = 0; i < CARD_ROW_NUM; i++) {
            normal_num_arr[i] = [];
            for (let j = 0; j < CARD_ROW_NUM; j++) {
                normal_num_arr[i].push(now_number_arr[i][CARD_ROW_NUM - j - 1]);
            }
        }

        return normal_num_arr;
    }

    private _mergeNum(num_arr: number[][]) {
        let new_num_arr: number[][] = [];
        for (let i = 0; i < CARD_ROW_NUM; i++) {
            new_num_arr[i] = [];
            let tmp_arr = num_arr[i].filter((value) => {
                return value > 0;
            });

            for (let index = 0; index < tmp_arr.length; index++) {
                if (index !== tmp_arr.length - 1 && tmp_arr[index] === tmp_arr[index + 1]) {
                    new_num_arr[i].push(2 * tmp_arr[index]);
                    index++;
                } else {
                    new_num_arr[i].push(tmp_arr[index]);
                }
            }

            if (new_num_arr[i].length < num_arr[i].length) {
                new_num_arr[i] = new_num_arr[i].concat(new Array(CARD_ROW_NUM - tmp_arr.length).fill(0));
            }
        }

        return new_num_arr;
    }

    private _resetCardNumber(old_num_arr: number[][], new_num_arr: number[][]) {
        for (let i = 0; i < CARD_ROW_NUM; i++) {
            for (let j = 0; j < CARD_ROW_NUM; j++) {
                if (old_num_arr[i][j] !== new_num_arr[i][j]) {
                    this._card_arr[i][j].number = new_num_arr[i][j];
                }
            }
        }
    }

    private _getNowNumber() {
        let num_arr: number[][] = [];
        for (let row = 0; row < CARD_ROW_NUM; row++) {
            num_arr[row] = [];
            for (let col = 0; col < CARD_ROW_NUM; col++) {
                num_arr[row][col] = this._card_arr[row][col].number;
            }
        }

        return num_arr;
    }

    private _isValidDirec(direction: Direction) {
        switch (direction) {
            case Direction.UP:
                return this._isValidUpDirec();
            case Direction.DOWN:
                return this._isValidDownDirec();
            case Direction.LEFT:
                return this._isValidLeftDirec();
            case Direction.RIGHT:
                return this._isValidRightDirec();
            default:
                return true;
        }
    }

    private _isValidUpDirec() {
        let now_num_arr = this._getNowNumber();
        for (let col = 0; col < CARD_ROW_NUM; col++) {
            let have_num_count = 0;
            for (let row = CARD_ROW_NUM - 1; row >= 0; row--) {
                if (now_num_arr[row][col] > 0) {
                    have_num_count++;

                    if (row !== CARD_ROW_NUM - 1 && (have_num_count + row < CARD_ROW_NUM ||
                        this._card_arr[row][col].number === this._card_arr[row + 1][col].number)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private _isValidDownDirec() {
        let now_num_arr = this._getNowNumber();
        for (let col = 0; col < CARD_ROW_NUM; col++) {
            let have_num_count = 0;
            for (let row = 0; row < CARD_ROW_NUM; row++) {
                if (now_num_arr[row][col] > 0) {
                    have_num_count++;

                    if (row !== 0 && (have_num_count - 1 !== row ||
                        now_num_arr[row][col] === now_num_arr[row - 1][col])) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private _isValidLeftDirec() {
        let now_num_arr = this._getNowNumber();
        for (let row = 0; row < CARD_ROW_NUM; row++) {
            let have_num_count = 0;
            for (let col = 0; col < CARD_ROW_NUM; col++) {
                if (now_num_arr[row][col] > 0) {
                    have_num_count++;

                    if (col !== 0 && (have_num_count - 1 !== col ||
                        now_num_arr[row][col] === now_num_arr[row][col - 1])) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private _isValidRightDirec() {
        let now_num_arr = this._getNowNumber();
        for (let row = 0; row < CARD_ROW_NUM; row++) {
            let have_num_count = 0;
            for (let col = CARD_ROW_NUM - 1; col >= 0; col--) {
                if (now_num_arr[row][col] > 0) {
                    have_num_count++;

                    if (col !== CARD_ROW_NUM - 1 && (have_num_count + col !== CARD_ROW_NUM ||
                        now_num_arr[row][col] === now_num_arr[row][col + 1])) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
