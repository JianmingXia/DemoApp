declare type CallFuncCallback = (targetOrData?:any, data?:any)=>any;

declare namespace cc {
    // +--------------------------------------------------------------------------------
    // + File: cocos2d/core/base-nodes/CCAction.js
    // +--------------------------------------------------------------------------------

    /** Default Action tag
     * @constant
     * @type {Number}
     * @default
     */
    export const ACTION_TAG_INVALID:number;

    /**
     * Base class for cc.Action objects.
     * @class
     *
     * @extends cc.Class
     *
     * @property {cc.Node}  target          - The target will be set with the 'startWithTarget' method. When the 'stop' method is called, target will be set to nil.
     * @property {cc.Node}  originalTarget  - The original target of the action.
     * @property {Number}   tag             - The tag of the action, can be used to find the action.
     */
    export class Action extends Class {
        public originalTarget:Node;
        public target:Node;
        public tag:number;

        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         */
        public ctor():void;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.Action}
         */
        public clone():Action;

        /**
         * return true if the action has finished.
         *
         * @return {Boolean}
         */
        public isDone():boolean;

        /**
         * called before the action start. It will also set the target.
         *
         * @param {cc.Node} target
         */
        public startWithTarget(target:Node):void;

        /**
         * called after the action has finished. It will set the 'target' to nil. <br />
         * IMPORTANT: You should never call "action stop" manually. Instead, use: "target.stopAction(action);"
         */
        public stop():void;

        /**
         * called every frame with it's delta time. <br />
         * DON'T override unless you know what you are doing.
         *
         * @param {Number} dt
         */
        public step(dt:number):void;

        /**
         * Called once per frame. Time is the number of seconds of a frame interval.
         *
         * @param {Number}  dt
         */
        public update(dt:number):void;

        /**
         * get the target.
         *
         * @return {cc.Node}
         */
        public getTarget():Node;

        /**
         * The action will modify the target properties.
         *
         * @param {cc.Node} target
         */
        public setTarget(target:Node):void;

        /**
         * get the original target.
         *
         * @return {cc.Node}
         */
        public getOriginalTarget():Node;

        /**
         * Set the original target, since target can be nil. <br/>
         * Is the target that were used to run the action.  <br/>
         * Unless you are doing something complex, like cc.ActionManager, you should NOT call this method. <br/>
         * The target is 'assigned', it is not 'retained'. <br/>
         * @param {cc.Node} originalTarget
         */
        public setOriginalTarget(originalTarget:Node):void;

        /**
         * get tag number.
         * @return {Number}
         */
        public getTag():number;

        /**
         * set tag number.
         * @param {Number} tag
         */
        public setTag(tag:number):void;

        /**
         * Currently JavaScript Bindigns (JSB), in some cases, needs to use retain and release. This is a bug in JSB, <br/>
         * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB. <br/>
         * This is a hack, and should be removed once JSB fixes the retain/release bug.
         */
        public retain():void;

