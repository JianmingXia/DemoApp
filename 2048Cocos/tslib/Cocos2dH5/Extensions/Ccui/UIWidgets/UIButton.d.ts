declare namespace ccui {

    /**
     * The button controls of Cocos UI.
     * @class
     * @extends ccui.Widget
     *
     * @property {String}   titleText               - The content string of the button title
     * @property {String}   titleFont               - The content string font of the button title
     * @property {Number}   titleFontSize           - The content string font size of the button title
     * @property {String}   titleFontName           - The content string font name of the button title
     * @property {cc.Color} titleColor          - The content string font color of the button title
     * @property {Boolean}  pressedActionEnabled    - Indicate whether button has zoom effect when clicked
     */
    export class Button extends Widget {
        protected _buttonNormalSpriteFrame: cc.SpriteFrame;
        protected _buttonClickedSpriteFrame: cc.SpriteFrame;
        protected _buttonDisableSpriteFrame: cc.SpriteFrame;

        protected _titleRenderer: cc.LabelTTF;
        protected _scale9Enabled: boolean;
        protected _pressedTextureLoaded: boolean;
        protected _normalTextureLoaded: boolean;
        protected _disabledTextureLoaded: boolean;
        protected _normalTextureScaleXInSize: number;
        protected _normalTextureScaleYInSize: number;
        protected _zoomScale: number;
        protected _buttonScale9Renderer: ccui.Scale9Sprite;

        protected pressedActionEnabled: boolean;
        /**
         * the zoom action time step of ccui.Button
         * @constant
         * @type {number}
         */
        static ZOOM_ACTION_TIME_STEP: number;

        public constructor(normalImage?: string, selectedImage?: string, disableImage?: string, texType?: number);

        /**
         * Load normal state texture for button.
         * @param {String} normal normal state of texture's filename.
         * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
         */
        public loadTextureNormal(normal: string, texType: number): void;

        /**
         * Load selected state texture for button.
         * @param {String} selected selected state of texture's filename.
         * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
         */
        public loadTexturePressed(selected: string, texType: number): void;

        /**
         * Load dark state texture for button.
         * @param {String} disabled disabled state of texture's filename.
         * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
         */
        public loadTextureDisabled(disable: string, texType: number): void;

        /**
          * Sets title text to ccui.Button
          * @param {String} text
          */
        public setTitleText(text: string): void;

        /**
           * Sets title color to ccui.Button.
           * @param {cc.Color} color
           */
        public setTitleColor(color: cc.Color): void;

        /**
         * Sets title fontSize to ccui.Button
         * @param {cc.Size} size
         */
        public setTitleFontSize(size: number): void;

        /**
         * When user pressed the button, the button will zoom to a scale.
         * The final scale of the button  equals (button original scale + _zoomScale)
         * @since v3.2
         * @param scale
         */
        public setZoomScale(scale: number): void;

        /**
         * Returns a zoom scale
         * @since v3.2
         * @returns {number}
         */
        public getZoomScale(): number;

        /**
           * Sets title fontName to ccui.Button.
           * @param {String} fontName
           */
        public setTitleFontName(name: string): void;

        /**
         * Sets if button is using scale9 renderer.
         * @param {Boolean} able true that using scale9 renderer, false otherwise.
         */
        public setScale9Enabled(able: boolean): void;

        /**
         * Changes if button can be clicked zoom effect.
         * @param {Boolean} enabled
         */
        public setPressedActionEnabled(enabled: boolean): void;

        protected _onPressStateChangedToNormal(): void;
    }
}