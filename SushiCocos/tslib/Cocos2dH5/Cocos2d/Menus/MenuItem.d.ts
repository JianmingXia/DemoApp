declare namespace cc {
    /**
     * Subclass cc.MenuItem (or any subclass) to create your custom cc.MenuItem objects.
     * @class
     * @extends cc.Node
     * @param {function|String} callback
     * @param  {cc.Node} target
     */
    export class MenuItem extends Node {
        /**
         * Constructor of cc.MenuItem
         * @param {function|String} callback
         * @param {cc.Node} target
         */
        constructor(callback: VoidFunction | string, target: cc.Node);
    }

    /**
     *  Any cc.Node that supports the cc.LabelProtocol protocol can be added.<br/>
     * Supported nodes:<br/>
     * - cc.BitmapFontAtlas<br/>
     * - cc.LabelAtlas<br/>
     * - cc.LabelTTF<br/>
     * @class
     * @extends cc.MenuItem
     * @param {cc.Node} label
     * @param {function|String} selector
     * @param {cc.Node} target
     * @example
     * var menuitemLabel = new cc.MenuItemLabel(label,selector,target);
     *
     * @property {String}   string          - Content string of label item
     * @property {cc.Node}  label           - Label of label item
     * @property {cc.Color} disabledColor   - Color of label when it's disabled
     */
    export class MenuItemLabel extends MenuItem {
        /**
         * Constructor of cc.MenuItemLabel
         * @param {cc.Node} label
         * @param {function|String} selector
         * @param {cc.Node} target
         */
        constructor(label: Node, selector: VoidFunction | string, target: Node);
    }

    /**
     * Helper class that creates a CCMenuItemLabel class with a Label
     * @class
     * @extends cc.MenuItemLabel
     * @param {String} value text for the menu item
     * @param {function|String} callback
     * @param {cc.Node} target
     * @example
     * var menuItem = new cc.MenuItemFont(value, callback, target);
     *
     * @property {Number}   fontSize    - Font size of font item
     * @property {String}   fontName    - Font name of font item
     */
    export class MenuItemFont extends MenuItemLabel {
        /**
         * Constructor of cc.MenuItemFont
         * @param {String} value text for the menu item
         * @param {function|String} callback
         * @param {cc.Node} target
         */
        constructor(value: string, callback: VoidFunction | string, target: Node);
    }
}