        /**
         * Currently JavaScript Bindigns (JSB), in some cases, needs to use retain and release. This is a bug in JSB, <br/>
         * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB. <br/>
         * This is a hack, and should be removed once JSB fixes the retain/release bug.
         */
        public release():void;
    }

    /**
     * Allocates and initializes the action.
     *
     * @function cc.action
     * @static
     * @return {cc.Action}
     *
     * @example
     * // return {cc.Action}
     * var action = cc.action();
     */
    export function action():Action;

    /**
     * Base class actions that do have a finite time duration. <br/>
     * Possible actions: <br/>
     * - An action with a duration of 0 seconds. <br/>
     * - An action with a duration of 35.5 seconds.
     *
     * Infinite time actions are valid
     * @class
     * @extends cc.Action
     */
    export class FiniteTimeAction extends Action {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         */
        public ctor():void;

        /**
         * get duration of the action. (seconds)
         *
         * @return {Number}
         */
        public getDuration():number;

        /**
         * set duration of the action. (seconds)
         *
         * @param {Number} duration
         */
        public setDuration(duration:number):void;

        /**
         * Returns a reversed action. <br />
         * For example: <br />
         * - The action will be x coordinates of 0 move to 100. <br />
         * - The reversed action will be x of 100 move to 0.
         * - Will be rewritten
         *
         * @return {Null}
         */
        public reverse():void;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.FiniteTimeAction}
         */
        public clone():FiniteTimeAction;
    }

    /**
     * Changes the speed of an action, making it take longer (speed > 1)
     * or less (speed < 1) time. <br/>
     * Useful to simulate 'slow motion' or 'fast forward' effect.
     *
     * @warning This action can't be Sequenceable because it is not an cc.IntervalAction
     * @class
     * @extends cc.Action
     * @param {cc.ActionInterval} action
     * @param {Number} speed
     */
    export class Speed extends Action {
        //_speed: 0.0,
        //_innerAction: null,

        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {cc.ActionInterval} action
         * @param {Number} speed
         */
        public ctor(action:ActionInterval, speed:number):void;
        public ctor():void;

        /**
         * initializes the action.
         *
         * @param {cc.ActionInterval} action
         * @param {Number} speed
         * @return {Boolean}
         */
        public initWithAction(action:ActionInterval, speed:number):boolean;

        /**
         * Gets the current running speed. <br />
         * Will get a percentage number, compared to the original speed.
         *
         * @return {Number}
         */
        public getSpeed():number;

        /**
         * alter the speed of the inner function in runtime.
         *
         * @param {Number} speed
         */
        public setSpeed(speed:number):void;

        /**
         * returns a reversed action. <br />
         * For example: <br />
         * - The action will be x coordinates of 0 move to 100. <br />
         * - The reversed action will be x of 100 move to 0.
         * - Will be rewritten
         *
         * @return {cc.Speed}
         */
        public reverse():Speed;

        /**
         * Set inner Action.
         * @param {cc.ActionInterval} action
         */
        public setInnerAction(action:ActionInterval):void;

        /**
         * Get inner Action.
         *
         * @return {cc.ActionInterval}
         */
        public getInnerAction():ActionInterval;
    }

    /**
     * creates the speed action.
     *
     * @function cc.speed
     * @param {cc.ActionInterval} action
     * @param {Number} speed
     * @return {cc.Speed}
     */
    export function speed(action:ActionInterval, speed:number):Speed;

    /**
     * cc.Follow is an action that "follows" a node.
     *
     * @example
     * //example
     * //Instead of using cc.Camera as a "follower", use this action instead.
     * layer.runAction(cc.follow(hero));
     *
     * @property {Number}  leftBoundary - world leftBoundary.
     * @property {Number}  rightBoundary - world rightBoundary.
     * @property {Number}  topBoundary - world topBoundary.
     * @property {Number}  bottomBoundary - world bottomBoundary.
     *
     * @param {cc.Node} followedNode
     * @param {cc.Rect} rect
     * @example
     * // creates the action with a set boundary
     * var sprite = new cc.Sprite("spriteFileName");
     * var followAction = new cc.Follow(sprite, cc.rect(0, 0, s.width * 2 - 100, s.height));
     * this.runAction(followAction);
     *
     * // creates the action with no boundary set
     * var sprite = new cc.Sprite("spriteFileName");
     * var followAction = new cc.Follow(sprite);
     * this.runAction(followAction);
     *
     * @class
     * @extends cc.Action
     */
    export class Follow extends Action {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * creates the action with a set boundary. <br/>
         * creates the action with no boundary set.
         * @param {cc.Node} followedNode
         * @param {cc.Rect} rect
         */
        public ctor(followedNode:Node, rect:Rect):void;
        public ctor():void;

        public initWithTarget(followedNode:Node, rect:Rect):boolean;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.Follow}
         */
        public clone():Follow;

        /**
         * Get whether camera should be limited to certain area.
         *
         * @return {Boolean}
         */
        public isBoundarySet():boolean;

        /**
         * alter behavior - turn on/off boundary.
         *
         * @param {Boolean} value
         */
        public setBoudarySet(value:boolean):void;
    }

    /**
     * creates the action with a set boundary. <br/>
     * creates the action with no boundary set.
     *
     * @function
     * @param {cc.Node} followedNode
     * @param {cc.Rect} rect
     * @return {cc.Follow|Null} returns the cc.Follow object on success
     * @example
     * // example
     * // creates the action with a set boundary
     * var sprite = new cc.Sprite("spriteFileName");
     * var followAction = cc.follow(sprite, cc.rect(0, 0, s.width * 2 - 100, s.height));
     * this.runAction(followAction);
     *
     * // creates the action with no boundary set
     * var sprite = new cc.Sprite("spriteFileName");
     * var followAction = cc.follow(sprite);
     * this.runAction(followAction);
     */
    export function follow(followedNode:Node, rect:Rect):Follow;

    // +--------------------------------------------------------------------------------
    // + File: cocos2d/core/base-nodes/CCActionCamera.js
    // +--------------------------------------------------------------------------------
    /**
     * Base class for cc.Camera actions
     * @class
     * @extends cc.ActionInterval
     */
    export class ActionCamera extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         */
        public ctor():void;

        /**
         * called before the action start. It will also set the target.
         *
         * @param {cc.Node} target
         */
        public startWithTarget(target:Node):void;

        /**
         * to copy object with deep copy.
         * returns a new clone of the action
         *
         * @returns {cc.ActionCamera}
         */
        public clone():ActionCamera;

        /**
         * returns a reversed action. <br />
         * For example: <br />
         * - The action will be x coordinates of 0 move to 100. <br />
         * - The reversed action will be x of 100 move to 0.
         * - Will be rewritten
         *
         */
        public reverse():ActionCamera;
    }

    export interface SphericalCoordinates {
        newRadius:number;
        zenith:number;
        azimuth:number;
    }

    /**
     * Orbits the camera around the center of the screen using spherical coordinates.
     *
     * @param {Number} t time
     * @param {Number} radius
     * @param {Number} deltaRadius
     * @param {Number} angleZ
     * @param {Number} deltaAngleZ
     * @param {Number} angleX
     * @param {Number} deltaAngleX
     *
     * @class
     * @extends cc.ActionCamera
     */
    export class OrbitCamera extends ActionCamera {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * creates a cc.OrbitCamera action with radius, delta-radius,  z, deltaZ, x, deltaX.
         * @param {Number} t time
         * @param {Number} radius
         * @param {Number} deltaRadius
         * @param {Number} angleZ
         * @param {Number} deltaAngleZ
         * @param {Number} angleX
         * @param {Number} deltaAngleX
         */
        public ctor(t:number,
                    radius:number,
                    deltaRadius:number,
                    angleZ:number,
                    deltaAngleZ:number,
                    angleX:number,
                    deltaAngleX:number):void;
        public ctor():void;

        /**
         * initializes a cc.OrbitCamera action with radius, delta-radius,  z, deltaZ, x, deltaX
         * @param {Number} t time
         * @param {Number} radius
         * @param {Number} deltaRadius
         * @param {Number} angleZ
         * @param {Number} deltaAngleZ
         * @param {Number} angleX
         * @param {Number} deltaAngleX
         * @return {Boolean}
         */
        public initWithDuration(t:number,
                                radius:number,
                                deltaRadius:number,
                                angleZ:number,
                                deltaAngleZ:number,
                                angleX:number,
                                deltaAngleX:number):boolean;
        public initWithDuration(d:number):boolean;

        /**
         * positions the camera according to spherical coordinates
         * @return {Object}
         */
        public sphericalRadius():SphericalCoordinates;

        /**
         * called before the action start. It will also set the target.
         *
         * @param {cc.Node} target
         */
        public startWithTarget(target:Node):void;

        /**
         * to copy object with deep copy.
         * returns a new clone of the action
         *
         * @returns {cc.ActionCamera}
         */
        public clone():ActionCamera;
    }

    /**
     * creates a cc.OrbitCamera action with radius, delta-radius,  z, deltaZ, x, deltaX
     * @function
     * @param {Number} t time
     * @param {Number} radius
     * @param {Number} deltaRadius
     * @param {Number} angleZ
     * @param {Number} deltaAngleZ
     * @param {Number} angleX
     * @param {Number} deltaAngleX
     * @return {cc.OrbitCamera}
     */
    export function orbitCamera(t:number,
                                radius:number,
                                deltaRadius:number,
                                angleZ:number,
                                deltaAngleZ:number,
                                angleX:number,
                                deltaAngleX:number):OrbitCamera;


    // +--------------------------------------------------------------------------------
    // + File: cocos2d/core/base-nodes/CCActionCatmullRom.js
    // +--------------------------------------------------------------------------------
    /**
     * Returns the Cardinal Spline position for a given set of control points, tension and time. <br />
     * CatmullRom Spline formula. <br />
     * s(-ttt + 2tt - t)P1 + s(-ttt + tt)P2 + (2ttt - 3tt + 1)P2 + s(ttt - 2tt + t)P3 + (-2ttt + 3tt)P3 + s(ttt - tt)P4
     *
     * @function
     * @param {cc.Point} p0
     * @param {cc.Point} p1
     * @param {cc.Point} p2
     * @param {cc.Point} p3
     * @param {Number} tension
     * @param {Number} t
     * @return {cc.Point}
     */
    export function cardinalSplineAt(p0:cc.Point,
                                     p1:cc.Point,
                                     p2:cc.Point,
                                     p3:cc.Point,
                                     tension:number,
                                     t:number):cc.Point;

    /**
     * returns a new copy of the array reversed.
     *
     * @return {Array}
     */
    export function reverseControlPoints (controlPoints:cc.Point[]):cc.Point[];


    /**
     * returns a new clone of the controlPoints
     *
     * @param controlPoints
     * @returns {Array}
     */
    export function cloneControlPoints (controlPoints:cc.Point[]):cc.Point[];

    /**
     * returns a point from the array
     *
     * @param {Array} controlPoints
     * @param {Number} pos
     * @return {cc.Point}
     */
    export function getControlPointAt(controlPoints:cc.Point[], pos:number):cc.Point;

    /**
     * reverse the current control point array inline, without generating a new one <br />
     *
     * @param controlPoints
     */
    export function reverseControlPointsInline(controlPoints:cc.Point[]):void;


    /**
     * Cardinal Spline path. {@link http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline}
     * Absolute coordinates.
     *
     * @class
     * @extends cc.ActionInterval
     * @param {Number} duration
     * @param {Array} points array of control points
     * @param {Number} tension
     *
     * @example
     * //create a cc.CardinalSplineTo
     * var action1 = cc.cardinalSplineTo(3, array, 0);
     */
    export class CardinalSplineTo extends ActionInterval {
        ///** Array of control points */
        //_points:null,
        //_deltaT:0,
        //_tension:0,
        //_previousPosition:null,
        //_accumulatedDiff:null,

        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Creates an action with a Cardinal Spline array of points and tension.
         * @param {Number} duration
         * @param {Array} points array of control points
         * @param {Number} tension
         */
        public ctor(duration:number, points:cc.Point[], tension:number):void;
        public ctor():void;

        /**
         * initializes the action with a duration and an array of points
         *
         * @param {Number} duration
         * @param {Array} points array of control points
         * @param {Number} tension
         *
         * @return {Boolean}
         */
        public initWithDuration(duration:number, points:cc.Point[], tension:number):boolean;
        public initWithDuration(d:number):boolean;

        /**
         * returns a new clone of the action
         *
         * @returns {cc.CardinalSplineTo}
         */
        public clone():CardinalSplineTo;

        /**
         * called before the action start. It will also set the target.
         *
         * @param {cc.Node} target
         */
        public startWithTarget(target:Node):void;

        /**
         * reverse a new cc.CardinalSplineTo. <br />
         * Along the track of movement in the opposite.
         *
         * @return {cc.CardinalSplineTo}
         */
        public reverse():CardinalSplineTo;

        /**
         * update position of target
         *
         * @param {cc.Point} newPos
         */
        public updatePosition(newPos:cc.Point):void;

        /**
         * Points getter
         *
         * @return {Array}
         */
        public getPoints():cc.Point[];

        /**
         * Points setter
         *
         * @param {Array} points
         */
        public setPoints(points:cc.Point[]):void;
    }

    /**
     * creates an action with a Cardinal Spline array of points and tension.
     *
     * @function
     * @param {Number} duration
     * @param {Array} points array of control points
     * @param {Number} tension
     * @return {cc.CardinalSplineTo}
     *
     * @example
     * //create a cc.CardinalSplineTo
     * var action1 = cc.cardinalSplineTo(3, array, 0);
     */
    export function cardinalSplineTo(duration:number, points:cc.Point[], tension:number):CardinalSplineTo;

    /**
     * Cardinal Spline path. {@link http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline}
     * Relative coordinates.
     *
     * @class
     * @extends cc.CardinalSplineTo
     * @param {Number} duration
     * @param {Array} points
     * @param {Number} tension
     *
     * @example
     * //create a cc.CardinalSplineBy
     * var action1 = cc.cardinalSplineBy(3, array, 0);
     */
    export class CardinalSplineBy extends CardinalSplineTo {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * creates an action with a Cardinal Spline array of points and tension.
         * @param {Number} duration
         * @param {Array} points
         * @param {Number} tension
         */
        public ctor(duration:number, points:cc.Point[], tension:number):void;
        public ctor():void;

        /**
         * reverse a new cc.CardinalSplineBy
         *
         * @return {cc.CardinalSplineBy}
         */
        public reverse():CardinalSplineBy;

        /**
         * returns a new clone of the action
         *
         * @returns {cc.CardinalSplineBy}
         */
        public clone():CardinalSplineBy;
    }

    /**
     * creates an action with a Cardinal Spline array of points and tension.
     *
     * @function
     * @param {Number} duration
     * @param {Array} points
     * @param {Number} tension
     *
     * @return {cc.CardinalSplineBy}
     */
    export function cardinalSplineBy(duration:number, points:cc.Point[], tension:number):CardinalSplineBy;

    /**
     * An action that moves the target with a CatmullRom curve to a destination point.<br/>
     * A Catmull Rom is a Cardinal Spline with a tension of 0.5.  <br/>
     * {@link http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline}
     * Absolute coordinates.
     *
     * @class
     * @extends cc.CardinalSplineTo
     * @param {Number} dt
     * @param {Array} points
     *
     * @example
     * var action1 = cc.catmullRomTo(3, array);
     */
    export class CatmullRomTo extends CardinalSplineTo {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * creates an action with a Cardinal Spline array of points and tension.
         * @param {Number} dt
         * @param {Array} points
         * @param {number} [tension] Ignore, only here to suppress TypeScript compiler error for overloading method.
         */
        public ctor(dt:number, points:cc.Point[], tension:number):void;
        public ctor():void;

        /**
         * returns a new clone of the action
         * @returns {cc.CatmullRomTo}
         */
        public clone():CatmullRomTo;
    }

    /**
     * creates an action with a Cardinal Spline array of points and tension.
     *
     * @function
     * @param {Number} dt
     * @param {Array} points
     * @param {number} [tension] Ignore, only here to suppress TypeScript compiler error for overloading method.
     * @return {cc.CatmullRomTo}
     *
     * @example
     * var action1 = cc.catmullRomTo(3, array);
     */
    export function catmullRomTo(dt:number, points:cc.Point[], tension?:number):CatmullRomTo;

    /**
     * An action that moves the target with a CatmullRom curve by a certain distance.  <br/>
     * A Catmull Rom is a Cardinal Spline with a tension of 0.5.<br/>
     * http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline
     * Relative coordinates.
     *
     * @class
     * @extends cc.CardinalSplineBy
     * @param {Number} dt
     * @param {Array} points
     *
     * @example
     * var action1 = cc.catmullRomBy(3, array);
     */
    export class CatmullRomBy extends CardinalSplineBy {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Creates an action with a Cardinal Spline array of points and tension.
         * @param {Number} dt
         * @param {Array} points
         */
        public ctor(dt:number, points:cc.Point[]):void;
        public ctor():void;

        /**
         * initializes the action with a duration and an array of points
         *
         * @function
         * @param {Number} dt
         * @param {Array} points
         */
        public initWithDuration(dt:number, points:cc.Point[]):boolean;
        public initWithDuration(d:number):boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.CatmullRomBy}
         */
        public clone():CatmullRomBy;
    }

    /**
     * Creates an action with a Cardinal Spline array of points and tension
     * @function
     * @param {Number} dt
     * @param {Array} points
     * @return {cc.CatmullRomBy}
     * @example
     * var action1 = cc.catmullRomBy(3, array);
     */
    export function catmullRomBy(dt:number, points:cc.Point[]):CatmullRomBy;

    // +--------------------------------------------------------------------------------
    // + File: cocos2d/core/base-nodes/CCActionEase.js
    // +--------------------------------------------------------------------------------
    /**
     * Base class for Easing actions
     * @class
     * @extends cc.ActionInterval
     * @param {cc.ActionInterval} action
     *
     * @deprecated since v3.0 Does not recommend the use of the base object.
     *
     * @example
     * var moveEase = new cc.ActionEase(action);
     */
    export class ActionEase extends ActionInterval {
        //_inner:null,

        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * creates the action of ActionEase.
         * @param {cc.ActionInterval} action
         */
        public ctor(action:ActionInterval):void;
        public ctor():void;

        /**
         * initializes the action
         *
         * @param {cc.ActionInterval} action
         * @return {Boolean}
         */
        public initWithAction(action:ActionInterval):boolean;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.ActionEase}
         */
        public clone():ActionEase;

        /**
         * Create new action to original operation effect opposite. <br />
         * For example: <br />
         * - The action will be x coordinates of 0 move to 100. <br />
         * - The reversed action will be x of 100 move to 0.
         * - Will be rewritten
         * @return {cc.ActionEase}
         */
        public reverse():ActionEase;

        /**
         * Get inner Action.
         *
         * @return {cc.ActionInterval}
         */
        public getInnerAction():ActionInterval;
    }

    /**
     * creates the action of ActionEase
     *
     * @param {cc.ActionInterval} action
     * @return {cc.ActionEase}
     * @example
     * // example
     * var moveEase = cc.actionEase(action);
     */
    export function actionEase(action:ActionInterval):ActionEase;

    /**
     * Base class for Easing actions with rate parameters
     *
     * @class
     * @extends cc.ActionEase
     * @param {cc.ActionInterval} action
     * @param {Number} rate
     *
     * @deprecated since v3.0 please cc.easeRateAction(action, 3.0);
     *
     * @example
     * //The old usage
     * cc.EaseRateAction.create(action, 3.0);
     * //The new usage
     * var moveEaseRateAction = cc.easeRateAction(action, 3.0);
     */
    export class EaseRateAction extends ActionEase {
        //_rate:0,

        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Creates the action with the inner action and the rate parameter.
         * @param {cc.ActionInterval} action
         * @param {Number} rate
         */
        public ctor(action:ActionInterval, rate?:number):void;
        public ctor():void;

        /**
         * Initializes the action with the inner action and the rate parameter
         * @param {cc.ActionInterval} action
         * @param {Number} rate
         * @return {Boolean}
         */
        public initWithAction(action:ActionInterval, rate?:number):boolean;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseRateAction}
         */
        public clone():EaseRateAction;

        /**
         * set rate value for the actions
         * @param {Number} rate
         */
        public setRate(rate:number):void;

        /** get rate value for the actions
         * @return {Number}
         */
        public getRate():number;

        /**
         * Create new action to original operation effect opposite. <br />
         * For example: <br />
         * - The action will be x coordinates of 0 move to 100. <br />
         * - The reversed action will be x of 100 move to 0.
         * - Will be rewritten
         * @return {cc.EaseRateAction}
         */
        public reverse():EaseRateAction;
    }

    /**
     * Creates the action with the inner action and the rate parameter.
     *
     * @param {cc.ActionInterval} action
     * @param {Number} rate
     * @return {cc.EaseRateAction}
     * @example
     * // example
     * var moveEaseRateAction = cc.easeRateAction(action, 3.0);
     */
    export function easeRateAction(action:ActionInterval, rate:number):EaseRateAction;

    /**
     * cc.EaseIn action with a rate. From slow to fast.
     *
     * @class
     * @extends cc.EaseRateAction
     *
     * @deprecated since v3.0 please use action.easing(cc.easeIn(3));
     *
     * @example
     * //The old usage
     * cc.EaseIn.create(action, 3);
     * //The new usage
     * action.easing(cc.easeIn(3.0));
     */
    export class EaseIn extends EaseRateAction {
        /**
         * Create a cc.easeIn action. Opposite with the original motion trajectory.
         * @return {cc.EaseIn}
         */
        public reverse():EaseIn;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseIn}
         */
        public clone():EaseIn;
    }

    /**
     * Creates the action easing object with the rate parameter. <br />
     * From slow to fast.
     *
     * @function
     * @param {Number} rate
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeIn(3.0));
     */
    export function easeIn(rate:number):EaseIn;

    /**
     * cc.EaseOut action with a rate. From fast to slow.
     *
     * @class
     * @extends cc.EaseRateAction
     *
     * @deprecated since v3.0 please use action.easing(cc.easeOut(3))
     *
     * @example
     * //The old usage
     * cc.EaseOut.create(action, 3);
     * //The new usage
     * action.easing(cc.easeOut(3.0));
     */
    export class EaseOut extends EaseRateAction {
        /**
         * Create a cc.easeIn action. Opposite with the original motion trajectory.
         * @return {cc.EaseOut}
         */
        public reverse():EaseOut;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseOut}
         */
        public clone():EaseOut;
    }

    /**
     * Creates the action easing object with the rate parameter. <br />
     * From fast to slow.
     *
     * @function
     * @param {Number} rate
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeOut(3.0));
     */
    export function easeOut(rate:number):EaseOut;

    /**
     * cc.EaseInOut action with a rate. <br />
     * Slow to fast then to slow.
     * @class
     * @extends cc.EaseRateAction
     *
     * @deprecated since v3.0 please use action.easing(cc.easeInOut(3.0))
     *
     * @example
     * //The old usage
     * cc.EaseInOut.create(action, 3);
     * //The new usage
     * action.easing(cc.easeInOut(3.0));
     */
    export class EaseInOut extends EaseRateAction {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseInOut}
         */
        public clone():EaseInOut;

        /**
         * Create a cc.EaseInOut action. Opposite with the original motion trajectory.
         * @return {cc.EaseInOut}
         */
        public reverse():EaseInOut;
    }

    /**
     * Creates the action easing object with the rate parameter. <br />
     * Slow to fast then to slow.
     * @function
     * @param {Number} rate
     * @return {Object}
     *
     * @example
     * //The new usage
     * action.easing(cc.easeInOut(3.0));
     */
    export function easeInOut(rate:number):EaseInOut;

    /**
     * cc.Ease Exponential In. Slow to Fast. <br />
     * Reference easeInExpo: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 please action.easing(cc.easeExponentialIn())
     *
     * @example
     * //The old usage
     * cc.EaseExponentialIn.create(action);
     * //The new usage
     * action.easing(cc.easeExponentialIn());
     */
    export class EaseExponentialIn extends ActionEase {
        /**
         * Create a cc.EaseExponentialOut action. Opposite with the original motion trajectory.
         * @return {cc.EaseExponentialOut}
         */
        public reverse():EaseExponentialOut;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseExponentialIn}
         */
        public clone():EaseExponentialIn;
    }

    //// TODO: What's this for? Does it alter the inteface?
    //cc._easeExponentialInObj = {
    //    easing: function(dt){
    //        return dt === 0 ? 0 : Math.pow(2, 10 * (dt - 1));
    //    },
    //    reverse: function(){
    //        return cc._easeExponentialOutObj;
    //    }
    //};

    /**
     * Creates the action easing object with the rate parameter. <br />
     * Reference easeInExpo: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeExponentialIn());
     */
    export function easeExponentialIn():EaseExponentialIn;

    /**
     * Ease Exponential Out. <br />
     * Reference easeOutExpo: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 please use action.easing(cc.easeExponentialOut())
     *
     * @example
     * //The old usage
     * cc.EaseExponentialOut.create(action);
     * //The new usage
     * action.easing(cc.easeExponentialOut());
     */
    export class EaseExponentialOut extends ActionEase {
        /**
         * Create a cc.EaseExponentialIn action. Opposite with the original motion trajectory.
         * @return {cc.EaseExponentialIn}
         */
        public reverse():EaseExponentialIn;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseExponentialOut}
         */
        public clone():EaseExponentialOut;
    }

    //cc._easeExponentialOutObj = {
    //    easing: function(dt){
    //        return dt === 1 ? 1 : (-(Math.pow(2, -10 * dt)) + 1);
    //    },
    //    reverse: function(){
    //        return cc._easeExponentialInObj;
    //    }
    //};

    /**
     * creates the action easing object. <br />
     * Reference easeOutExpo: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     *
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeExponentialOut());
     */
    export function easeExponentialOut():EaseExponentialOut;

    /**
     * Ease Exponential InOut. <br />
     * Reference easeInOutExpo: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     *
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 please use action.easing(cc.easeExponentialInOut)
     *
     * @example
     * //The old usage
     * cc.EaseExponentialInOut.create(action);
     * //The new usage
     * action.easing(cc.easeExponentialInOut());
     */
    export class EaseExponentialInOut extends ActionEase {

        /**
         * Create a cc.EaseExponentialInOut action. Opposite with the original motion trajectory.
         * @return {cc.EaseExponentialInOut}
         */
        public reverse():EaseExponentialInOut;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseExponentialInOut}
         */
        public clone():EaseExponentialInOut;
    }

    //cc._easeExponentialInOutObj = {
    //    easing: function(dt){
    //        if( dt !== 1 && dt !== 0) {
    //            dt *= 2;
    //            if (dt < 1)
    //                return 0.5 * Math.pow(2, 10 * (dt - 1));
    //            else
    //                return 0.5 * (-Math.pow(2, -10 * (dt - 1)) + 2);
    //        }
    //        return dt;
    //    },
    //    reverse: function(){
    //        return cc._easeExponentialInOutObj;
    //    }
    //};

    /**
     * creates an EaseExponentialInOut action easing object. <br />
     * Reference easeInOutExpo: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeExponentialInOut());
     */
    export function easeExponentialInOut():EaseExponentialInOut;

    /**
     * Ease Sine In. <br />
     * Reference easeInSine: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 please use action.easing(cc.easeSineIn())
     *
     * @example
     * //The old usage
     * cc.EaseSineIn.create(action);
     * //The new usage
     * action.easing(cc.easeSineIn());
     */
    export class EaseSineIn extends ActionEase {
        /**
         * Create a cc.EaseSineOut action. Opposite with the original motion trajectory.
         * @return {cc.EaseSineOut}
         */
        public reverse():EaseSineOut;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseSineIn}
         */
        public clone():EaseSineIn;
    }

    //cc._easeSineInObj = {
    //    easing: function(dt){
    //        return (dt===0 || dt===1) ? dt : -1 * Math.cos(dt * Math.PI / 2) + 1;
    //    },
    //    reverse: function(){
    //        return cc._easeSineOutObj;
    //    }
    //};

    /**
     * creates an EaseSineIn action. <br />
     * Reference easeInSine: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeSineIn());
     */
    export function easeSineIn():EaseSineIn;

    /**
     * Ease Sine Out. <br />
     * Reference easeOutSine: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 please use action.easing(cc.easeSineOut())
     *
     * @example
     * //The old usage
     * cc.EaseSineOut.create(action);
     * //The new usage
     * action.easing(cc.easeSineOut());
     */
    export class EaseSineOut extends ActionEase {
        /**
         * Create a cc.EaseSineIn action. Opposite with the original motion trajectory.
         * @return {cc.EaseSineIn}
         */
        public reverse():EaseSineIn;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseSineOut}
         */
        public clone():EaseSineOut;
    }

    //cc._easeSineOutObj = {
    //    easing: function(dt){
    //        return (dt===0 || dt===1) ? dt : Math.sin(dt * Math.PI / 2);
    //    },
    //    reverse: function(){
    //        return cc._easeSineInObj;
    //    }
    //};

    /**
     * Creates an EaseSineOut action easing object. <br />
     * Reference easeOutSine: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeSineOut());
     */
    export function easeSineOut():EaseSineOut;

    /**
     * Ease Sine InOut. <br />
     * Reference easeInOutSine: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 please use action.easing(cc.easeSineInOut())
     *
     * @example
     * //The old usage
     * cc.EaseSineInOut.create(action);
     * //The new usage
     * action.easing(cc.easeSineInOut());
     */
    export class EaseSineInOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseSineInOut}
         */
        public clone():EaseSineInOut;

        /**
         * Create a cc.EaseSineInOut action. Opposite with the original motion trajectory.
         * @return {cc.EaseSineInOut}
         */
        public reverse():EaseSineInOut;
    }

    //cc._easeSineInOutObj = {
    //    easing: function(dt){
    //        return (dt === 0 || dt === 1) ? dt : -0.5 * (Math.cos(Math.PI * dt) - 1);
    //    },
    //    reverse: function(){
    //        return cc._easeSineInOutObj;
    //    }
    //};

    /**
     * creates the action easing object. <br />
     * Reference easeInOutSine: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeSineInOut());
     */
    export function easeSineInOut():EaseSineInOut;

    /**
     * Ease Elastic abstract class.
     * @class
     * @extends cc.ActionEase
     * @param {cc.ActionInterval} action
     * @param {Number} [period=0.3]
     *
     * @deprecated since v3.0 Does not recommend the use of the base object.
     */
    export class EaseElastic extends ActionEase {
        //_period: 0.3,

        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Creates the action with the inner action and the period in radians (default is 0.3).
         * @param {cc.ActionInterval} action
         * @param {Number} [period=0.3]
         */
        public ctor(action:ActionInterval, period?:number):void;
        public ctor():void;

        /**
         * get period of the wave in radians. default is 0.3
         * @return {Number}
         */
        public getPeriod():number;

        /**
         * set period of the wave in radians.
         * @param {Number} period
         */
        public setPeriod(period:number):void;

        /**
         * Initializes the action with the inner action and the period in radians (default is 0.3)
         * @param {cc.ActionInterval} action
         * @param {Number} [period=0.3]
         * @return {Boolean}
         */
        public initWithAction(action:ActionInterval, period:number):boolean;
        public initWithAction(action:ActionInterval):boolean;

        /**
         * Create a action. Opposite with the original motion trajectory. <br />
         * Will be overwrite.
         * @return {null}
         */
        public reverse():EaseElastic;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseElastic}
         */
        public clone():EaseElastic;
    }

    /**
     * Ease Elastic In action. <br />
     * Reference easeInElastic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
     * @class
     * @extends cc.EaseElastic
     *
     * @deprecated since v3.0 please use action.easing(cc.easeElasticIn())
     *
     * @example
     * //The old usage
     * cc.EaseElasticIn.create(action, period);
     * //The new usage
     * action.easing(cc.easeElasticIn(period));
     */
    export class EaseElasticIn extends EaseElastic {
        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseElasticOut}
         */
        public reverse():EaseElasticOut;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseElasticIn}
         */
        public clone():EaseElasticIn;
    }


