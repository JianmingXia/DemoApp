declare namespace ccui {
    /**
     * ccui.Layout is the base class of  ccui.PageView and ccui.ScrollView, it does layout by layout manager
     *  and clips area by its _clippingStencil when clippingEnabled is true.
     * @class
     * @extends ccui.Widget
     *
     * @property {Boolean}                  clippingEnabled - Indicate whether clipping is enabled
     * @property {ccui.Layout.CLIPPING_STENCIL|ccui.Layout.CLIPPING_SCISSOR}   clippingType
     * @property {ccui.Layout.ABSOLUTE|ccui.Layout.LINEAR_VERTICAL|ccui.Layout.LINEAR_HORIZONTAL|ccui.Layout.RELATIVE}  layoutType
     *
     */
    export class Layout extends Widget {
        /**
         * Allocates and initializes an UILayout.
         * Constructor of ccui.Layout
         * @function
         * @example
         * // example
         * var uiLayout = new ccui.Layout();
         */
        public ctor(): void;

        /**
         * Calls its parent's onEnter, and calls its clippingStencil's onEnter if clippingStencil isn't null.
         * @override
         */
        public onEnter(): void;

        /**
         *  Calls its parent's onExit, and calls its clippingStencil's onExit if clippingStencil isn't null.
         *  @override
         */
        public onExit(): void;

        /**
         * If a layout is loop focused which means that the focus movement will be inside the layout
         * @param {Boolean} loop pass true to let the focus movement loop inside the layout
         */
        public setLoopFocus(loop: boolean): void;

        /**
         * Gets whether enable focus loop
         * @returns {boolean}  If focus loop is enabled, then it will return true, otherwise it returns false. The default value is false.
         */
        public isLoopFocus(): void;

        /**
         * Sets background color for layout, if color type is Layout.COLOR_SOLID
         * @param {cc.Color} color
         * @param {cc.Color} [endColor]
         */
        public setBackGroundColor(color: cc.Color, endColor: cc.Color): void;
    }
}