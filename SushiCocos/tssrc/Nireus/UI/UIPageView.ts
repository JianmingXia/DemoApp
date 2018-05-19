/*
 * @Author: Ryoma 
 * @Date: 2018-04-23 15:04:42 
 * @Last Modified by: Ryoma
 * @Last Modified time: 2018-05-11 11:22:22
 */

import UITemplate from "./UITemplate";
import UIText from "./UIText";
import { CreateUITemplateFunc, UIPageViewStruct, LoadMoreFunc } from "./Types";

enum GotoDirection {
    GOTO_HEAD = 1,
    GOTO_TAIL = 2
}

type StartEndPageIndex = {
    start: number,
    end: number
};

enum NewPageType {
    APPEND = 0,
    INSERT = 1
}

// support horizontal or vertical direction
export default class UIPageView extends ccui.PageView {
    // default_page_num immutable
    protected readonly _default_page_num = 3;

    protected _col_cnt: number;
    protected _row_cnt: number;
    protected _row_height: number;
    protected _col_width: number;
    protected _max_page: number;
    // when set true, same time only an operation
    protected _scroll_page_safe: boolean;
    // when setDataItems, all page be rendered
    protected _one_time: boolean;
    // only valid when _one_time == false
    protected _real_page_index_base: number;
    protected _page_number_text: UIText;
    protected _item_create_func: CreateUITemplateFunc;
    protected _load_more_back_func: LoadMoreFunc;
    protected _load_more_front_func: LoadMoreFunc;

    protected _item_config_arr: any[];

    private _width: number;
    private _height: number;

    constructor() {
        super();

        this.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        this.setBounceEnabled(true);
        this.addEventListener(this._eventCallback.bind(this));
        this._defaultInit();
    }