////default ease elastic in object (period = 0.3)
//    cc._easeElasticInObj = {
//        easing:function(dt){
//            if (dt === 0 || dt === 1)
//                return dt;
//            dt = dt - 1;
//            return -Math.pow(2, 10 * dt) * Math.sin((dt - (0.3 / 4)) * Math.PI * 2 / 0.3);
//        },
//        reverse:function(){
//            return cc._easeElasticOutObj;
//        }
//    };

    /**
     * Creates the action easing obejct with the period in radians (default is 0.3). <br />
     * Reference easeInElastic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @param {Number} [period=0.3]
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeElasticIn(3.0));
     */
    export function easeElasticIn(period?:number):EaseElasticIn;

    /**
     * Ease Elastic Out action. <br />
     * Reference easeOutElastic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
     * @class
     * @extends cc.EaseElastic
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeElasticOut(period))
     *
     * @example
     * //The old usage
     * cc.EaseElasticOut.create(action, period);
     * //The new usage
     * action.easing(cc.easeElasticOut(period));
     */
    export class EaseElasticOut extends EaseElastic {

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseElasticIn}
         */
        public reverse():EaseElasticIn;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseElasticOut}
         */
        public clone():EaseElasticOut;
    }

////default ease elastic out object (period = 0.3)
//    cc._easeElasticOutObj = {
//        easing: function (dt) {
//            return (dt === 0 || dt === 1) ? dt : Math.pow(2, -10 * dt) * Math.sin((dt - (0.3 / 4)) * Math.PI * 2 / 0.3) + 1;
//        },
//        reverse:function(){
//            return cc._easeElasticInObj;
//        }
//    };
    /**
     * Creates the action easing object with the period in radians (default is 0.3). <br />
     * Reference easeOutElastic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @param {Number} [period=0.3]
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeElasticOut(3.0));
     */
    export function easeElasticOut(period?:number):EaseElasticOut;

    /**
     * Ease Elastic InOut action. <br />
     * Reference easeInOutElastic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
     * @class
     * @extends cc.EaseElastic
     *
     * @deprecated since v3.0 please use action.easing(cc.easeElasticInOut())
     *
     * @example
     * //The old usage
     * cc.EaseElasticInOut.create(action, period);
     * //The new usage
     * action.easing(cc.easeElasticInOut(period));
     */
    export class EaseElasticInOut extends EaseElastic {
        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseElasticInOut}
         */
        public reverse():EaseElasticInOut;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseElasticInOut}
         */
        public clone():EaseElasticInOut;
    }

    /**
     * Creates the action easing object with the period in radians (default is 0.3). <br />
     * Reference easeInOutElastic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @param {Number} [period=0.3]
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeElasticInOut(3.0));
     */
    export function easeElasticInOut(period?:number):EaseElasticInOut;

    /**
     * cc.EaseBounce abstract class.
     *
     * @deprecated since v3.0 Does not recommend the use of the base object.
     *
     * @class
     * @extends cc.ActionEase
     */
    export class EaseBounce extends ActionEase {
        /**
         * @param {Number} time1
         * @return {Number}
         */
        public bounceTime(time1:number):number;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseBounce}
         */
        public clone():EaseBounce;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseBounce}
         */
        public reverse():EaseBounce;
    }

    /**
     * cc.EaseBounceIn action. <br />
     * Eased bounce effect at the beginning.
     * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
     * @class
     * @extends cc.EaseBounce
     *
     * @deprecated since v3.0 please use action.easing(cc.easeBounceIn())
     *
     * @example
     * //The old usage
     * cc.EaseBounceIn.create(action);
     * //The new usage
     * action.easing(cc.easeBounceIn());
     */
    export class EaseBounceIn extends EaseBounce {
        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseBounceOut}
         */
        public reverse():EaseBounceOut;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseBounceIn}
         */
        public clone():EaseBounceIn;
    }

    //cc._easeBounceInObj = {
    //    easing: function(dt){
    //        return 1 - cc._bounceTime(1 - dt);
    //    },
    //    reverse: function(){
    //        return cc._easeBounceOutObj;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Eased bounce effect at the beginning.
     * @function
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeBounceIn());
     */
    export function easeBounceIn():EaseBounceIn;

    /**
     * cc.EaseBounceOut action. <br />
     * Eased bounce effect at the ending.
     * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
     * @class
     * @extends cc.EaseBounce
     *
     * @deprecated since v3.0 please use action.easing(cc.easeBounceOut())
     *
     * @example
     * //The old usage
     * cc.EaseBounceOut.create(action);
     * //The new usage
     * action.easing(cc.easeBounceOut());
     */
    export class EaseBounceOut extends EaseBounce {
        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseBounceIn}
         */
        public reverse():EaseBounceIn;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseBounceOut}
         */
        public clone():EaseBounceOut;
    }

    //cc._easeBounceOutObj = {
    //    easing: function(dt){
    //        return cc._bounceTime(dt);
    //    },
    //    reverse:function () {
    //        return cc._easeBounceInObj;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Eased bounce effect at the ending.
     * @function
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeBounceOut());
     */
    export function easeBounceOut():EaseBounceOut;

    /**
     * cc.EaseBounceInOut action. <br />
     * Eased bounce effect at the begining and ending.
     * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
     * @class
     * @extends cc.EaseBounce
     *
     * @deprecated since v3.0 <br /> Please use acton.easing(cc.easeBounceInOut())
     *
     * @example
     * //The old usage
     * cc.EaseBounceInOut.create(action);
     * //The new usage
     * action.easing(cc.easeBounceInOut());
     */
    export class EaseBounceInOut extends EaseBounce {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseBounceInOut}
         */
        public clone():EaseBounceInOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseBounceInOut}
         */
        public reverse():EaseBounceInOut;
    }

    //cc._easeBounceInOutObj = {
    //    easing: function (time1) {
    //        var newT;
    //        if (time1 < 0.5) {
    //            time1 = time1 * 2;
    //            newT = (1 - cc._bounceTime(1 - time1)) * 0.5;
    //        } else {
    //            newT = cc._bounceTime(time1 * 2 - 1) * 0.5 + 0.5;
    //        }
    //        return newT;
    //    },
    //    reverse: function(){
    //        return cc._easeBounceInOutObj;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Eased bounce effect at the begining and ending.
     * @function
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeBounceInOut());
     */
    export function easeBounceInOut():EaseBounceInOut;

    /**
     * cc.EaseBackIn action. <br />
     * In the opposite direction to move slowly, and then accelerated to the right direction.
     * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 please use action.easing(cc.easeBackIn())
     *
     * @example
     * //The old usage
     * cc.EaseBackIn.create(action);
     * //The new usage
     * action.easing(cc.easeBackIn());
     */
    export class EaseBackIn extends ActionEase {
        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseBackOut}
         */
        public reverse():EaseBackOut;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseBackIn}
         */
        public clone():EaseBackIn;
    }

    //cc._easeBackInObj = {
    //    easing: function (time1) {
    //        var overshoot = 1.70158;
    //        return (time1===0 || time1===1) ? time1 : time1 * time1 * ((overshoot + 1) * time1 - overshoot);
    //    },
    //    reverse: function(){
    //        return cc._easeBackOutObj;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * In the opposite direction to move slowly, and then accelerated to the right direction.
     * @function
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeBackIn());
     */
    export function easeBackIn():EaseBackIn;

    /**
     * cc.EaseBackOut action. <br />
     * Fast moving more than the finish, and then slowly back to the finish.
     * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 please use action.easing(cc.easeBackOut());
     *
     * @example
     * //The old usage
     * cc.EaseBackOut.create(action);
     * //The new usage
     * action.easing(cc.easeBackOut());
     */
    export class EaseBackOut extends ActionEase {
        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseBackIn}
         */
        public reverse():EaseBackIn;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseBackOut}
         */
        public clone():EaseBackOut;
    }

    //cc._easeBackOutObj = {
    //    easing: function (time1) {
    //        var overshoot = 1.70158;
    //        time1 = time1 - 1;
    //        return time1 * time1 * ((overshoot + 1) * time1 + overshoot) + 1;
    //    },
    //    reverse: function(){
    //        return cc._easeBackInObj;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Fast moving more than the finish, and then slowly back to the finish.
     * @function
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeBackOut());
     */
    export function easeBackOut():EaseBackOut;

    /**
     * cc.EaseBackInOut action. <br />
     * Begining of cc.EaseBackIn. Ending of cc.EaseBackOut.
     * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeBackInOut())
     *
     * @example
     * //The old usage
     * cc.EaseBackInOut.create(action);
     * //The new usage
     * action.easing(cc.easeBackInOut());
     */
    export class EaseBackInOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseBackInOut}
         */
        public clone():EaseBackInOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseBackInOut}
         */
        public reverse():EaseBackInOut;
    }
    
    //cc._easeBackInOutObj = {
    //    easing: function (time1) {
    //        var overshoot = 1.70158 * 1.525;
    //        time1 = time1 * 2;
    //        if (time1 < 1) {
    //            return (time1 * time1 * ((overshoot + 1) * time1 - overshoot)) / 2;
    //        } else {
    //            time1 = time1 - 2;
    //            return (time1 * time1 * ((overshoot + 1) * time1 + overshoot)) / 2 + 1;
    //        }
    //    },
    //    reverse: function(){
    //        return cc._easeBackInOutObj;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Begining of cc.EaseBackIn. Ending of cc.EaseBackOut.
     * @function
     * @return {Object}
     * @example
     * // example
     * action.easing(cc.easeBackInOut());
     */
    export function easeBackInOut():EaseBackInOut;

    /**
     * cc.EaseBezierAction action. <br />
     * Manually set a 4 order Bessel curve. <br />
     * According to the set point, calculate the trajectory.
     * @class
     * @extends cc.ActionEase
     * @param {cc.Action} action
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeBezierAction())
     *
     * @example
     * //The old usage
     * var action = cc.EaseBezierAction.create(action);
     * action.setBezierParamer(0.5, 0.5, 1.0, 1.0);
     * //The new usage
     * action.easing(cc.easeBezierAction(0.5, 0.5, 1.0, 1.0));
     */
    export class EaseBezierAction extends ActionEase {

        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Initialization requires the application of Bessel curve of action.
         * @param {cc.Action} action
         */
        public ctor(action:Action):void;
        public ctor():void;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseBezierAction}
         */
        public clone():EaseBezierAction;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseBezierAction}
         */
        public reverse():EaseBezierAction;

        /**
         * Set of 4 reference point
         * @param p0
         * @param p1
         * @param p2
         * @param p3
         */
        public setBezierParamer(p0:number, p1:number, p2:number, p3:number):void;
    }

    /**
     * Creates the action easing object. <br />
     * Into the 4 reference point. <br />
     * To calculate the motion curve.
     * @param {Number} p0 The first bezier parameter
     * @param {Number} p1 The second bezier parameter
     * @param {Number} p2 The third bezier parameter
     * @param {Number} p3 The fourth bezier parameter
     * @returns {Object}
     * @example
     * // example
     * action.easing(cc.easeBezierAction(0.5, 0.5, 1.0, 1.0));
     */
    export function easeBezierAction(p0:number, p1:number, p2:number, p3:number):EaseBezierAction;

    /**
     * cc.EaseQuadraticActionIn action. <br />
     * Reference easeInQuad: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeQuadraticAction())
     *
     * @example
     * //The old usage
     * cc.EaseQuadraticActionIn.create(action);
     * //The new usage
     * action.easing(cc.easeQuadraticActionIn());
     */
    export class EaseQuadraticActionIn extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseQuadraticActionIn}
         */
        public clone():EaseQuadraticActionIn;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseQuadraticActionIn}
         */
        public reverse():EaseQuadraticActionIn;
    }

    //cc._easeQuadraticActionIn = {
    //    easing: cc.EaseQuadraticActionIn.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeQuadraticActionIn;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeInQuad: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeQuadraticActionIn());
     */
    export function easeQuadraticActionIn():EaseQuadraticActionIn;

    /**
     * cc.EaseQuadraticActionIn action. <br />
     * Reference easeOutQuad: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeQuadraticActionOut())
     *
     * @example
     * //The old usage
     * cc.EaseQuadraticActionOut.create(action);
     * //The new usage
     * action.easing(cc.easeQuadraticActionOut());
     */
    export class EaseQuadraticActionOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseQuadraticActionOut}
         */
        public clone():EaseQuadraticActionOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseQuadraticActionOut}
         */
        public reverse():EaseQuadraticActionOut;
    }

    //cc._easeQuadraticActionOut = {
    //    easing: cc.EaseQuadraticActionOut.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeQuadraticActionOut;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeOutQuad: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeQuadraticActionOut());
     */
    export function easeQuadraticActionOut():EaseQuadraticActionOut;

    /**
     * cc.EaseQuadraticActionInOut action. <br />
     * Reference easeInOutQuad: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeQuadraticActionInOut())
     *
     * @example
     * //The old usage
     * cc.EaseQuadraticActionInOut.create(action);
     * //The new usage
     * action.easing(cc.easeQuadraticActionInOut());
     */
    export class EaseQuadraticActionInOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseQuadraticActionInOut}
         */
        public clone():EaseQuadraticActionInOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseQuadraticActionInOut}
         */
        public reverse():EaseQuadraticActionInOut;
    }

    //cc._easeQuadraticActionInOut = {
    //    easing: cc.EaseQuadraticActionInOut.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeQuadraticActionInOut;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeInOutQuad: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeQuadraticActionInOut());
     */
    export function easeQuadraticActionInOut():EaseQuadraticActionInOut;

    /**
     * cc.EaseQuarticActionIn action. <br />
     * Reference easeInQuart: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeQuarticActionIn());
     *
     * @example
     * //The old usage
     * cc.EaseQuarticActionIn.create(action);
     * //The new usage
     * action.easing(cc.easeQuarticActionIn());
     */
    export class EaseQuarticActionIn extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseQuarticActionIn}
         */
        public clone():EaseQuarticActionIn;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseQuarticActionIn}
         */
        public reverse():EaseQuarticActionIn;
    }

    //cc._easeQuarticActionIn = {
    //    easing: cc.EaseQuarticActionIn.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeQuarticActionIn;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeIntQuart: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeQuarticActionIn());
     */
    export function easeQuarticActionIn():EaseQuarticActionIn;

    /**
     * cc.EaseQuarticActionOut action. <br />
     * Reference easeOutQuart: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.QuarticActionOut());
     *
     * @example
     * //The old usage
     * cc.EaseQuarticActionOut.create(action);
     * //The new usage
     * action.easing(cc.EaseQuarticActionOut());
     */
    export class EaseQuarticActionOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseQuarticActionOut}
         */
        public clone():EaseQuarticActionOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseQuarticActionOut}
         */
        public reverse():EaseQuarticActionOut;
    }

    //cc._easeQuarticActionOut = {
    //    easing: cc.EaseQuarticActionOut.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeQuarticActionOut;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeOutQuart: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.QuarticActionOut());
     */
    export function easeQuarticActionOut():EaseQuarticActionOut;

    /**
     * cc.EaseQuarticActionInOut action. <br />
     * Reference easeInOutQuart: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeQuarticActionInOut());
     *
     * @example
     * //The old usage
     * cc.EaseQuarticActionInOut.create(action);
     * //The new usage
     * action.easing(cc.easeQuarticActionInOut());
     */
    export class EaseQuarticActionInOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseQuarticActionInOut}
         */
        public clone():EaseQuarticActionInOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseQuarticActionInOut}
         */
        public reverse():EaseQuarticActionInOut;
    }

    //cc._easeQuarticActionInOut = {
    //    easing: cc.EaseQuarticActionInOut.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeQuarticActionInOut;
    //    }
    //};

    /**
     * Creates the action easing object.  <br />
     * Reference easeInOutQuart: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     */
    export function easeQuarticActionInOut():EaseQuarticActionInOut;

    /**
     * cc.EaseQuinticActionIn action. <br />
     * Reference easeInQuint: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeQuinticActionIn());
     *
     * @example
     * //The old usage
     * cc.EaseQuinticActionIn.create(action);
     * //The new usage
     * action.easing(cc.easeQuinticActionIn());
     */
    export class EaseQuinticActionIn extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseQuinticActionIn}
         */
        public clone():EaseQuinticActionIn;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseQuinticActionIn}
         */
        public reverse():EaseQuinticActionIn;
    }

    //cc._easeQuinticActionIn = {
    //    easing: cc.EaseQuinticActionIn.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeQuinticActionIn;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeInQuint: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeQuinticActionIn());
     */
    export function easeQuinticActionIn():EaseQuinticActionIn;

    /**
     * cc.EaseQuinticActionOut action. <br />
     * Reference easeQuint: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeQuadraticActionOut());
     *
     * @example
     * //The old usage
     * cc.EaseQuinticActionOut.create(action);
     * //The new usage
     * action.easing(cc.easeQuadraticActionOut());
     */
    export class EaseQuinticActionOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseQuinticActionOut}
         */
        public clone():EaseQuinticActionOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseQuinticActionOut}
         */
        public reverse():EaseQuinticActionOut;
    }

    //cc._easeQuinticActionOut = {
    //    easing: cc.EaseQuinticActionOut.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeQuinticActionOut;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeOutQuint: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeQuadraticActionOut());
     */
    export function easeQuinticActionOut():EaseQuinticActionOut;

    /**
     * cc.EaseQuinticActionInOut action. <br />
     * Reference easeInOutQuint: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeQuinticActionInOut());
     *
     * @example
     * //The old usage
     * cc.EaseQuinticActionInOut.create(action);
     * //The new usage
     * action.easing(cc.easeQuinticActionInOut());
     */
    export class EaseQuinticActionInOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseQuinticActionInOut}
         */
        public clone():EaseQuinticActionInOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseQuinticActionInOut}
         */
        public reverse():EaseQuinticActionInOut;
    }

    //cc._easeQuinticActionInOut = {
    //    easing: cc.EaseQuinticActionInOut.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeQuinticActionInOut;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeInOutQuint: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeQuinticActionInOut());
     */
    export function easeQuinticActionInOut():EaseQuinticActionInOut;

    /**
     * cc.EaseCircleActionIn action. <br />
     * Reference easeInCirc: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeCircleActionIn());
     *
     * @example
     * //The old usage
     * cc.EaseCircleActionIn.create(action);
     * //The new usage
     * action.easing(cc.easeCircleActionIn());
     */
    export class EaseCircleActionIn extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseCircleActionIn}
         */
        public clone():EaseCircleActionIn;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseCircleActionIn}
         */
        public reverse():EaseCircleActionIn;
    }

    //cc._easeCircleActionIn = {
    //    easing: cc.EaseCircleActionIn.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeCircleActionIn;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeInCirc: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeCircleActionIn());
     */
    export function easeCircleActionIn():EaseCircleActionIn;

    /**
     * cc.EaseCircleActionOut action. <br />
     * Reference easeOutCirc: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeCircleActionOut());
     *
     * @example
     * //The old usage
     * cc.EaseCircleActionOut.create(action);
     * //The new usage
     * action.easing(cc.easeCircleActionOut());
     */
    export class EaseCircleActionOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseCircleActionOut}
         */
        public clone():EaseCircleActionOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseCircleActionOut}
         */
        public reverse():EaseCircleActionOut;
    }

    //cc._easeCircleActionOut = {
    //    easing: cc.EaseCircleActionOut.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeCircleActionOut;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeOutCirc: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @exampple
     * //example
     * actioneasing(cc.easeCircleActionOut());
     */
    export function easeCircleActionOut():EaseCircleActionOut;

    /**
     * cc.EaseCircleActionInOut action. <br />
     * Reference easeInOutCirc: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeCircleActionInOut());
     *
     * @example
     * //The old usage
     * cc.EaseCircleActionInOut.create(action);
     * //The new usage
     * action.easing(cc.easeCircleActionInOut());
     */
    export class EaseCircleActionInOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseCircleActionInOut}
         */
        public clone():EaseCircleActionInOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseCircleActionInOut}
         */
        public reverse():EaseCircleActionInOut;
    }

    //cc._easeCircleActionInOut = {
    //    easing: cc.EaseCircleActionInOut.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeCircleActionInOut;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeInOutCirc: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeCircleActionInOut());
     */
    export function easeCircleActionInOut():EaseCircleActionInOut;

    /**
     * cc.EaseCubicActionIn action. <br />
     * Reference easeInCubic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> action.easing(cc.easeCubicActionIn());
     *
     * @example
     * //The old usage
     * cc.EaseCubicActionIn.create(action);
     * //The new usage
     * action.easing(cc.easeCubicActionIn());
     */
    export class EaseCubicActionIn extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseCubicActionIn}
         */
        public clone():EaseCubicActionIn;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseCubicActionIn}
         */
        public reverse():EaseCubicActionIn;
    }

    //cc._easeCubicActionIn = {
    //    easing: cc.EaseCubicActionIn.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeCubicActionIn;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeInCubic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeCubicActionIn());
     */
    export function easeCubicActionIn():EaseCubicActionIn;

    /**
     * cc.EaseCubicActionOut action. <br />
     * Reference easeOutCubic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeCubicActionOut());
     *
     * @example
     * //The old usage
     * cc.EaseCubicActionOut.create(action);
     * //The new usage
     * action.easing(cc.easeCubicActionOut());
     */
    export class EaseCubicActionOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseCubicActionOut}
         */
        public clone():EaseCubicActionOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseCubicActionOut}
         */
        public reverse():EaseCubicActionOut;
    }

    //cc._easeCubicActionOut = {
    //    easing: cc.EaseCubicActionOut.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeCubicActionOut;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeOutCubic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     * @example
     * //example
     * action.easing(cc.easeCubicActionOut());
     */
    export function easeCubicActionOut():EaseCubicActionOut;

    /**
     * cc.EaseCubicActionInOut action. <br />
     * Reference easeInOutCubic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @class
     * @extends cc.ActionEase
     *
     * @deprecated since v3.0 <br /> Please use action.easing(cc.easeCubicActionInOut());
     *
     * @example
     * //The old usage
     * cc.EaseCubicActionInOut.create(action);
     * //The new usage
     * action.easing(cc.easeCubicActionInOut());
     */
    export class EaseCubicActionInOut extends ActionEase {
        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @returns {cc.EaseCubicActionInOut}
         */
        public clone():EaseCubicActionInOut;

        /**
         * Create a action. Opposite with the original motion trajectory.
         * @return {cc.EaseCubicActionInOut}
         */
        public reverse():EaseCubicActionInOut;
    }

    //cc._easeCubicActionInOut = {
    //    easing: cc.EaseCubicActionInOut.prototype._updateTime,
    //    reverse: function(){
    //        return cc._easeCubicActionInOut;
    //    }
    //};

    /**
     * Creates the action easing object. <br />
     * Reference easeInOutCubic: <br />
     * {@link http://www.zhihu.com/question/21981571/answer/19925418}
     * @function
     * @returns {Object}
     */
    export function easeCubicActionInOut():EaseCubicActionInOut;

    // +--------------------------------------------------------------------------------
    // + File: cocos2d/core/base-nodes/CCActionInstant.js
    // +--------------------------------------------------------------------------------
    /**
     * Instant actions are immediate actions. They don't have a duration like.
     * the CCIntervalAction actions.
     * @class
     * @extends cc.FiniteTimeAction
     */
    export class ActionInstant extends FiniteTimeAction {
        /**
         * returns a reversed action. <br />
         * For example: <br />
         * - The action will be x coordinates of 0 move to 100. <br />
         * - The reversed action will be x of 100 move to 0.
         * - Will be rewritten
         * @returns {cc.Action}
         */
        public reverse():ActionInstant;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.FiniteTimeAction}
         */
        public clone():ActionInstant;
    }

    /**
     * Show the node.
     * @class
     * @extends cc.ActionInstant
     */
    export class Show extends ActionInstant {
        /**
         * returns a reversed action. <br />
         * For example: <br />
         * - The action will be x coordinates of 0 move to 100. <br />
         * - The reversed action will be x of 100 move to 0.
         * - Will be rewritten
         * @returns {cc.Hide}
         */
        public reverse():Hide;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.FiniteTimeAction}
         */
        public clone():Show;
    }

    /**
     * Show the Node.
     * @function
     * @return {cc.Show}
     * @example
     * // example
     * var showAction = cc.show();
     */
    export function show():Show;

    /**
     * Hide the node.
     * @class
     * @extends cc.ActionInstant
     */
    export class Hide extends ActionInstant {
        /**
         * returns a reversed action. <br />
         * For example: <br />
         * - The action will be x coordinates of 0 move to 100. <br />
         * - The reversed action will be x of 100 move to 0.
         * - Will be rewritten
         * @returns {cc.Show}
         */
        public reverse():Show;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.Hide}
         */
        public clone():Hide;
    }

    /**
     * Hide the node.
     * @function
     * @return {cc.Hide}
     * @example
     * // example
     * var hideAction = cc.hide();
     */
    export function hide():Hide;

    /**
     * Toggles the visibility of a node.
     * @class
     * @extends cc.ActionInstant
     */
    export class ToggleVisibility extends ActionInstant {
        /**
         * returns a reversed action.
         * @returns {cc.ToggleVisibility}
         */
        public reverse():ToggleVisibility;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.ToggleVisibility}
         */
        public clone():ToggleVisibility;
    }

    /**
     * Toggles the visibility of a node.
     * @function
     * @return {cc.ToggleVisibility}
     * @example
     * // example
     * var toggleVisibilityAction = cc.toggleVisibility();
     */
    export function toggleVisibility():ToggleVisibility;

    /**
     * Delete self in the next frame.
     * @class
     * @extends cc.ActionInstant
     * @param {Boolean} [isNeedCleanUp=true]
     *
     * @example
     * // example
     * var removeSelfAction = new cc.RemoveSelf(false);
     */
    export class RemoveSelf extends ActionInstant {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Create a RemoveSelf object with a flag indicate whether the target should be cleaned up while removing.
         * @param {Boolean} [isNeedCleanUp=true]
         */
        public ctor(isNeedCleanUp?:boolean):void;

        /**
         * Initialization of the node, please do not call this function by yourself, you should pass the parameters to constructor to initialize it .
         * @param isNeedCleanUp
         * @returns {boolean}
         */
        init(isNeedCleanUp?:boolean):boolean;

        /**
         * returns a reversed action.
         */
        public reverse():RemoveSelf;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.RemoveSelf}
         */
        public clone():RemoveSelf;
    }

    /**
     * Create a RemoveSelf object with a flag indicate whether the target should be cleaned up while removing.
     *
     * @function
     * @param {Boolean} [isNeedCleanUp=true]
     * @return {cc.RemoveSelf}
     *
     * @example
     * // example
     * var removeSelfAction = cc.removeSelf();
     */
    export function removeSelf(isNeedCleanUp?:boolean):RemoveSelf;

    /**
     * Flips the sprite horizontally.
     * @class
     * @extends cc.ActionInstant
     * @param {Boolean} flip Indicate whether the target should be flipped or not
     *
     * @example
     * var flipXAction = new cc.FlipX(true);
     */
    export class FlipX extends ActionInstant {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Create a FlipX action to flip or unflip the target.
         * @param {Boolean} flip Indicate whether the target should be flipped or not
         */
        public ctor(flip:boolean):void;
        public ctor():void;

        /**
         * initializes the action with a set flipX.
         * @param {Boolean} flip
         * @return {Boolean}
         */
        initWithFlipX(flip:boolean):void;

        /**
         * returns a reversed action.
         * @return {cc.FlipX}
         */
        public reverse():FlipX;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.FiniteTimeAction}
         */
        public clone():FlipX;
    }

    /**
     * Create a FlipX action to flip or unflip the target.
     *
     * @function
     * @param {Boolean} flip Indicate whether the target should be flipped or not
     * @return {cc.FlipX}
     * @example
     * var flipXAction = cc.flipX(true);
     */
    export function flipX(flip:boolean):FlipX;

    /**
     * Flips the sprite vertically
     * @class
     * @extends cc.ActionInstant
     * @param {Boolean} flip
     * @example
     * var flipYAction = new cc.FlipY(true);
     */

    export class FlipY extends ActionInstant {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Create a FlipY action to flip or unflip the target.
         *
         * @param {Boolean} flip
         */
        public ctor(flip:boolean):void;
        public ctor():void;

        /**
         * initializes the action with a set flipY.
         * @param {Boolean} flip
         * @return {Boolean}
         */
        public initWithFlipY(flip:boolean):boolean;

        /**
         * returns a reversed action.
         * @return {cc.FlipY}
         */
        public reverse():FlipY;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.FlipY}
         */
        public clone():FlipY;
    }

    /**
     * Create a FlipY action to flip or unflip the target.
     *
     * @function
     * @param {Boolean} flip
     * @return {cc.FlipY}
     * @example
     * var flipYAction = cc.flipY(true);
     */
    export function flipY(flip:boolean):FlipY;

    /**
     * Places the node in a certain position
     * @class
     * @extends cc.ActionInstant
     * @param {cc.Point|Number} pos
     * @param {Number} [y]
     * @example
     * var placeAction = new cc.Place(cc.p(200, 200));
     * var placeAction = new cc.Place(200, 200);
     */
    export class Place extends ActionInstant {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Creates a Place action with a position.
         * @param {cc.Point|Number} pos
         * @param {Number} [y]
         */
        public ctor(pos:cc.Point|number, y?:number):void;
        public ctor():void;

        /**
         * Initializes a Place action with a position
         * @param {number} pos
         * @param {number} [y]
         * @return {Boolean}
         */
        public initWithPosition(pos:cc.Point|number, y?:number):boolean;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.Place}
         */
        public clone():Place;
    }

    /**
     * Creates a Place action with a position.
     * @function
     * @param {cc.Point|Number} pos
     * @param {Number} [y]
     * @return {cc.Place}
     * @example
     * // example
     * var placeAction = cc.place(cc.p(200, 200));
     * var placeAction = cc.place(200, 200);
     */
    export function place(pos:cc.Point|number, y?:number):Place;

    /**
     * Calls a 'callback'.
     * @class
     * @extends cc.ActionInstant
     * @param {function} selector
     * @param {object|null} [selectorTarget]
     * @param {*|null} [data] data for function, it accepts all data types.
     * @example
     * // example
     * // CallFunc without data
     * var finish = new cc.CallFunc(this.removeSprite, this);
     *
     * // CallFunc with data
     * var finish = new cc.CallFunc(this.removeFromParentAndCleanup, this,  true);
     */
    export class CallFunc extends ActionInstant {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Creates a CallFunc action with the callback.
         * @param {function} selector
         * @param {object|null} [selectorTarget]
         * @param {*|null} [data] data for function, it accepts all data types.
         */
        public ctor(selector:CallFuncCallback, selectorTarget?:any, data?:any):void;
        public ctor():void;

        /**
         * Initializes the action with a function or function and its target
         * @param {function} selector
         * @param {object|Null} selectorTarget
         * @param {*|Null} [data] data for function, it accepts all data types.
         * @return {Boolean}
         */
        public initWithFunction(selector:CallFuncCallback, selectorTarget?:any, data?:any):boolean;

        /**
         * execute the function.
         */
        public execute():void;

        /**
         * Get selectorTarget.
         * @return {object}
         */
        public getTargetCallback():CallFuncCallback;

        /**
         * Set selectorTarget.
         * @param {object} sel
         */
        public setTargetCallback(sel:CallFuncCallback):void;

        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.CallFunc}
         */
        public clone():CallFunc;
    }

    /**
     * Creates the action with the callback
     * @function
     * @param {function} selector
     * @param {object|null} [selectorTarget]
     * @param {*|null} [data] data for function, it accepts all data types.
     * @return {cc.CallFunc}
     * @example
     * // example
     * // CallFunc without data
     * var finish = cc.callFunc(this.removeSprite, this);
     *
     * // CallFunc with data
     * var finish = cc.callFunc(this.removeFromParentAndCleanup, this._grossini,  true);
     */
    export function callFunc(selector:CallFuncCallback, selectorTarget?:any, data?:any):CallFunc;
}