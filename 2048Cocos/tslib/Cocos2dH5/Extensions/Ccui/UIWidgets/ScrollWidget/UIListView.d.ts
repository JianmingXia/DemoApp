declare namespace ccui {
    /**
     * The list view control of Cocos UI.
     * @class
     * @extends ccui.ScrollView
     * @example
     * var listView = new ccui.ListView();
     * // set list view ex direction
     * listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
     * listView.setTouchEnabled(true);
     * listView.setBounceEnabled(true);
     * listView.setBackGroundImage("res/cocosui/green_edit.png");
     * listView.setBackGroundImageScale9Enabled(true);
     * listView.setContentSize(cc.size(240, 130));
     * this.addChild(listView);
     */
    export class ListView extends ScrollView {
        /**
         * allocates and initializes a UIListView.
         * Constructor of ccui.ListView, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @example
         * // example
         * var aListView = new ccui.ListView();
         */
        public ctor(): void;

        /**
         * Sets a item model for ListView. A model will be cloned for adding default item.
         * @param {ccui.Widget} model
         */
        public setItemModel(model: Widget): void;

        /**
         * Removes all children from ccui.ListView.
         */
        public removeAllChildren(): void;

        /**
         * Removes all children from ccui.ListView and do a cleanup all running actions depending on the cleanup parameter.
         * @param {Boolean} cleanup
         */
        public removeAllChildrenWithCleanup(): void;

        /**
         * Returns a item whose index is same as the parameter.
         * @param {Number} index
         * @returns {ccui.Widget}
         */
        public getItem(index: number): ccui.Widget;

        protected _startMagneticScroll(): void;

        protected _calculateItemDestination(positionRatioInView: cc.Point, item: ccui.Widget, itemAnchorPoint: cc.Point): cc.Point;
    }
}