    public preInit(config: UIPageViewStruct) {
        this.col_width = config.col_width;
        this.row_height = config.row_height;
        this.col_cnt = config.col_cnt;
        this.row_cnt = config.row_cnt;
        this.item_create_func = config.item_create_func;
        this.max_page = config.max_page;
        this.page_number_text = config.page_number_text;
        this.one_time = config.one_time;
        this.scroll_page_safe = config.scroll_page_safe;

        if (config.direction === ccui.ScrollView.DIR_HORIZONTAL ||
            config.direction === ccui.ScrollView.DIR_VERTICAL) {
            this.setDirection(config.direction);
        }
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

    set row_height(row_height: number) {
        if (typeof row_height !== "undefined") {
            this._row_height = row_height;
        }
    }

    set max_page(max_page: number) {
        if (typeof max_page !== "undefined") {
            this._max_page = max_page;
        }
    }

    set one_time(one_time: boolean) {
        if (typeof one_time !== "undefined") {
            this._one_time = one_time;
        }
    }

    set item_create_func(item_create_func: CreateUITemplateFunc) {
        if (typeof item_create_func !== "undefined") {
            this._item_create_func = item_create_func;
        }
    }

    set page_number_text(page_number_text: UIText) {
        if (typeof page_number_text !== "undefined") {
            this._page_number_text = page_number_text;
        }
    }

    set scroll_page_safe(scroll_page_safe: boolean) {
        if (typeof scroll_page_safe !== "undefined") {
            this._scroll_page_safe = scroll_page_safe;
        }
    }

    set load_more_back_func(load_more_back_func: LoadMoreFunc) {
        if (typeof load_more_back_func !== "undefined") {
            this._load_more_back_func = load_more_back_func;
        }
    }

    set load_more_front_func(load_more_front_func: LoadMoreFunc) {
        if (typeof load_more_front_func !== "undefined") {
            this._load_more_front_func = load_more_front_func;
        }
    }

    public setDataItems(data_items: any[]) {
        if (this._preInitFail()) {
            return;
        }

        this._init(data_items);
    }

    public gotoPageByIndex(page_index: number) {
        if (this._preInitFail()) {
            return;
        }
        if (false === this._canScrollPage()) {
            return;
        }
        if (page_index < 0) {
            return;
        }
        if (page_index === this._getRealPageIndex() || page_index >= this._getActualTotalPage()) {
            return;
        }

        if (this._one_time) {
            this._quickScrollPage(page_index);
        } else {
            this._complexScrollPage(page_index);
        }
    }

    public gotoNextPage() {
        this._gotoNextPage();
    }

    public gotoPrevPage() {
        this._gotoPrevPage();
    }

    private _defaultInit() {
        this._col_cnt = 1;
        this._row_cnt = 1;
        this._col_width = 0;
        this._row_height = 0;
        this._one_time = false;
        this._max_page = 0;
        this._real_page_index_base = 0;
    }

    private _preInitFail() {
        return (this._col_cnt === 0 || this._row_cnt === 0 || this._col_width === 0 || this._row_height === 0);
    }

    private _init(data_items: any[]) {
        this.removeAllChildren();
        this._item_config_arr = data_items;
        this._real_page_index_base = 0;

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

        this._initCreatePages();

        this.scrollToPage(0);
    }

    private _initCreatePages() {
        let actual_create_page_num = this._getActualCreateTotalPage();

        for (let page_index = 0; page_index < actual_create_page_num; page_index++) {
            this._newPage(page_index);
        }

        this._jumpByDirection(GotoDirection.GOTO_HEAD);
    }

    private _newPage(page_index: number, type = NewPageType.APPEND) {
        if (page_index < 0 || this._overMaxPage(page_index)) {
            return;
        }

        let page = new ccui.Layout();
        if (page === null) {
            return;
        }

        page.setTag(page_index);

        outer: for (let i = 0; i < this._row_cnt; ++i) {
            for (let j = 0; j < this._col_cnt; ++j) {
                let item_index = this._getItemIndex(page_index, i, j);
                if (item_index >= this._item_config_arr.length) {
                    break outer;
                }
                let tpl = this._item_create_func(this._item_config_arr[item_index]);

                tpl.removeFromParent();
                tpl.setAnchorPoint(cc.p(0.5, 0.5));

                tpl.setPosition(cc.p(this._col_width * j + Math.floor(tpl.getContentSize().width / 2),
                    this._height - this._row_height * i - Math.floor(tpl.getContentSize().height / 2)));
                page.addChild(tpl);
            }
        }

        switch (type) {
            case NewPageType.APPEND:
                this.addPage(page);
                break;
            case NewPageType.INSERT:
                this.insertPage(page, 0);
                break;
        }
    }

    private _getPageCount() {
        return this._col_cnt * this._row_cnt;
    }

    private _getActualCreateTotalPage() {
        let actual_create_page_num = this._getActualTotalPage();
        if (false === this._one_time && actual_create_page_num > this._default_page_num) {
            actual_create_page_num = this._default_page_num;
        }

        return actual_create_page_num;
    }

    private _getActualTotalPage() {
        let total_page = this._getPageNumByCount(this._item_config_arr.length);
        if (this._overMaxPage(total_page - 1)) {
            return this._max_page;
        }

        return total_page;
    }

    private _getPageNumByCount(count: number) {
        return Math.ceil(count / this._getPageCount());
    }

    private _getItemIndex(page_index: number, row: number, col: number) {
        return page_index * this._getPageCount() + row * this._col_cnt + col;
    }

    private _jumpByDirection(dir: GotoDirection) {
        if (this.getDirection() === ccui.ScrollView.DIR_HORIZONTAL) {
            switch (dir) {
                case GotoDirection.GOTO_HEAD:
                    this.jumpToLeft();
                    break;

                case GotoDirection.GOTO_TAIL:
                    this.jumpToRight();
                    break;
            }
        } else if (this.getDirection() === ccui.ScrollView.DIR_VERTICAL) {
            switch (dir) {
                case GotoDirection.GOTO_HEAD:
                    this.jumpToTop();
                    break;

                case GotoDirection.GOTO_TAIL:
                    this.jumpToBottom();
                    break;
            }
        }
    }

    /**
     * scrollToPage: when use scrollToPage will not update page_index in time, it's best to use in eventCallback
     * setCurrentPageIndex: if you use setCurrentPageIndex, please remember call this func because no eventCallback
     */
    private _updatePageNumberStr() {
        if (this._page_number_text) {
            let cur_page_index = this._getRealPageIndex() + 1;
            let total_page = this._getActualTotalPage();

            this._page_number_text.setString(`${cur_page_index}/${total_page}`);
        }
    }

    private _eventCallback(ref: UITemplate, event_type: number) {
        switch (event_type) {
            case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                this._updatePageNumberStr();
                break;
            default:
                break;
        }
    }

    private _quickScrollPage(page_index: number) {
        if (page_index >= this._getActualTotalPage()) {
            return;
        }

        this.scrollToPage(page_index - this._real_page_index_base);
    }

    private _complexScrollPage(page_index: number) {
        if (this._getActualTotalPage() > this._default_page_num) {
            this.removeAllChildren();
            this.setInnerContainerSize(cc.size(this._width, this._height));
            this.setInnerContainerPosition(cc.p(0, 0));

            let start_end_page_index = this._getStartEndPageIndex(page_index);
            for (let new_index = start_end_page_index.start; new_index <= start_end_page_index.end; new_index++) {
                this._newPage(new_index);
            }

            this._jumpByDirection(page_index > this._real_page_index_base ?
                GotoDirection.GOTO_HEAD : GotoDirection.GOTO_TAIL);

            this._setRealPageIndexBase(start_end_page_index.start);
        }

        this._quickScrollPage(page_index);
    }

    // depend on default_page_num = 3
    private _getStartEndPageIndex(page_index: number): StartEndPageIndex {
        let start_index = page_index - 1;
        let end_index = page_index + 1;

        if (start_index < 0) {
            start_index = 0;
            end_index++;
        }

        if (end_index >= this._getActualTotalPage()) {
            end_index--;
            if (start_index > 1) {
                start_index--;
            }
        }

        return {
            start: start_index,
            end: end_index
        };
    }

    private _overMaxPage(page_index: number) {
        if (this._max_page <= 0) {
            return false;
        } else {
            return page_index >= this._max_page;
        }
    }

    private _complexGotoNextPage() {
        let cur_page_index = this._getRealPageIndex();

        if (this._getActualTotalPage() > this._default_page_num) {
            let cur_start_end_page_index = this._getStartEndPageIndex(cur_page_index);
            let next_start_end_page_index = this._getStartEndPageIndex(cur_page_index + 1);

            // remove the first page, then pushback another page
            if (cur_start_end_page_index.start !== next_start_end_page_index.start) {
                this.removePageAtIndex(0);

                this._newPage(next_start_end_page_index.end);

                this._jumpByDirection(GotoDirection.GOTO_HEAD);

                this._setRealPageIndexBase(next_start_end_page_index.start);
            }
        }

        this._quickScrollPage(cur_page_index + 1);
    }

    private _complexGotoPrevPage() {
        let cur_page_index = this._getRealPageIndex();

        if (this._getActualTotalPage() > this._default_page_num) {
            let cur_start_end_page_index = this._getStartEndPageIndex(cur_page_index);
            let prev_start_end_page_index = this._getStartEndPageIndex(cur_page_index - 1);

            // remove the last page, then insert another page to left
            if (cur_start_end_page_index.start !== prev_start_end_page_index.start) {
                this.removePageAtIndex(this._default_page_num - 1);

                this._newPage(prev_start_end_page_index.start, NewPageType.INSERT);
                this._jumpByDirection(GotoDirection.GOTO_TAIL);

                this._setRealPageIndexBase(prev_start_end_page_index.start);
            }
        }

        this._quickScrollPage(cur_page_index - 1);
    }

    private _setRealPageIndexBase(start_page_index: number) {
        if (false === this._one_time) {
            this._real_page_index_base = start_page_index;
        }
    }

    private _getRealPageIndex(page_index?: number) {
        if (typeof page_index === "undefined") {
            page_index = this.getCurrentPageIndex();
        }

        if (this._one_time) {
            return page_index;
        } else {
            return this._real_page_index_base + page_index;
        }
    }

    private _canScrollPage() {
        if (this._scroll_page_safe) {
            return false === this._autoScrolling;
        }

        return true;
    }

    // overwrite to handle scroll logic in PageView::_handleReleaseLogic
    private _handleReleaseLogic() {
        if (this._item_config_arr.length <= 0) {
            return;
        }

        let touchMoveVelocity = this._flattenVectorByDirection(this._calculateTouchMoveVelocity());

        let INERTIA_THRESHOLD = 200;
        if (cc.pLength(touchMoveVelocity) < INERTIA_THRESHOLD) {
            this._startMagneticScroll();
        }
        else {
            // Handle paging by inertia force.
            let currentPage = this.getItem(this._curPageIdx);
            let destination = this._calculateItemDestination(cc.p(0.5, 0.5), currentPage, cc.p(0.5, 0.5));
            let deltaToCurrentPage = cc.pSub(destination, this.getInnerContainerPosition());
            deltaToCurrentPage = this._flattenVectorByDirection(deltaToCurrentPage);

            if (touchMoveVelocity.x * deltaToCurrentPage.x > 0 || touchMoveVelocity.y * deltaToCurrentPage.y > 0) {
                this._startMagneticScroll();
            }
            else {
                if (touchMoveVelocity.x < 0 || touchMoveVelocity.y > 0) {
                    this._loadMoreBack();
                }
                else {
                    this._loadMoreFront();
                }
            }
        }
    }

    private _loadMoreBack() {
        if (this._getRealPageIndex() === this._getActualTotalPage() - 1) {
            this.scrollToPage(this.getCurrentPageIndex());

            this._load_more_front_func(false);
            return;
        }

        // use custom callback, if you just want do _load_more_back_func, please return false
        if (this._load_more_back_func && false === this._load_more_back_func(true)) {
            return;
        }

        this._gotoNextPage();
    }

    private _loadMoreFront() {
        if (this._getRealPageIndex() === 0) {
            this.scrollToPage(0);
            this._load_more_front_func(false);

            return;
        }

        // use custom callback, if you just want do _load_more_front_func, please return false
        if (this._load_more_front_func && false === this._load_more_front_func(true)) {
            return;
        }
        
        this._gotoPrevPage();
    }

    private _gotoNextPage() {
        if (this._preInitFail()) {
            return;
        }
        if (false === this._canScrollPage()) {
            return;
        }

        let cur_page_index = this._getRealPageIndex();

        if (cur_page_index + 1 >= this._getActualTotalPage()) {
            return;
        }

        if (this._one_time) {
            this._quickScrollPage(cur_page_index + 1);
        } else {
            this._complexGotoNextPage();
        }
    }

    private _gotoPrevPage() {
        if (this._preInitFail()) {
            return;
        }
        if (false === this._canScrollPage()) {
            return;
        }
        let cur_page_index = this._getRealPageIndex();

        if (cur_page_index <= 0) {
            return;
        }

        if (this._one_time) {
            this._quickScrollPage(cur_page_index - 1);
        } else {
            this._complexGotoPrevPage();
        }
    }
}
