declare namespace cc {

    /**
     * @class
     * @extends cc.Scene
     * @param {Number} t time in seconds
     * @param {cc.Scene} scene the scene to transit with
     * @example
     * var trans = new TransitionScene(time,scene);
     */
    export class TransitionScene extends cc.Scene {
    }


    /**
     * Fade out the outgoing scene and then fade in the incoming scene.
     * @class
     * @extends cc.TransitionScene
     * @param {Number} t time in seconds
     * @param {cc.Scene} scene
     * @param {cc.TRANSITION_ORIENTATION_LEFT_OVER|cc.TRANSITION_ORIENTATION_RIGHT_OVER|cc.TRANSITION_ORIENTATION_UP_OVER|cc.TRANSITION_ORIENTATION_DOWN_OVER} o
     * @example
     * var trans = new cc.TransitionFade(time,scene,color)
     */
    export class TransitionFade extends TransitionScene {
        /**
         * Constructor of TransitionFade
         * @param {Number} t time in seconds
         * @param {cc.Scene} scene
         * @param {cc.TRANSITION_ORIENTATION_LEFT_OVER|cc.TRANSITION_ORIENTATION_RIGHT_OVER|cc.TRANSITION_ORIENTATION_UP_OVER|cc.TRANSITION_ORIENTATION_DOWN_OVER} o
         */
        constructor(t: number, scene: Scene, color: cc.Color);
    }
}