declare namespace cc {
    /**
     * cc.TransitionProgress transition.
     * @class
     * @extends cc.TransitionScene
     * @param {Number} t time
     * @param {cc.Scene} scene
     * @example
     * var trans = new cc.TransitionProgress(time,scene);
     */
    export class TransitionProgress extends TransitionScene {
    }

    /**
     * cc.TransitionProgressInOut transition.
     * @class
     * @extends cc.TransitionProgress
     */
    export class TransitionProgressInOut extends TransitionProgress {
        constructor(t: number, scene: cc.Scene);
    }
}