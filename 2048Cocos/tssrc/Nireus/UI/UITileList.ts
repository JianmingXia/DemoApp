import UITemplate from "./UITemplate";
import { CreateUITemplateFunc, UITileListStruct } from "./Types";
import { ItemAnimType } from "./Const";

export default class UITileList extends ccui.ScrollView {
    private _col_cnt: number;
    private _row_cnt: number;
    private _row_height: number;
    private _col_width: number;
    private _item_create_func: CreateUITemplateFunc;
    private _item_anim_type: ItemAnimType;
    private _item_anim_delay_time: number;
    
    private _item_arr: UITemplate[];
    private _item_config_arr: any[];
    // there is a parameter of the same name in scrollview, so _direction modify to _list_direction
    private _list_direction: number;
    private _width: number;
    private _height: number;
    
    constructor() {
        super();

        this._defaultInit();
    }

    public preInit(config: UITileListStruct) {
        this.col_width = config.col_width;
        this.row_height = config.row_height;
        this.col_cnt = config.col_cnt;
        this.row_cnt = config.row_cnt;
        this.item_anim_type = config.item_anim_type;
        this.item_anim_delay_time = config.item_anim_delay_time;
        this.item_create_func = config.item_create_func;
    }

    set col_cnt(col_cnt: number) {
        if (typeof col_cnt !== "undefined") {
            this._col_cnt = col_cnt;
        }
    }

    set row_cnt(row_cnt: number) {
        if (typeof row_cnt !== "undefined") {
            this._row_cnt = row_cnt;
        }
    }

    set col_width(col_width: number) {
        if (typeof col_width !== "undefined") {
            this._col_width = col_width;
        }
    }

    get col_width() {
        return this._col_width;
    }

    set row_height(row_height: number) {
        if (typeof row_height !== "undefined") {
            this._row_height = row_height;
        }
    }

    get row_height() {
        return this._row_height;
    }

    set item_anim_type(item_anim_type: ItemAnimType) {
        if (typeof item_anim_type !== "undefined") {
            this._item_anim_type = item_anim_type;
        }
    }

    set item_anim_delay_time(item_anim_delay_time: ItemAnimType) {
        if (typeof item_anim_delay_time !== "undefined") {
            this._item_anim_delay_time = item_anim_delay_time;
        }
    }

    set item_create_func(item_create_func: CreateUITemplateFunc) {
        if (typeof item_create_func !== "undefined") {
            this._item_create_func = item_create_func;
        }
    }

    get items() {
        return this._item_arr;
    }

    public setDataItems(data_items: any[]) {
        if (this._preInitFail()) {
            return;
        }

        this._init(data_items);
    }

    public moveVerticalContainer() {
        const tpl_height = this._item_arr[0].getContentSize().height;
        const up_bound = Math.abs(this.getInnerContainerPosition().y - this.getContentSize().height) + 1.5 * tpl_height;
        const low_bound = Math.abs(this.getInnerContainerPosition().y) - 1.5 * tpl_height;

        for (let tpl of this._item_arr) {
            if (tpl.y >= low_bound && tpl.y <= up_bound) {
                tpl.setVisible(true);
            }
            else {
                tpl.setVisible(false);
            }
        }
    }

    // 可能有问题  用到时候再测
    public moveHorizontalContainer() {
        const tpl_width = this._item_arr[0].getContentSize().width;
        const up_bound = Math.abs(this.getInnerContainerPosition().x - this.getContentSize().width) + 0.5 * tpl_width;
        const low_bound = Math.abs(this.getInnerContainerPosition().x) - 0.5 * tpl_width;

        for (let tpl of this._item_arr) {
            if (tpl.x >= low_bound && tpl.x <= up_bound) {
                tpl.setVisible(true);
            }
            else {
                tpl.setVisible(false);
            }
        }
    }

    public swapItems(item1: UITemplate, item2: UITemplate, duration: number, callback_func: cc.CallFunc): void;
    public swapItems(item1: number, item2: number, duration: number, callback_func: cc.CallFunc): void;
    public swapItems(item1: any, item2: any, duration: number, callback_func: cc.CallFunc) {
        let opt_item1: UITemplate;
        let opt_item2: UITemplate;
        if (typeof item1 === "object" && typeof item2 === "object") {
            opt_item1 = item1;
            opt_item2 = item2;
        } else {
            if (this._item_arr[item1] && this._item_arr[item2]) {
                opt_item1 = this._item_arr[item1];
                opt_item2 = this._item_arr[item2];
            } else {
                cc.log("item_arr index is error: item1: " + item1 + "item2: " + item2);
                return;
            }
        } 
        
        const p1 = opt_item1.getPosition();
        const p2 = opt_item2.getPosition();

        const action1 = (cc.moveTo(duration * 0.4, p2)).easing(cc.easeSineOut());

        const action2 = (cc.moveTo(duration * 0.4, p1)).easing(cc.easeSineOut());
        const delay = cc.delayTime(duration * 0.5);
        const seq2 = cc.sequence(action2, delay, callback_func);

        opt_item1.runAction(action1);
        opt_item2.runAction(seq2);
    }

