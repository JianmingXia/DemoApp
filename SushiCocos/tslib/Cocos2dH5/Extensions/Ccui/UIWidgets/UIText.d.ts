declare namespace ccui {

    /**
     * The text control of Cocos UI.
     * @class
     * @extends ccui.Widget
     *
     * @property {Number}   boundingWidth       - Width of the bounding area of label, the real content width is limited by boundingWidth
     * @property {Number}   boundingHeight      - Height of the bounding area of label, the real content height is limited by boundingHeight
     * @property {String}   string              - The content string of the label
     * @property {Number}   stringLength        - <@readonly> The content string length of the label
     * @property {String}   font                - The label font with a style string: e.g. "18px Verdana"
     * @property {String}   fontName            - The label font name
     * @property {Number}   fontSize            - The label font size
     * @property {Number}   textAlign           - Horizontal Alignment of label, cc.TEXT_ALIGNMENT_LEFT|cc.TEXT_ALIGNMENT_CENTER|cc.TEXT_ALIGNMENT_RIGHT
     * @property {Number}   verticalAlign       - Vertical Alignment of label: cc.VERTICAL_TEXT_ALIGNMENT_TOP|cc.VERTICAL_TEXT_ALIGNMENT_CENTER|cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM
     * @property {Boolean}  touchScaleEnabled   - Indicate whether the label will scale when touching
     */
    export class Text extends Widget {
        protected _labelRenderer: cc.LabelTTF;

        /**
         * allocates and initializes a UILabel.
         * Constructor of ccui.Text. override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {String} textContent
         * @param {String} fontName
         * @param {Number} fontSize
         * @example
         * // example
         * var uiLabel = new ccui.Text();
         */
        constructor(textContent?: string, fontName?: string, fontSize?: number);

        /**
         * Changes the  value of ccui.Text.
         * @param {String} text
         */
        public setString(text: string): void;

        /**
         * Gets the string value of ccui.Text.
         * @returns {String}
         */
        public getString(): string;

        /**
         * Gets the string length of ccui.Text.
         * @returns {Number}
         */
        public getStringLength(): number;

        /**
         * Sets fontSize
         * @param {Number} size
         */
        public setFontSize(size: number): void;

        /**
         * Returns font Size of ccui.Text
         * @returns {Number}
         */
        public getFontSize(): number;

        /**
         * Sets font name
         * @return {String} name
         */
        public setFontName(name: string): void;

        /**
         * Returns font name of ccui.Text.
         * @returns {string}
         */
        public getFontName(): string;

        /**
          * Sets text Area Size
          * @param {cc.Size} size
          */
        public setTextAreaSize(size: number): void;

        /**
         * Returns renderer's dimension.
         * @returns {cc.Size}
         */
        public getTextAreaSize(): cc.Size;

        /**
         * Sets Horizontal Alignment of cc.LabelTTF
         * @param {cc.TEXT_ALIGNMENT_LEFT|cc.TEXT_ALIGNMENT_CENTER|cc.TEXT_ALIGNMENT_RIGHT} alignment Horizontal Alignment
         */
        public setTextHorizontalAlignment(alignment: string): void;

        /**
          * Returns Horizontal Alignment of label
          * @returns {TEXT_ALIGNMENT_LEFT|TEXT_ALIGNMENT_CENTER|TEXT_ALIGNMENT_RIGHT}
          */
        public getTextHorizontalAlignment(): number;

        /**
         * Sets Vertical Alignment of label
         * @param {cc.VERTICAL_TEXT_ALIGNMENT_TOP|cc.VERTICAL_TEXT_ALIGNMENT_CENTER|cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM} alignment
         */

        public setTextVerticalAlignment(alignment: string): void;

        /**
         * Gets text vertical alignment.
         * @returns {VERTICAL_TEXT_ALIGNMENT_TOP|VERTICAL_TEXT_ALIGNMENT_CENTER|VERTICAL_TEXT_ALIGNMENT_BOTTOM}
         */
        public getTextVerticalAlignment(): number;

        /**
         * Sets the touch scale enabled of label.
         * @param {Boolean} enable
         */
        public setTouchScaleChangeEnabled(): void;


        /**
         * Gets the touch scale enabled of label.
         * @returns {Boolean}
         */
        public isTouchScaleChangeEnabled(): boolean;

        /**
         * Returns the renderer's content size.
         * @override
         * @returns {cc.Size}
         */
        public getVirtualRendererSize(): cc.Size;

        /**
         * Enables shadow style and sets color, offset and blur radius styles.
         * @param {cc.Color} shadowColor
         * @param {cc.Size} offset
         * @param {Number} blurRadius
         */
        public enableShadow(shadowColor: cc.Color, offset: cc.Size, blurRadius: number): void;

        /**
         * Enables outline style and sets outline's color and size.
         * @param {cc.Color} outlineColor
         * @param {cc.Size} outlineSize
         */
        public enableOutline(outlineColor: cc.Color, outlineSize: number): void;

        /**
          * Enables glow color
          * @param glowColor
          */
        public enableGlow(glowColor: cc.Color): void;

        public setTextColor(color: cc.Color): void;
    }
}
