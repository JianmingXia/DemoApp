declare module cc {
    /**
     * <p>
     *  cc.eventManager is a singleton object which manages event listener subscriptions and event dispatching. <br/>
     *                                                                                                              <br/>
     *  The EventListener list is managed in such way so that event listeners can be added and removed          <br/>
     *  while events are being dispatched.
     * </p>
     * @class
     * @name cc.eventManager
     */
    export class eventManager {
        /**
         * <p>
         * Adds a event listener for a specified event.                                                                                                            <br/>
         * if the parameter "nodeOrPriority" is a node, it means to add a event listener for a specified event with the priority of scene graph.                   <br/>
         * if the parameter "nodeOrPriority" is a Number, it means to add a event listener for a specified event with the fixed priority.                          <br/>
         * </p>
         * @param {cc.EventListener|Object} listener The listener of a specified event or a object of some event parameters.
         * @param {cc.Node|Number} nodeOrPriority The priority of the listener is based on the draw order of this node or fixedPriority The fixed priority of the listener.
         * @note  The priority of scene graph will be fixed value 0. So the order of listener item in the vector will be ' <0, scene graph (0 priority), >0'.
         *         A lower priority will be called before the ones that have a higher value. 0 priority is forbidden for fixed priority since it's used for scene graph based priority.
         *         The listener must be a cc.EventListener object when adding a fixed priority listener, because we can't remove a fixed priority listener without the listener handler,
         *         except calls removeAllListeners().
         * @return {cc.EventListener} Return the listener. Needed in order to remove the event from the dispatcher.
         */
        static addListener: (listener: cc.EventListener | Object, nodeOrPriority: cc.Node | Number) => cc.EventListener;

        /**
         * Remove a listener
         * @param {cc.EventListener} listener an event listener or a registered node target
         */
        static removeListener(listener: cc.EventListener | Object): void;
    }
}
