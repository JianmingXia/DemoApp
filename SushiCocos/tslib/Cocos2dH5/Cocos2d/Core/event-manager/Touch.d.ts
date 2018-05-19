declare module cc {
    /**
     * The touch event class
     * @class
     * @extends cc.Class
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} id
     */
    export class Touch extends Class {
        public ctor(x: number, y: number, id: number): void;
        public ctor(): void;

        /**
         * Returns the current touch location in OpenGL coordinates
         * @return {cc.Point}
         */
        public getLocation(): cc.Point;
    }
}
