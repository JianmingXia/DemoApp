declare namespace cc {
    /**
     *<p> Features and Limitation:<br/>
     *  - You can add MenuItem objects in runtime using addChild:<br/>
     *  - But the only accepted children are MenuItem objects</p>
     * @class
     * @extends cc.Layer
     * @param {...cc.MenuItem|null} menuItems
     * @example
     * var layer = new cc.Menu(menuitem1, menuitem2, menuitem3);
     */
    export class Menu extends Layer {
        /**
         * Constructor of cc.Menu override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {...cc.MenuItem|null} menuItems
         */
        constructor(menuItem?: cc.MenuItem);
        constructor(...menuItems: cc.MenuItem[]);
    }
}
