declare module cc {
    /**
     * Base class of all kinds of events.
     * @class
     * @extends cc.Class
     */
    export class Event extends Class {
        public ctor(type: number): void;
        public ctor(): void;
        /**
         * <p>
         *     Gets current target of the event                                                            <br/>
         *     note: It only be available when the event listener is associated with node.                <br/>
         *          It returns 0 when the listener is associated with fixed priority.
         * </p>
         * @function
         * @returns {cc.Node}  The target with which the event associates.
         */
        public getCurrentTarget(): cc.Node;
    }

    /**
     * The mouse event
     * @class
     * @extends cc.Event
     */
    export class EventMouse extends Event {
        public ctor(eventType: number): void;
        public ctor(): void;

        public getLocation(): cc.Point;
    }
}
