declare namespace ccui {
    /**
     * The PageView control of Cocos UI.
     * @class
     * @extends ccui.ListView
     * @example
     * var pageView = new ccui.PageView();
     * pageView.setTouchEnabled(true);
     * pageView.addPage(new ccui.Layout());
     * this.addChild(pageView);
     */
    export class PageView extends ListView {
        // add readonly to aviod modify directly
        protected readonly _curPageIdx: number;
        /**
         * Allocates and initializes a UIPageView.
         * Constructor of ccui.PageView. please do not call this function by yourself, you should pass the parameters to constructor to initialize it .
         * @example
         * // example
         * var uiPageView = new ccui.PageView();
         */
        public ctor(): void;
    
        /**
         * Add a widget to a page of PageView.
         * @deprecated since v3.9, please use 'insertPage(Widget* page, int idx)' instead.
         * @param {ccui.Widget} widget widget to be added to PageView.
         * @param {number} pageIdx index of page.
         * @param {Boolean} forceCreate if force create and there is no page exist, PageView would create a default page for adding widget.
         */
        public addWidgetToPage(widget: Widget, pageIdx: number, forceCreate: boolean): void;
        
        /**
         * Insert a page into the end of PageView.
         * @param {ccui.Widget} page Page to be inserted.
         */
        public addPage(page: Widget): void;

        /**
         * Insert a page into PageView at a given index.
         * @param {ccui.Widget} page Page to be inserted.
         * @param {number} idx A given index.
         */
        public insertPage(page: Widget, idx: number): void;


        /**
         * Removes a page from PageView.
         * @param {ccui.Widget} page Page to be removed.
         */
        public removePage(page: Widget): void;

        /**
         * Removes a page at index of PageView.
         * @param {number} index A given index.
         */
        public removePageAtIndex(index: number): void;

        /**
         * Removes all pages from PageView
         */
        public removeAllPages(): void;

        /**
         * scroll PageView to index.
         * @param {number} idx A given index in the PageView. Index start from 0 to pageCount -1.
         */
        public scrollToItem(idx: number): void;

        /**
         * scroll PageView to index.
         * @param {number} idx A given index in the PageView. Index start from 0 to pageCount -1.
         */
        public scrollToPage(idx: number): void;

        /**
         * Jump to a page with a given index without scrolling.
         * This is the different between scrollToPage.
         * @param {number} index A given index in PageView. Index start from 0 to pageCount -1.
         */
        public setCurrentPageIndex(index: number): void;

        /**
         * Returns current page index
         * @returns {number}
         */
        public getCurrentPageIndex(): number;


        /**
         * Adds event listener to ccui.PageView.
         * @param {Function} selector
         */
        public addEventListener(selector: Function): void;
    
        /**
         * Set using user defined scroll page threshold or not. If you set it to false, then the default scroll threshold is pageView.width / 2.
         * @since v3.2
         * @deprecated Since v3.9, this method has no effect.
         */
        public setUsingCustomScrollThreshold(flag: boolean): void;
    } 
}