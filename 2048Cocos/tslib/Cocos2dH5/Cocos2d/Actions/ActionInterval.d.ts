declare namespace cc {
    /**
     * <p> An interval action is an action that takes place within a certain period of time. <br/>
     * It has an start time, and a finish time. The finish time is the parameter<br/>
     * duration plus the start time.</p>
     *
     * <p>These CCActionInterval actions have some interesting properties, like:<br/>
     * - They can run normally (default)  <br/>
     * - They can run reversed with the reverse method   <br/>
     * - They can run with the time altered with the Accelerate, AccelDeccel and Speed actions. </p>
     *
     * <p>For example, you can simulate a Ping Pong effect running the action normally and<br/>
     * then running it again in Reverse mode. </p>
     *
     * @class
     * @extends cc.FiniteTimeAction
     * @param {Number} d duration in seconds
     * @example
     * var actionInterval = new cc.ActionInterval(3);
     */
    export class ActionInterval extends FiniteTimeAction {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} d duration in seconds
         */
        public ctor(d: number): void;
        public ctor(): void;

        /**
         * How many seconds had elapsed since the actions started to run.
         * @return {Number}
         */
        public getElapsed(): number;

        /**
         * Initializes the action.
         * @param {Number} d duration in seconds
         * @return {Boolean}
         */
        public initWithDuration(d: number): boolean;

        /**
         * Returns a new clone of the action.
         * @returns {cc.ActionInterval}
         */
        public clone(): ActionInterval;

        /**
         * Implementation of ease motion.
         *
         * @example
         * //example
         * action.easeing(cc.easeIn(3.0));
         * @param {Object} easeObj
         * @returns {cc.ActionInterval}
         */
        // TODO: Shouldn't this parameter type be ActionEase instead of any?
        public easing(easeObj: any): ActionInterval;

        /**
         * returns a reversed action. <br />
         * Will be overwrite.
         *
         * @return {null}
         */
        public reverse(): ActionInterval;

        /**
         * Set amplitude rate.
         * @warning It should be overridden in subclass.
         * @param {Number} amp
         */
        public setAmplitudeRate(amp: number): void;

        /**
         * Get amplitude rate.
         * @warning It should be overridden in subclass.
         * @return {Number} 0
         */
        public getAmplitudeRate(): number;

        /**
         * Changes the speed of an action, making it take longer (speed>1)
         * or less (speed<1) time. <br/>
         * Useful to simulate 'slow motion' or 'fast forward' effect.
         *
         * @param speed
         * @returns {cc.Action}
         */
        public speed(speed: number): ActionInterval;

        /**
         * Get this action speed.
         * @return {Number}
         */
        public getSpeed(): number;

        /**
         * Set this action speed.
         * @param {Number} speed
         * @returns {cc.ActionInterval}
         */
        public setSpeed(speed: number): ActionInterval;

        /**
         * Repeats an action a number of times.
         * To repeat an action forever use the CCRepeatForever action.
         * @param times
         * @returns {cc.ActionInterval}
         */
        public repeat(times: number): ActionInterval;

        /**
         * Repeats an action for ever.  <br/>
         * To repeat the an action for a limited number of times use the Repeat action. <br/>
         * @returns {cc.ActionInterval}
         */
        public repeatForever(): ActionInterval;
    }

    /**
     * An interval action is an action that takes place within a certain period of time.
     * @function
     * @param {Number} d duration in seconds
     * @return {cc.ActionInterval}
     * @example
     * // example
     * var actionInterval = cc.actionInterval(3);
     */
    export function actionInterval(d: number): ActionInterval;

    /**
     * Runs actions sequentially, one after another.
     * @class
     * @extends cc.ActionInterval
     * @param {Array|cc.FiniteTimeAction} tempArray
     * @example
     * // create sequence with actions
     * var seq = new cc.Sequence(act1, act2);
     *
     * // create sequence with array
     * var seq = new cc.Sequence(actArray);
     */
    export class Sequence extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Create an array of sequenceable actions.
         * @param {Array|cc.FiniteTimeAction} tempArray
         */
        public constructor(tempArray: FiniteTimeAction[]);
        public constructor();

        /**
         * Initializes the action <br/>
         * @param {cc.FiniteTimeAction} actionOne
         * @param {cc.FiniteTimeAction} actionTwo
         * @return {Boolean}
         */
        public initWithTwoActions(actionOne: FiniteTimeAction, actionTwo: FiniteTimeAction): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.Sequence}
         */
        public clone(): Sequence;

        /**
         * Returns a reversed action.
         * @return {cc.Sequence}
         */
        public reverse(): Sequence;
    }

    // export function sequence(tempArray:FiniteTimeAction[]):Sequence;
    export function sequence(tempArray: FiniteTimeAction[]): Sequence;
    export function sequence(...tempArray: FiniteTimeAction[]): Sequence;

    /**
     * Repeats an action a number of times.
     * To repeat an action forever use the CCRepeatForever action.
     * @class
     * @extends cc.ActionInterval
     * @param {cc.FiniteTimeAction} action
     * @param {Number} times
     * @example
     * var rep = new cc.Repeat(cc.sequence(jump2, jump1), 5);
     */
    export class Repeat extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Creates a Repeat action. Times is an unsigned integer between 1 and pow(2,30).
         * @param {cc.FiniteTimeAction} action
         * @param {Number} times
         */
        public ctor(action: FiniteTimeAction, times: number): void;
        public ctor(): void;

        /**
         * @param {cc.FiniteTimeAction} action
         * @param {Number} times
         * @return {Boolean}
         */
        public initWithAction(action: FiniteTimeAction, times: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.Repeat}
         */
        public clone(): Repeat;

        /**
         * returns a reversed action.
         * @return {cc.Repeat}
         */
        public reverse(): Repeat;

        /**
         * Set inner Action.
         * @param {cc.FiniteTimeAction} action
         */
        public setInnerAction(action: FiniteTimeAction): void;

        /**
         * Get inner Action.
         * @return {cc.FiniteTimeAction}
         */
        public getInnerAction(): FiniteTimeAction;
    }

    /**
     * Creates a Repeat action. Times is an unsigned integer between 1 and pow(2,30)
     * @function
     * @param {cc.FiniteTimeAction} action
     * @param {Number} times
     * @return {cc.Repeat}
     * @example
     * // example
     * var rep = cc.repeat(cc.sequence(jump2, jump1), 5);
     */
    export function repeat(action: FiniteTimeAction, times: number): Repeat;

    /**  Repeats an action for ever.  <br/>
     * To repeat the an action for a limited number of times use the Repeat action. <br/>
     * @warning This action can't be Sequenceable because it is not an IntervalAction
     * @class
     * @extends cc.ActionInterval
     * @param {cc.FiniteTimeAction} action
     * @example
     * var rep = new cc.RepeatForever(cc.sequence(jump2, jump1), 5);
     */
    export class RepeatForever extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Create a acton which repeat forever.
         * @param {cc.FiniteTimeAction} action
         */
        public constructor(action?: FiniteTimeAction);

        /**
         * @param {cc.ActionInterval} action
         * @return {Boolean}
         */
        public initWithAction(action: FiniteTimeAction): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.RepeatForever}
         */
        public clone(): RepeatForever;

        /**
         * Returns a reversed action.
         * @return {cc.RepeatForever}
         */
        public reverse(): RepeatForever;

        /**
         * Set inner action.
         * @param {cc.ActionInterval} action
         */
        public setInnerAction(action: ActionInterval): void;

        /**
         * Get inner action.
         * @return {cc.ActionInterval}
         */
        public getInnerAction(): ActionInterval;
    }

    /**
     * Create a acton which repeat forever
     * @function
     * @param {cc.FiniteTimeAction} action
     * @return {cc.RepeatForever}
     * @example
     * // example
     * var repeat = cc.repeatForever(cc.rotateBy(1.0, 360));
     */
    export function repeatForever(action: FiniteTimeAction): RepeatForever;

    /** Spawn a new action immediately
     * @class
     * @extends cc.ActionInterval
     */
    export class Spawn extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Array|cc.FiniteTimeAction} tempArray
         */
        public constructor(tempArray: FiniteTimeAction[]);
        public constructor();

        /** initializes the Spawn action with the 2 actions to spawn
         * @param {cc.FiniteTimeAction} action1
         * @param {cc.FiniteTimeAction} action2
         * @return {Boolean}
         */
        public initWithTwoActions(action1: FiniteTimeAction, action2: FiniteTimeAction): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.Spawn}
         */
        public clone(): Spawn;

        /**
         * Returns a reversed action.
         * @return {cc.Spawn}
         */
        public reverse(): Spawn;
    }

    /**
     * Create a spawn action which runs several actions in parallel.
     * @function
     * @param {Array|cc.FiniteTimeAction}tempArray
     * @return {cc.FiniteTimeAction}
     * @example
     * // example
     * var action = cc.spawn(cc.jumpBy(2, cc.p(300, 0), 50, 4), cc.rotateBy(2, 720));
     * todo:It should be the direct use new
     */
    export function spawn(tempArray: FiniteTimeAction[]): FiniteTimeAction;

    /**
     * Rotates a cc.Node object to a certain angle by modifying it's.
     * rotation attribute. <br/>
     * The direction will be decided by the shortest angle.
     * @class
     * @extends cc.ActionInterval
     * @param {Number} duration duration in seconds
     * @param {Number} deltaAngleX deltaAngleX in degrees.
     * @param {Number} [deltaAngleY] deltaAngleY in degrees.
     * @example
     * var rotateTo = new cc.RotateTo(2, 61.0);
     */
    export class RotateTo extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Creates a RotateTo action with x and y rotation angles.
         * @param {Number} duration duration in seconds
         * @param {Number} deltaAngleX deltaAngleX in degrees.
         * @param {Number} [deltaAngleY] deltaAngleY in degrees.
         */
        public ctor(duration: number, deltaAngleX: number, deltaAngleY: number): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} duration
         * @param {Number} deltaAngleX
         * @param {Number} deltaAngleY
         * @return {Boolean}
         */
        public initWithDuration(duration: number, deltaAngleX: number, deltaAngleY: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.RotateTo}
         */
        public clone(): RotateTo;

        /**
         * RotateTo reverse not implemented.
         * Will be overridden.
         */
        public reverse(): RotateTo;
    }

    /**
     * Creates a RotateTo action with separate rotation angles.
     * To specify the angle of rotation.
     * @function
     * @param {Number} duration duration in seconds
     * @param {Number} deltaAngleX deltaAngleX in degrees.
     * @param {Number} [deltaAngleY] deltaAngleY in degrees.
     * @return {cc.RotateTo}
     * @example
     * // example
     * var rotateTo = cc.rotateTo(2, 61.0);
     */
    export function rotateTo(duration: number, deltaAngleX: number, deltaAngleY?: number): RotateTo;

    /**
     * Rotates a cc.Node object clockwise a number of degrees by modifying it's rotation attribute.
     * Relative to its properties to modify.
     * @class
     * @extends  cc.ActionInterval
     * @param {Number} duration duration in seconds
     * @param {Number} deltaAngleX deltaAngleX in degrees
     * @param {Number} [deltaAngleY] deltaAngleY in degrees
     * @example
     * var actionBy = new cc.RotateBy(2, 360);
     */
    export class RotateBy extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration duration in seconds
         * @param {Number} deltaAngleX deltaAngleX in degrees
         * @param {Number} [deltaAngleY] deltaAngleY in degrees
         */
        public ctor(duration: number, deltaAngleX: number, deltaAngleY: number): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} duration duration in seconds
         * @param {Number} deltaAngleX deltaAngleX in degrees
         * @param {Number} [deltaAngleY=] deltaAngleY in degrees
         * @return {Boolean}
         */
        public initWithDuration(duration: number, deltaAngleX: number, deltaAngleY: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.RotateBy}
         */
        public clone(): RotateBy;

        /**
         * Returns a reversed action.
         * @return {cc.RotateBy}
         */
        public reverse(): RotateBy;
    }

    /**
     * Rotates a cc.Node object clockwise a number of degrees by modifying it's rotation attribute.
     * Relative to its properties to modify.
     * @function
     * @param {Number} duration duration in seconds
     * @param {Number} deltaAngleX deltaAngleX in degrees
     * @param {Number} [deltaAngleY] deltaAngleY in degrees
     * @return {cc.RotateBy}
     * @example
     * // example
     * var actionBy = cc.rotateBy(2, 360);
     */
    export function rotateBy(duration: number, deltaAngleX: number, deltaAngleY?: number): RotateBy;

    /**
     * <p>
     *     Moves a CCNode object x,y pixels by modifying it's position attribute.                                  <br/>
     *     x and y are relative to the position of the object.                                                     <br/>
     *     Several CCMoveBy actions can be concurrently called, and the resulting                                  <br/>
     *     movement will be the sum of individual movements.
     * </p>
     * @class
     * @extends cc.ActionInterval
     * @param {Number} duration duration in seconds
     * @param {cc.Point|Number} deltaPos
     * @param {Number} [deltaY]
     * @example
     * var actionTo = cc.moveBy(2, cc.p(windowSize.width - 40, windowSize.height - 40));
     */
    export class MoveBy extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration duration in seconds
         * @param {cc.Point|Number} deltaPos
         * @param {Number} [deltaY]
         */
        public constructor(duration: number, deltaPos: number | cc.Point, deltaY?: number);
        public constructor();

        /**
         * Initializes the action.
         * @param {Number} duration duration in seconds
         * @param {cc.Point} position
         * @param {Number} [y]
         * @return {Boolean}
         */
        public initWithDuration(duration: number, position: number | cc.Point, y?: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.MoveBy}
         */
        public clone(): MoveBy;

        /**
         * MoveTo reverse is not implemented
         * @return {cc.MoveBy}
         */
        public reverse(): MoveBy;
    }

    /**
     * Create the action.
     * Relative to its coordinate moves a certain distance.
     * @function
     * @param {Number} duration duration in seconds
     * @param {cc.Point|Number} deltaPos
     * @param {Number} deltaY
     * @return {cc.MoveBy}
     * @example
     * // example
     * var actionTo = cc.moveBy(2, cc.p(windowSize.width - 40, windowSize.height - 40));
     */
    export function moveBy(duration: number, deltaPos: number | cc.Point, deltaY?: number): MoveBy;

    /**
     * Moves a CCNode object to the position x,y. x and y are absolute coordinates by modifying it's position attribute. <br/>
     * Several CCMoveTo actions can be concurrently called, and the resulting                                            <br/>
     * movement will be the sum of individual movements.
     * @class
     * @extends cc.MoveBy
     * @param {Number} duration duration in seconds
     * @param {cc.Point|Number} position
     * @param {Number} y
     * @example
     * var actionBy = new cc.MoveTo(2, cc.p(80, 80));
     */
    export class MoveTo extends MoveBy {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration duration in seconds
         * @param {cc.Point|Number} position
         * @param {Number} y
         */
        public constructor(duration: number, position: number | cc.Point, y?: number);
        public constructor();

        /**
         * Initializes the action.
         * @param {Number} duration  duration in seconds
         * @param {cc.Point} position
         * @param {Number} y
         * @return {Boolean}
         */
        public initWithDuration(duration: number, position: number | cc.Point, y: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.MoveTo}
         */
        public clone(): MoveTo;
    }

    /**
     * Create new action.
     * Moving to the specified coordinates.
     * @function
     * @param {Number} duration duration in seconds
     * @param {cc.Point} position
     * @param {Number} y
     * @return {cc.MoveBy}
     * @example
     * // example
     * var actionBy = cc.moveTo(2, cc.p(80, 80));
     */
    export function moveTo(duration: number, position: number | cc.Point, y?: number): MoveTo;

    /**
     * Skews a cc.Node object to given angles by modifying it's skewX and skewY attributes
     * @class
     * @extends cc.ActionInterval
     * @param {Number} t time in seconds
     * @param {Number} sx
     * @param {Number} sy
     * @example
     * var actionTo = new cc.SkewTo(2, 37.2, -37.2);
     */
    export class SkewTo extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} t time in seconds
         * @param {Number} sx
         * @param {Number} sy
         */
        public ctor(t: number, sx: number, sy: number): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} t time in seconds
         * @param {Number} sx
         * @param {Number} sy
         * @return {Boolean}
         */
        public initWithDuration(t: number, sx: number, sy: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.SkewTo}
         */
        public clone(): SkewTo;

    }

    /**
     * Create new action.
     * Skews a cc.Node object to given angles by modifying it's skewX and skewY attributes.
     * Changes to the specified value.
     * @function
     * @param {Number} t time in seconds
     * @param {Number} sx
     * @param {Number} sy
     * @return {cc.SkewTo}
     * @example
     * // example
     * var actionTo = cc.skewTo(2, 37.2, -37.2);
     */
    export function skewTo(t: number, sx: number, sy: number): SkewTo;

    /**
     * Skews a cc.Node object by skewX and skewY degrees.
     * Relative to its attribute modification.
     * @class
     * @extends cc.SkewTo
     * @param {Number} t time in seconds
     * @param {Number} sx  skew in degrees for X axis
     * @param {Number} sy  skew in degrees for Y axis
     */
    export class SkewBy extends SkewTo {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} t time in seconds
         * @param {Number} sx  skew in degrees for X axis
         * @param {Number} sy  skew in degrees for Y axis
         */
        public ctor(t: number, sx: number, sy: number): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} t time in seconds
         * @param {Number} sx  skew in degrees for X axis
         * @param {Number} sy  skew in degrees for Y axis
         * @return {Boolean}
         */
        public initWithDuration(t: number, sx: number, sy: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.SkewBy}
         */
        public clone(): SkewBy;

        /**
         * Returns a reversed action.
         * @return {cc.SkewBy}
         */
        public reverse(): SkewBy;
    }

    /**
     * Skews a cc.Node object by skewX and skewY degrees. <br />
     * Relative to its attribute modification.
     * @function
     * @param {Number} t time in seconds
     * @param {Number} sx sx skew in degrees for X axis
     * @param {Number} sy sy skew in degrees for Y axis
     * @return {cc.SkewBy}
     * @example
     * // example
     * var actionBy = cc.skewBy(2, 0, -90);
     */
    export function skewBy(t: number, sx: number, sy: number): SkewBy;

    /**
     * Moves a cc.Node object simulating a parabolic jump movement by modifying it's position attribute.
     * Relative to its movement.
     * @class
     * @extends cc.ActionInterval
     * @param {Number} duration
     * @param {cc.Point|Number} position
     * @param {Number} [y]
     * @param {Number} height
     * @param {Number} jumps
     * @example
     * var actionBy = new cc.JumpBy(2, cc.p(300, 0), 50, 4);
     * var actionBy = new cc.JumpBy(2, 300, 0, 50, 4);
     */
    export class JumpBy extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration
         * @param {cc.Point|Number} position
         * @param {Number} [y]
         * @param {Number} height
         * @param {Number} jumps
         */
        public ctor(duration: number, position: number | cc.Point, y?: number, height?: number, jumps?: number): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} duration
         * @param {cc.Point|Number} position
         * @param {Number} [y]
         * @param {Number} height
         * @param {Number} jumps
         * @return {Boolean}
         * @example
         * actionBy.initWithDuration(2, cc.p(300, 0), 50, 4);
         * actionBy.initWithDuration(2, 300, 0, 50, 4);
         */
        public initWithDuration(duration: number,
            position: number | cc.Point,
            y?: number,
            height?: number,
            jumps?: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.JumpBy}
         */
        public clone(): JumpBy;


        /**
         * Returns a reversed action.
         * @return {cc.JumpBy}
         */
        public reverse(): JumpBy;
    }

    /**
     * Moves a cc.Node object simulating a parabolic jump movement by modifying it's position attribute.
     * Relative to its movement.
     * @function
     * @param {Number} duration
     * @param {cc.Point|Number} position
     * @param {Number} [y]
     * @param {Number} height
     * @param {Number} jumps
     * @return {cc.JumpBy}
     * @example
     * // example
     * var actionBy = cc.jumpBy(2, cc.p(300, 0), 50, 4);
     * var actionBy = cc.jumpBy(2, 300, 0, 50, 4);
     */
    export function jumpBy(duration: number, position: number | cc.Point, y?: number, height?: number, jumps?: number): JumpBy;

    /**
     * Moves a cc.Node object to a parabolic position simulating a jump movement by modifying it's position attribute. <br />
     * Jump to the specified location.
     * @class
     * @extends cc.JumpBy
     * @param {Number} duration
     * @param {cc.Point|Number} position
     * @param {Number} [y]
     * @param {Number} height
     * @param {Number} jumps
     * @example
     * var actionTo = new cc.JumpTo(2, cc.p(300, 0), 50, 4);
     * var actionTo = new cc.JumpTo(2, 300, 0, 50, 4);
     */
    export class JumpTo extends JumpBy {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration
         * @param {cc.Point|Number} position
         * @param {Number} [y]
         * @param {Number} height
         * @param {Number} jumps
         */
        public ctor(duration: number, position: number | cc.Point, y?: number, height?: number, jumps?: number): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} duration
         * @param {cc.Point|Number} position
         * @param {Number} [y]
         * @param {Number} height
         * @param {Number} jumps
         * @return {Boolean}
         * @example
         * actionTo.initWithDuration(2, cc.p(300, 0), 50, 4);
         * actionTo.initWithDuration(2, 300, 0, 50, 4);
         */
        public initWithDuration(duration: number,
            position: number | cc.Point,
            y?: number,
            height?: number,
            jumps?: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.JumpTo}
         */
        public clone(): JumpTo;
    }

    /**
     * Moves a cc.Node object to a parabolic position simulating a jump movement by modifying it's position attribute. <br />
     * Jump to the specified location.
     * @function
     * @param {Number} duration
     * @param {cc.Point|Number} position
     * @param {Number} [y]
     * @param {Number} height
     * @param {Number} jumps
     * @return {cc.JumpTo}
     * @example
     * // example
     * var actionTo = cc.jumpTo(2, cc.p(300, 300), 50, 4);
     * var actionTo = cc.jumpTo(2, 300, 300, 50, 4);
     */
    export function jumpTo(duration: number, position: number | cc.Point, y?: number, height?: number, jumps?: number): JumpTo;

    /**
     * @function
     * @param {Number} a
     * @param {Number} b
     * @param {Number} c
     * @param {Number} d
     * @param {Number} t
     * @return {Number}
     */
    export function bezierAt(a: number, b: number, c: number, d: number, t: number): number;

    /** An action that moves the target with a cubic Bezier curve by a certain distance.
     * Relative to its movement.
     * @class
     * @extends cc.ActionInterval
     * @param {Number} t time in seconds
     * @param {Array} c Array of points
     * @example
     * var bezier = [cc.p(0, windowSize.height / 2), cc.p(300, -windowSize.height / 2), cc.p(300, 100)];
     * var bezierForward = new cc.BezierBy(3, bezier);
     */
    export class BezierBy extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration time in seconds
         * @param {Array} c Array of points
         */
        public ctor(duration: number, c: cc.Point[]): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} duration time in seconds
         * @param {Array} c Array of points
         * @return {Boolean}
         */
        public initWithDuration(duration: number, c: cc.Point[]): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.BezierBy}
         */
        public clone(): BezierBy;

        /**
         * Returns a reversed action.
         * @return {cc.BezierBy}
         */
        public reverse(): BezierBy;
    }

    /**
     * An action that moves the target with a cubic Bezier curve by a certain distance.
     * Relative to its movement.
     * @function
     * @param {Number} duration time in seconds
     * @param {Array} c Array of points
     * @return {cc.BezierBy}
     * @example
     * // example
     * var bezier = [cc.p(0, windowSize.height / 2), cc.p(300, -windowSize.height / 2), cc.p(300, 100)];
     * var bezierForward = cc.bezierBy(3, bezier);
     */
    export function bezierBy(duration: number, c: cc.Point[]): BezierBy;

    /** An action that moves the target with a cubic Bezier curve to a destination point.
     * @class
     * @extends cc.BezierBy
     * @param {Number} t
     * @param {Array} c array of points
     * @example
     * var bezier = [cc.p(0, windowSize.height / 2), cc.p(300, -windowSize.height / 2), cc.p(300, 100)];
     * var bezierTo = new cc.BezierTo(2, bezier);
     */
    export class BezierTo extends BezierBy {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration
         * @param {Array} c array of points
         * var bezierTo = new cc.BezierTo(2, bezier);
         */
        public ctor(duration: number, c: cc.Point[]): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} duration time in seconds
         * @param {Array} c Array of points
         * @return {Boolean}
         */
        public initWithDuration(duration: number, c: cc.Point[]): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.BezierTo}
         */
        public clone(): BezierTo;
    }

    /**
     * An action that moves the target with a cubic Bezier curve to a destination point.
     * @function
     * @param {Number} duration
     * @param {Array} c array of points
     * @return {cc.BezierTo}
     * @example
     * // example
     * var bezier = [cc.p(0, windowSize.height / 2), cc.p(300, -windowSize.height / 2), cc.p(300, 100)];
     * var bezierTo = cc.bezierTo(2, bezier);
     */
    export function bezierTo(duration: number, c: cc.Point[]): BezierTo;

    /** Scales a cc.Node object to a zoom factor by modifying it's scale attribute.
     * @warning This action doesn't support "reverse"
     * @class
     * @extends cc.ActionInterval
     * @param {Number} duration
     * @param {Number} sx  scale parameter in X
     * @param {Number} [sy] scale parameter in Y, if Null equal to sx
     * @example
     * // It scales to 0.5 in both X and Y.
     * var actionTo = new cc.ScaleTo(2, 0.5);
     *
     * // It scales to 0.5 in x and 2 in Y
     * var actionTo = new cc.ScaleTo(2, 0.5, 2);
     */
    export class ScaleTo extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration
         * @param {Number} sx  scale parameter in X
         * @param {Number} [sy] scale parameter in Y, if Null equal to sx
         */
        public constructor(duration: number, sx: number, sy?: number);
        public constructor();

        /**
         * Initializes the action.
         * @param {Number} duration
         * @param {Number} sx
         * @param {Number} [sy=]
         * @return {Boolean}
         */
        public initWithDuration(duration: number, sx: number, sy?: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.ScaleTo}
         */
        public clone(): ScaleTo;
    }

    /**
     * Scales a cc.Node object to a zoom factor by modifying it's scale attribute.
     * @function
     * @param {Number} duration
     * @param {Number} sx  scale parameter in X
     * @param {Number} [sy] scale parameter in Y, if Null equal to sx
     * @return {cc.ScaleTo}
     * @example
     * // example
     * // It scales to 0.5 in both X and Y.
     * var actionTo = cc.scaleTo(2, 0.5);
     *
     * // It scales to 0.5 in x and 2 in Y
     * var actionTo = cc.scaleTo(2, 0.5, 2);
     */
    export function scaleTo(duration: number, sx: number, sy?: number): ScaleTo;

    /** Scales a cc.Node object a zoom factor by modifying it's scale attribute.
     * Relative to its changes.
     * @class
     * @extends cc.ScaleTo
     */
    export class ScaleBy extends ScaleTo {
        public constructor(duration: number, sx: number, sy?: number);
        /**
         * Returns a reversed action.
         * @return {cc.ScaleBy}
         */
        public reverse(): ScaleBy;

        /**
         * returns a new clone of the action
         * @returns {cc.ScaleBy}
         */
        public clone(): ScaleBy;
    }

    /**
     * Scales a cc.Node object a zoom factor by modifying it's scale attribute.
     * Relative to its changes.
     * @function
     * @param {Number} duration duration in seconds
     * @param {Number} sx sx  scale parameter in X
     * @param {Number|Null} [sy=] sy scale parameter in Y, if Null equal to sx
     * @return {cc.ScaleBy}
     * @example
     * // example without sy, it scales by 2 both in X and Y
     * var actionBy = cc.scaleBy(2, 2);
     *
     * //example with sy, it scales by 0.25 in X and 4.5 in Y
     * var actionBy2 = cc.scaleBy(2, 0.25, 4.5);
     */
    export function scaleBy(duration: number, sx: number, sy?: number): ScaleBy;

    /** Blinks a cc.Node object by modifying it's visible attribute
     * @class
     * @extends cc.ActionInterval
     * @param {Number} duration  duration in seconds
     * @param {Number} blinks  blinks in times
     * @example
     * var action = new cc.Blink(2, 10);
     */
    export class Blink extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration  duration in seconds
         * @param {Number} blinks  blinks in times
         */
        public ctor(duration: number, blinks: number): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} duration duration in seconds
         * @param {Number} blinks blinks in times
         * @return {Boolean}
         */
        public initWithDuration(duration: number, blinks: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.Blink}
         */
        public clone(): Blink;

        /**
         * Returns a reversed action.
         * @return {cc.Blink}
         */
        public reverse(): Blink;
    }

    /**
     * Blinks a cc.Node object by modifying it's visible attribute.
     * @function
     * @param {Number} duration  duration in seconds
     * @param blinks blinks in times
     * @return {cc.Blink}
     * @example
     * // example
     * var action = cc.blink(2, 10);
     */
    export function blink(duration: number, blinks: number): Blink;

    /** Fades an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from the current value to a custom one.
     * @warning This action doesn't support "reverse"
     * @class
     * @extends cc.ActionInterval
     * @param {Number} duration
     * @param {Number} opacity 0-255, 0 is transparent
     * @example
     * var action = new cc.FadeTo(1.0, 0);
     */
    export class FadeTo extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration
         * @param {Number} opacity 0-255, 0 is transparent
         */
        public constructor(duration: number, opacity: number);
        public constructor();

        /**
         * Initializes the action.
         * @param {Number} duration  duration in seconds
         * @param {Number} opacity
         * @return {Boolean}
         */
        public initWithDuration(duration: number, opacity: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.FadeTo}
         */
        public clone(): FadeTo;
    }

    /**
     * Fades an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from the current value to a custom one.
     * @function
     * @param {Number} duration
     * @param {Number} opacity 0-255, 0 is transparent
     * @return {cc.FadeTo}
     * @example
     * // example
     * var action = cc.fadeTo(1.0, 0);
     */
    export function fadeTo(duration: number, opacity: number): FadeTo;

    /** Fades In an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 0 to 255.<br/>
     * The "reverse" of this action is FadeOut
     * @class
     * @extends cc.FadeTo
     * @param {Number} duration duration in seconds
     */
    export class FadeIn extends FadeTo {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration duration in seconds
         */
        public ctor(duration: number): void;
        public ctor(): void;

        /**
         * Returns a reversed action.
         * @return {cc.FadeOut}
         */
        public reverse(): FadeOut;

        /**
         * returns a new clone of the action
         * @returns {cc.FadeIn}
         */
        public clone(): FadeIn;
    }

    /**
     * Fades In an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 0 to 255.
     * @function
     * @param {Number} duration duration in seconds
     * @return {cc.FadeIn}
     * @example
     * //example
     * var action = cc.fadeIn(1.0);
     */
    export function fadeIn(duration: number): FadeIn;

    /** Fades Out an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 255 to 0.
     * The "reverse" of this action is FadeIn
     * @class
     * @extends cc.FadeTo
     * @param {Number} duration duration in seconds
     */
    export class FadeOut extends FadeTo {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration duration in seconds
         */
        public ctor(duration: number): void;
        public ctor(): void;

        /**
         * Returns a reversed action.
         * @return {cc.FadeIn}
         */
        public reverse(): FadeIn;

        /**
         * returns a new clone of the action
         * @returns {cc.FadeOut}
         */
        public clone(): FadeOut;
    }

    /**
     * Fades Out an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 255 to 0.
     * @function
     * @param {Number} duration  duration in seconds
     * @return {cc.FadeOut}
     * @example
     * // example
     * var action = cc.fadeOut(1.0);
     */
    export function fadeOut(duration: number): FadeOut;

    /** Tints a cc.Node that implements the cc.NodeRGB protocol from current tint to a custom one.
     * @warning This action doesn't support "reverse"
     * @class
     * @extends cc.ActionInterval
     * @param {Number} duration
     * @param {Number} red 0-255
     * @param {Number} green  0-255
     * @param {Number} blue 0-255
     * @example
     * var action = new cc.TintTo(2, 255, 0, 255);
     */
    export class TintTo extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration
         * @param {Number} red 0-255
         * @param {Number} green  0-255
         * @param {Number} blue 0-255
         */
        public ctor(duration: number, red: number, green: number, blue: number): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} duration
         * @param {Number} red 0-255
         * @param {Number} green 0-255
         * @param {Number} blue 0-255
         * @return {Boolean}
         */
        public initWithDuration(duration: number, red: number, green: number, blue: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.TintTo}
         */
        public clone(): TintTo;
    }

    /**
     * Tints a cc.Node that implements the cc.NodeRGB protocol from current tint to a custom one.
     * @function
     * @param {Number} duration
     * @param {Number} red 0-255
     * @param {Number} green  0-255
     * @param {Number} blue 0-255
     * @return {cc.TintTo}
     * @example
     * // example
     * var action = cc.tintTo(2, 255, 0, 255);
     */
    export function tintTo(duration: number, red: number, green: number, blue: number): TintTo;

    /**  Tints a cc.Node that implements the cc.NodeRGB protocol from current tint to a custom one.
     * Relative to their own color change.
     * @class
     * @extends cc.ActionInterval
     * @param {Number} duration  duration in seconds
     * @param {Number} deltaRed
     * @param {Number} deltaGreen
     * @param {Number} deltaBlue
     * @example
     * var action = new cc.TintBy(2, -127, -255, -127);
     */
    export class TintBy extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {Number} duration  duration in seconds
         * @param {Number} deltaRed
         * @param {Number} deltaGreen
         * @param {Number} deltaBlue
         */
        public ctor(duration: number, deltaRed: number, deltaGreen: number, deltaBlue: number): void;
        public ctor(): void;

        /**
         * Initializes the action.
         * @param {Number} duration
         * @param {Number} deltaRed 0-255
         * @param {Number} deltaGreen 0-255
         * @param {Number} deltaBlue 0-255
         * @return {Boolean}
         */
        public initWithDuration(duration: number, deltaRed: number, deltaGreen: number, deltaBlue: number): boolean;
        public initWithDuration(duration: number): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.TintBy}
         */
        public clone(): TintBy;

        /**
         * Returns a reversed action.
         * @return {cc.TintBy}
         */
        public reverse(): TintBy;
    }

    /**
     * Tints a cc.Node that implements the cc.NodeRGB protocol from current tint to a custom one.
     * Relative to their own color change.
     * @function
     * @param {Number} duration  duration in seconds
     * @param {Number} deltaRed
     * @param {Number} deltaGreen
     * @param {Number} deltaBlue
     * @return {cc.TintBy}
     * @example
     * // example
     * var action = cc.tintBy(2, -127, -255, -127);
     */
    export function tintBy(duration: number, deltaRed: number, deltaGreen: number, deltaBlue: number): TintBy;

    /** Delays the action a certain amount of seconds
     * @class
     * @extends cc.ActionInterval
     */
    export class DelayTime extends ActionInterval {
        /**
         * Returns a reversed action.
         * @return {cc.DelayTime}
         */
        public reverse(): DelayTime;

        /**
         * returns a new clone of the action
         * @returns {cc.DelayTime}
         */
        public clone(): DelayTime;
    }

    /**
     * Delays the action a certain amount of seconds
     * @function
     * @param {Number} d duration in seconds
     * @return {cc.DelayTime}
     * @example
     * // example
     * var delay = cc.delayTime(1);
     */
    export function delayTime(d: number): DelayTime;

    /**
     * <p>
     * Executes an action in reverse order, from time=duration to time=0                                     <br/>
     * @warning Use this action carefully. This action is not sequenceable.                                 <br/>
     * Use it as the default "reversed" method of your own actions, but using it outside the "reversed"      <br/>
     * scope is not recommended.
     * </p>
     * @class
     * @extends cc.ActionInterval
     * @param {cc.FiniteTimeAction} action
     * @example
     *  var reverse = new cc.ReverseTime(this);
     */
    export class ReverseTime extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @param {cc.FiniteTimeAction} action
         */
        public ctor(action: FiniteTimeAction): void;
        public ctor(): void;

        /**
         * @param {cc.FiniteTimeAction} action
         * @return {Boolean}
         */
        public initWithAction(action: FiniteTimeAction): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.ReverseTime}
         */
        public clone(): ReverseTime;

        /**
         * Returns a reversed action.
         * @return {cc.ActionInterval}
         */
        public reverse(): ReverseTime;
    }

    /**
     * Executes an action in reverse order, from time=duration to time=0.
     * @function
     * @param {cc.FiniteTimeAction} action
     * @return {cc.ReverseTime}
     * @example
     * // example
     *  var reverse = cc.reverseTime(this);
     */
    export function reverseTime(action: FiniteTimeAction): ReverseTime;

    /**  Animates a sprite given the name of an Animation
     * @class
     * @extends cc.ActionInterval
     * @param {cc.Animation} animation
     * @example
     * // create the animation with animation
     * var anim = new cc.Animate(dance_grey);
     */
    export class Animate extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * create the animate with animation.
         * @param {cc.Animation} animation
         */
        public constructor(animation: Animation);
        public constructor();

        /**
         * @return {cc.Animation}
         */
        public getAnimation(): Animation;

        /**
         * @param {cc.Animation} animation
         */
        public setAnimation(animation: Animation): void;

        /**
         * Gets the index of sprite frame currently displayed.
         * @return {Number}
         */
        public getCurrentFrameIndex(): number;

        /**
         * @param {cc.Animation} animation
         * @return {Boolean}
         */
        public initWithAnimation(animation: Animation): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.Animate}
         */
        public clone(): Animate;

        /**
         * Returns a reversed action.
         * @return {cc.Animate}
         */
        public reverse(): Animate;
    }

    /**
     * create the animate with animation
     * @function
     * @param {cc.Animation} animation
     * @return {cc.Animate}
     * @example
     * // example
     * // create the animation with animation
     * var anim = cc.animate(dance_grey);
     */
    export function animate(animation: Animation): Animate;

    /**
     * <p>
     *     Overrides the target of an action so that it always runs on the target<br/>
     *     specified at action creation rather than the one specified by runAction.
     * </p>
     * @class
     * @extends cc.ActionInterval
     * @param {cc.Node} target
     * @param {cc.FiniteTimeAction} action
     */
    export class TargetedAction extends ActionInterval {
        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
         * Create an action with the specified action and forced target.
         * @param {cc.Node} target
         * @param {cc.FiniteTimeAction} action
         */
        public ctor(target: Node, action: FiniteTimeAction): void;
        public ctor(): void;

        /**
         * Init an action with the specified action and forced target
         * @param {cc.Node} target
         * @param {cc.FiniteTimeAction} action
         * @return {Boolean}
         */
        public initWithTarget(target: Node, action: FiniteTimeAction): boolean;

        /**
         * returns a new clone of the action
         * @returns {cc.TargetedAction}
         */
        public clone(): TargetedAction;

        /**
         * return the target that the action will be forced to run with
         * @return {cc.Node}
         */
        public getForcedTarget(): Node;

        /**
         * set the target that the action will be forced to run with
         * @param {cc.Node} forcedTarget
         */
        public setForcedTarget(forcedTarget: Node): void;
    }

    /**
     * Create an action with the specified action and forced target
     * @function
     * @param {cc.Node} target
     * @param {cc.FiniteTimeAction} action
     * @return {cc.TargetedAction}
     */
    export function targetedAction(target: Node, action: FiniteTimeAction): TargetedAction;
}
