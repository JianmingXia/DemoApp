declare namespace ccui {

    /**
     * The base class for ccui controls and layout
     * @sample
     * var uiWidget = new ccui.Widget();
     * this.addChild(uiWidget);
     * @class
     * @extends ccui.ProtectedNode
     *
     * @property {Number}           xPercent        - Position x in percentage of width
     * @property {Number}           yPercent        - Position y in percentage of height
     * @property {Number}           widthPercent    - Width in percentage of parent width
     * @property {Number}           heightPercent   - Height in percentage of parent height
     * @property {ccui.Widget}      widgetParent    - <@readonly> The direct parent when it's a widget also, otherwise equals null
     * @property {Boolean}          enabled         - Indicate whether the widget is enabled
     * @property {Boolean}          focused         - Indicate whether the widget is focused
     * @property {ccui.Widget.SIZE_ABSOLUTE|ccui.Widget.SIZE_PERCENT}     sizeType        - The size type of the widget
     * @property {ccui.Widget.TYPE_WIDGET|ccui.Widget.TYPE_CONTAINER}   widgetType      - <@readonly> The type of the widget
     * @property {Boolean}          touchEnabled    - Indicate whether touch events are enabled
     * @property {Boolean}          updateEnabled   - Indicate whether the update function is scheduled
     * @property {Boolean}          bright          - Indicate whether the widget is bright
     * @property {String}           name            - The name of the widget
     * @property {Number}           actionTag       - The action tag of the widget
     */
    export class Widget extends ProtectedNode {
        protected _clickEventListener: any;
        protected _clickEventSelector: any;
        protected _unifySize: boolean;

        static LOCAL_TEXTURE: number;
        static PLIST_TEXTURE: number;

        protected _releaseUpEvent(): void;

        /**
         * Sets whether the widget is touch enabled. The default value is false, a widget is default to touch disabled
         * @param {Boolean} enable  true if the widget is touch enabled, false if the widget is touch disabled.
         */
        public setTouchEnabled(enabled: boolean): void;

        /**
         * Sets the touch event target/selector of the ccui.Widget
         * @param {Function} selector
         * @param {Object} target
         */
        public addTouchEventListener(selector: Function, target: Object): void;

        public addClickEventListener(callback: Function): void;
    }
}