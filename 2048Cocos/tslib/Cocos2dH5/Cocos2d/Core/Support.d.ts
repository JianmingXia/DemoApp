declare module cc {
    /**
     * Calculates the square length of a cc.Point (not calling sqrt() )
     * @param  {cc.Point} v
     *@return {Number}
     */
    export function pLength(v: cc.Point): number;

    /**
     * Calculates difference of two points.
     * @param {cc.Point} v1
     * @param {cc.Point} v2
     * @return {cc.Point}
     */
    export function pSub(v1: cc.Point, v2: cc.Point): cc.Point;
}