    // 将第index位的item移至Container中的第row行
    public moveVerticalContainerByIndex(index: number, row: number) {
        if (this._col_cnt !== 1) {
            cc.log("UITileList::moveVerticalContainerByIndex don't support Multi-column");
            return;
        }

        this.jumpToTop();
        if (index <= row) {
            return;
        }

        if (index - row + this.getContentSize().height / this._row_height > this._row_cnt) {
            this.jumpToBottom();
            return;
        }

        let cur_y = this.getInnerContainerPosition().y;
        this.setInnerContainerPosition(cc.p(0, cur_y + (index - row) * this._row_height));
    }

    private _preInitFail() {
        return (this._col_cnt === 0 && this._row_cnt === 0 || this._col_width === 0 || this._row_height === 0);
    }

    private _init(data_items: any[]) {
        this.removeAllChildren();
        this._item_arr = [];
        this._item_config_arr = data_items;

        let count = this._item_config_arr.length;

        if (this._col_cnt !== 0) {
            this._list_direction |= ccui.ScrollView.DIR_VERTICAL;
        } else {
            this._col_cnt = Math.ceil(count / this._row_cnt);
        }

        if (this._row_cnt !== 0) {
            this._list_direction |= ccui.ScrollView.DIR_HORIZONTAL;
        } else {
            this._row_cnt = Math.ceil(count / this._col_cnt);
        }

        this.setDirection(this._list_direction);

        this._width = this._col_cnt * this._col_width;
        this._height = this._row_cnt * this._row_height;

        if (this._width < this.getContentSize().width) {
            this._width = this.getContentSize().width;
        }

        if (this._height < this.getContentSize().height) {
            this._height = this.getContentSize().height;
        }

        this.setInnerContainerSize(cc.size(this._width, this._height));
        this.setInnerContainerPosition(cc.p(0, 0));

        this._initLayout();
    }

    private _initLayout() {
        for (let i = 0; i < this._row_cnt; ++i) {
            for (let j = 0; j < this._col_cnt; ++j) {
                let item_index = this._getItemIndex(i, j);
                if (item_index >= this._item_config_arr.length) {
                    this._defaultJump();
                    return;
                }

                let tpl = this._item_create_func(this._item_config_arr[item_index]);
                tpl.setAnchorPoint(cc.p(0.5, 0.5));

                this._item_arr[item_index] = tpl;
                this.addChild(tpl);
                this._setItemAnim(item_index);

                this._setTplPosition(tpl, i, j);
            }
        }
        this._defaultJump();
    }

    private _defaultJump() {
        switch (this.getDirection()) {
            case ccui.ScrollView.DIR_BOTH:
                this.jumpToTopLeft();
                break;
            case ccui.ScrollView.DIR_VERTICAL:
                this.jumpToTop();
                break;

            case ccui.ScrollView.DIR_HORIZONTAL:
                this.jumpToLeft();
                break;

            default:
                cc.log("UITileList direction: " + this.getDirection());
                break;
        }
    }

    private _setTplPosition(tpl: UITemplate, row: number, col: number) {
        switch (this.getDirection()) {
            case ccui.ScrollView.DIR_BOTH:
            case ccui.ScrollView.DIR_VERTICAL:
            case ccui.ScrollView.DIR_HORIZONTAL:
                tpl.setPosition(cc.p(this._col_width * col + Math.floor(tpl.getContentSize().width / 2),
                    this._height - this._row_height * row - Math.floor(tpl.getContentSize().height / 2)));
                break;

            default:
                cc.log("UITileList direction: " + this.getDirection());
                break;
        }
    }

    private _setItemAnim(item_index: number) {
        if (this._item_arr[item_index] && ItemAnimType.ITEM_ANIM_TYPE_NONE !== this._item_anim_type) {
            const item_anim = this._getItemAnim(item_index);
            if (item_anim) {
                this._item_arr[item_index].runAction(item_anim);
            }
        }
    }

    private _getItemAnim(item_index: number) {
        switch (this._item_anim_type) {
            case ItemAnimType.ITEM_ANIM_TYPE_1:
                this._item_arr[item_index].setScale(0.01);
                return this._createItemAnim(item_index);

            default:
                return undefined;
        }
    }

    private _createItemAnim(item_index: number) {
        const delay_time = cc.delayTime(item_index * this._item_anim_delay_time);
        const action1 = cc.scaleTo(0.3, 1.1);
        const action2 = cc.scaleTo(0.1, 0.95);
        const action3 = cc.scaleTo(0.1, 1);

        const seq = cc.sequence(delay_time, action1, action2, action3);
        return seq;
    }

    private _getItemIndex(row: number, col: number) {
        return row * this._col_cnt + col;
    }

    private _defaultInit() {
        this._col_cnt = 0;
        this._row_cnt = 0;
        this._col_width = 0;
        this._row_height = 0;
        this._item_anim_type = ItemAnimType.ITEM_ANIM_TYPE_NONE;
        this._item_anim_delay_time = 0;

        this._list_direction = ccui.ScrollView.DIR_NONE;
        this._width = 0;
        this._height = 0;
    }
}
