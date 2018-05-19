declare namespace ccui {

    /**
     *
     * @class
     * @extends ccui.Widget
     *
     * @property {String}   string              - The content string of the label
     * @property {String}   placeHolder         - The place holder of the text field
     * @property {String}   font                - The text field font with a style string: e.g. "18px Verdana"
     * @property {String}   fontName            - The text field font name
     * @property {Number}   fontSize            - The text field font size
     * @property {Boolean}  maxLengthEnabled    - Indicate whether max length limit is enabled
     * @property {Number}   maxLength           - The max length of the text field
     * @property {Boolean}  passwordEnabled     - Indicate whether the text field is for entering password
     */
    export class TextField extends Widget {
        /**
         *  Changes the string value of textField.
         * @param {String} text
         */
        public setString(text: string): void;
        
        /**
         * Sets the text color to ccui.TextField
         * @param textColor
         */
        public setTextColor(color: cc.Color): void;

        /**
         * Sets font size for ccui.TextField.
         * @param {Number} size
         */
        public setFontSize(size: number): void;

        /**
          * Sets font name for ccui.TextField
          * @param {String} name
          */
        public setFontName(name: string): void;

        /**
         * Sets Whether to open string length limit for ccui.TextField.
         * @param {Boolean} enable
         */
        public setMaxLengthEnabled(len: number): void;

        /**
         * Sets insertText string to ccui.TextField.
         * @param {String} insertText
         */
        public setInsertText(text: string): void;

        /**
         * Sets the text area size to ccui.TextField.
         * @param {cc.Size} size
         */
        public setTextAreaSize(size: number): void;

        /**
         * Sets the text horizontal alignment of ccui.TextField.
         * @param alignment
         */
        public setTextHorizontalAlignment(alignment: string): void;

        /**
         * Sets the text vertical alignment of ccui.TextField.
         * @param alignment
         */
        public setTextVerticalAlignment(alignment: string): void;


        /**
         * Returns string value of ccui.TextField.
         * @returns {String}
         */
        public getString(): string;
    }
}