declare namespace ccui {
    /**
     * The ScrollView control of Cocos UI
     * @class
     * @extends ccui.Layout
     *
     * @property {Number}               innerWidth              - Inner container width of the scroll view
     * @property {Number}               innerHeight             - Inner container height of the scroll view
     * @property {ccui.ScrollView.DIR_NONE | ccui.ScrollView.DIR_VERTICAL | ccui.ScrollView.DIR_HORIZONTAL | ccui.ScrollView.DIR_BOTH}    direction               - Scroll direction of the scroll view
     * @property {Boolean}              bounceEnabled           - Indicate whether bounce is enabled
     * @property {Boolean}              inertiaScrollEnabled    - Indicate whether inertiaScroll is enabled
     * @property {Number}               touchTotalTimeThreshold - Touch total time threshold
     */
    export class ScrollView extends Layout {
        // add readonly to aviod modify directly
        protected readonly _direction: number;
        protected readonly _autoScrolling: boolean;

        static DIR_NONE: number;
        static DIR_VERTICAL: number;
        static DIR_HORIZONTAL: number;
        static DIR_BOTH: number;

        static EVENT_AUTOSCROLL_ENDED:number

        /**
         * Allocates and initializes a UIScrollView.
         * Constructor of ccui.ScrollView. override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @example
         * // example
         * var uiScrollView = new ccui.ScrollView();
         */
        public ctor(): void;

        /**
         * Initializes a ccui.ScrollView. Please do not call this function by yourself, you should pass the parameters to constructor to initialize it.
         * @returns {boolean}
         */
        public init(): boolean;

        /**
         * Calls the parent class' onEnter and schedules update function.
         * @override
         */
        public onEnter(): void;

        public onExit(): void;

        /**
         * Changes scroll _direction of ScrollView.
         * @param {ccui.ScrollView.DIR_NONE | ccui.ScrollView.DIR_VERTICAL | ccui.ScrollView.DIR_HORIZONTAL | ccui.ScrollView.DIR_BOTH} dir
         *   Direction::VERTICAL means vertical scroll, Direction::HORIZONTAL means horizontal scroll
         */
        public setDirection(dir: number): void;

        /**
         * Returns scroll direction of ScrollView.
         * @returns {ccui.ScrollView.DIR_NONE | ccui.ScrollView.DIR_VERTICAL | ccui.ScrollView.DIR_HORIZONTAL | ccui.ScrollView.DIR_BOTH}
         */
        public getDirection(): number;

        /**
         * Changes inner container size of ScrollView.     <br/>
         * Inner container size must be larger than or equal the size of ScrollView.
         * @param {cc.Size} size inner container size.
         */
        public setInnerContainerSize(size: cc.Size): void;

        /**
         * Set inner container position
         *
         * @param {cc.Point} position Inner container position.
         */
        public setInnerContainerPosition(position: cc.Point): void;

        /**
         * Move inner container to bottom boundary of ScrollView.
         */
        public jumpToBottom(): void;

        /**
         * Move inner container to top boundary of ScrollView.
         */
        public jumpToTop(): void;

        /**
         * Move inner container to left boundary of ScrollView.
         */
        public jumpToLeft(): void;

        /**
         * Move inner container to right boundary of ScrollView.
         */
        public jumpToRight(): void;

        /**
         * Move inner container to top and left boundary of ScrollView.
         */
        public jumpToTopLeft(): void;

        /**
         * Get inner container position
         *
         * @return The inner container position.
         */
        public getInnerContainerPosition(): cc.Point;

        /**
         * Removes all children.
         */
        public removeAllChildren(): void;

        /**
         * Sets bounce enabled
         * @param {Boolean} enabled
         */
        public setBounceEnabled(enabled: boolean): void;

        /**
         * Sets inertiaScroll enabled
         * @param {boolean} enabled
         */
        public setInertiaScrollEnabled(enabled: boolean): void;

        /**
         * Toggle scroll bar enabled.
         * @param {boolean} enabled True if enable scroll bar, false otherwise.
         */
        public setScrollBarEnabled(enabled: boolean): void;

        protected _calculateTouchMoveVelocity(): cc.Point;

        protected _flattenVectorByDirection(vector: cc.Point): cc.Point;
    }
}