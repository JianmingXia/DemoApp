declare module cc {
    /**
     * <p>
     *     The base class of event listener.                                                                        <br/>
     *     If you need custom listener which with different callback, you need to inherit this class.               <br/>
     *     For instance, you could refer to EventListenerAcceleration, EventListenerKeyboard,                       <br/>
     *      EventListenerTouchOneByOne, EventListenerCustom.
     * </p>
     * @class
     * @extends cc.Class
     */
    export class EventListener extends Class {
        /**
         * The type code of unknown event listener.
         * @constant
         * @type {number}
         */
        static UNKNOWN: number;
        /**
         * The type code of one by one touch event listener.
         * @constant
         * @type {number}
         */
        static TOUCH_ONE_BY_ONE: number;
        /**
         * The type code of all at once touch event listener.
         * @constant
         * @type {number}
         */
        static TOUCH_ALL_AT_ONCE: number;
        /**
         * The type code of keyboard event listener.
         * @constant
         * @type {number}
         */
        static KEYBOARD: number;
        /**
         * The type code of mouse event listener.
         * @constant
         * @type {number}
         */
        static MOUSE: number;
        /**
         * The type code of acceleration event listener.
         * @constant
         * @type {number}
         */
        static ACCELERATION: number;
        /**
         * The type code of Focus change event listener.
         * @constant
         * @type {number}
         */
        static FOCUS: number;
        /**
         * The type code of custom event listener.
         * @constant
         * @type {number}
         */
        static CUSTOM: number;
        /**
         * Initializes event with type and callback function
         * @param {number} type
         * @param {string} listenerID
         * @param {function} callback
         */
        public ctor(type: number, listenerID: string, callback: any): void;
        public ctor(): void;

        public static create(argObj: any): cc.EventListener;
    }
}