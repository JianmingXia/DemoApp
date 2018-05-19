declare namespace cc {

    /**
     * The EditBoxInputMode defines the type of text that the user is allowed * to enter.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_MODE_ANY: number;

    /**
     * The user is allowed to enter an e-mail address.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_MODE_EMAILADDR: number;

    /**
     * The user is allowed to enter an integer value.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_MODE_NUMERIC: number;

    /**
     * The user is allowed to enter a phone number.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_MODE_PHONENUMBER: number;

    /**
     * The user is allowed to enter a URL.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_MODE_URL: number;

    /**
     * The user is allowed to enter a real number value.
     * This extends kEditBoxInputModeNumeric by allowing a decimal point.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_MODE_DECIMAL: number;

    /**
     * The user is allowed to enter any text, except for line breaks.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_MODE_SINGLELINE: number;

    /**
     * Indicates that the text entered is confidential data that should be
     * obscured whenever possible. This implies EDIT_BOX_INPUT_FLAG_SENSITIVE.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_FLAG_PASSWORD: number;

    /**
     * Indicates that the text entered is sensitive data that the
     * implementation must never store into a dictionary or table for use
     * in predictive, auto-completing, or other accelerated input schemes.
     * A credit card number is an example of sensitive data.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_FLAG_SENSITIVE: number;

    /**
     * This flag is a hint to the implementation that during text editing,
     * the initial letter of each word should be capitalized.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_FLAG_INITIAL_CAPS_WORD: number;

    /**
     * This flag is a hint to the implementation that during text editing,
     * the initial letter of each sentence should be capitalized.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_FLAG_INITIAL_CAPS_SENTENCE: number;

    /**
     * Capitalize all characters automatically.
     * @constant
     * @type Number
     */
    export let EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS: number;

    /**
     * @class
     * @extends cc.Class
     */
    export class EditBoxDelegate extends Class {
        /**
         * This method is called when an edit box gains focus after keyboard is shown.
         * @param {cc.EditBox} sender
         */
        public editBoxEditingDidBegin(sender: EditBox): void;

        /**
         * This method is called when an edit box loses focus after keyboard is hidden.
         * @param {cc.EditBox} sender
         */
        public editBoxEditingDidEnd(sender: EditBox): void;

        /**
         * This method is called when the edit box text was changed.
         * @param {cc.EditBox} sender
         * @param {String} text
         */
        public editBoxTextChanged(sender: EditBox, text: string): void;

        /**
         * This method is called when the return button was pressed.
         * @param {cc.EditBox} sender
         */
        public editBoxReturn(sender: EditBox): void;
    };

    /**
     * <p>cc.EditBox is a brief Class for edit box.<br/>
     * You can use this widget to gather small amounts of text from the user.</p>
     *
     * @class
     * @extends cc.Node
     *
     * @property {String}   string                  - Content string of edit box
     * @property {String}   maxLength               - Max length of the content string
     * @property {String}   font                    - <@writeonly> Config font of edit box
     * @property {String}   fontName                - <@writeonly> Config font name of edit box
     * @property {Number}   fontSize                - <@writeonly> Config font size of edit box
     * @property {cc.Color} fontColor               - <@writeonly> Config font color of edit box
     * @property {String}   placeHolder             - Place holder of edit box
     * @property {String}   placeHolderFont         - <@writeonly> Config font of place holder
     * @property {String}   placeHolderFontName     - <@writeonly> Config font name of place holder
     * @property {Number}   placeHolderFontSize     - <@writeonly> Config font size of place holder
     * @property {cc.Color} placeHolderFontColor    - <@writeonly> Config font color of place holder
     * @property {Number}   inputFlag               - <@writeonly> Input flag of edit box, one of the EditBoxInputFlag constants. e.g.cc.EDITBOX_INPUT_FLAG_PASSWORD
     * @property {Object}   delegate                - <@writeonly> Delegate of edit box
     * @property {Number}   inputMode               - <@writeonly> Input mode of the edit box. Value should be one of the EditBoxInputMode constants.
     * @property {Number}   returnType              - <@writeonly> Return type of edit box, value should be one of the KeyboardReturnType constants.
     *
     */
    export class EditBox extends Node {
        /**
         * constructor of cc.EditBox
         * @param {cc.Size} size
         * @param {cc.Scale9Sprite} normal9SpriteBg
         * @param {cc.Scale9Sprite} press9SpriteBg
         * @param {cc.Scale9Sprite} disabled9SpriteBg
         */
        public constructor(size: cc.Size, normal9SpriteBg: cc.Scale9Sprite);

        /**
         * Sets fontSize
         * @param {Number} fontSize
         */
        public setFontSize(fontSize: number): void;

        /**
         * Sets the font color of the widget's text.
         * @param {cc.Color} color
         */
        public setFontColor(color: cc.Color): void;

        /**
         * Sets a text in the edit box that acts as a placeholder when an edit box is empty.
         * @param {string} text The given text.
         */
        public setPlaceHolder(text: string): void;

        /**
         * Sets the input mode of the edit box.
         * @param {Number} inputMode One of the EditBoxInputMode constants.
         */
        public setInputMode(inputMode: number): void;

        /**
         * Sets the input flags that are to be applied to the edit box.
         * @param {Number} inputFlag One of the EditBoxInputFlag constants.
         * e.g.cc.EDITBOX_INPUT_FLAG_PASSWORD
         */
        public setInputFlag(inputFlag: number): void;

        public setLineHeight(lineHeight: number): void;

        /**
         * Sets the delegate for edit box.
         * @param {cc.EditBoxDelegate} delegate
         */
        public setDelegate(delegate: EditBoxDelegate): void;
    }
}
