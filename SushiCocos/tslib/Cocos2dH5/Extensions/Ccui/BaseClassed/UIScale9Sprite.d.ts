declare namespace ccui {

    /**
     * <p>
     * A 9-slice sprite for cocos2d UI.                                                                    <br/>
     *                                                                                                     <br/>
     * 9-slice scaling allows you to specify how scaling is applied                                        <br/>
     * to specific areas of a sprite. With 9-slice scaling (3x3 grid),                                     <br/>
     * you can ensure that the sprite does not become distorted when                                       <br/>
     * scaled.                                                                                             <br/>
     * @note: it will refactor in v3.1                                                                    <br/>
     * @see http://yannickloriot.com/library/ios/cccontrolextension/Classes/CCScale9Sprite.html            <br/>
     * </p>
     * @class
     * @extends cc.Node
     *
     * @property {cc.Size}  preferredSize   - The preferred size of the 9-slice sprite
     * @property {cc.Rect}  capInsets       - The cap insets of the 9-slice sprite
     * @property {Number}   insetLeft       - The left inset of the 9-slice sprite
     * @property {Number}   insetTop        - The top inset of the 9-slice sprite
     * @property {Number}   insetRight      - The right inset of the 9-slice sprite
     * @property {Number}   insetBottom     - The bottom inset of the 9-slice sprite
     */

    type Scale9SpriteState = { 
        NORMAL: 0, 
        GRAY : 1 
    }

    export class Scale9Sprite extends cc.Node {
        static state: Scale9SpriteState;


        /**
         * Constructor function.
         * @function
         * @param {string|cc.SpriteFrame} file file name of texture or a SpriteFrame
         * @param {cc.Rect} rectOrCapInsets
         * @param {cc.Rect} capInsets
         * @returns {Scale9Sprite}
         */
        constructor(file: string | cc.SpriteFrame, rectOrCapInsets: cc.Rect, capInsets: cc.Rect);

        /**
         * Sets a new sprite frame to the sprite.
         * @function
         * @param {cc.SpriteFrame|String} newFrame
         */
        public setSpriteFrame(newFrame: cc.SpriteFrame | String): void;

        /**
         * Change the state of 9-slice sprite.
         * @see `State`
         * @param state A enum value in State.
         */
        public setState(state: number): void;
    }
}

declare namespace cc {
    type Scale9SpriteState = {
        NORMAL: 0,
        GRAY: 1
    }

    export class Scale9Sprite extends cc.Node {
        static state: Scale9SpriteState;


        /**
         * Constructor function.
         * @function
         * @param {string|cc.SpriteFrame} file file name of texture or a SpriteFrame
         * @param {cc.Rect} rectOrCapInsets
         * @param {cc.Rect} capInsets
         * @returns {Scale9Sprite}
         */
        constructor(file: string | cc.SpriteFrame, rectOrCapInsets?: cc.Rect, capInsets?: cc.Rect);

        /**
         * Sets a new sprite frame to the sprite.
         * @function
         * @param {cc.SpriteFrame|String} newFrame
         */
        public setSpriteFrame(newFrame: cc.SpriteFrame | String): void;

        /**
         * Change the state of 9-slice sprite.
         * @see `State`
         * @param state A enum value in State.
         */
        public setState(state: number): void;
    }
}