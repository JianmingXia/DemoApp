declare namespace ccui {
    /**
     * The ImageView control of Cocos GUI
     * @class
     * @extends ccui.Widget
     */
    export class ImageView extends Widget {
        /**
         * Loads textures for button.
         * @param {String} fileName
         * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
         */
        public loadTexture(path: string, textype: number): void;

        /**
         * Sets if button is using scale9 renderer.
         * @param {Boolean} able
         */
        public setScale9Enabled(able: boolean): void;

        /**
         * Ignore the imageView's custom size, true that imageView will ignore it's custom size, use renderer's content size, false otherwise.
         * @override
         * @param {Boolean} ignore
         */
        public ignoreContentAdaptWithSize(ignore: boolean): void;

        /**
         * Sets capinsets for button, if button is using scale9 renderer.
         * @param {cc.Rect} capInsets
         */
        public setCapInsets(rect: cc.Rect): void;

        /**
         * Sets _customSize of ccui.Widget, if ignoreSize is true, the content size is its renderer's contentSize, otherwise the content size is parameter.
         * and updates size percent by parent content size. At last, updates its children's size and position.
         * @param {cc.Size|Number} contentSize content size or width of content size
         * @param {Number} [height]
         * @override
         */
        public setContentSize(contentSize: number, height: number): void;
    }
}