import RootScene from "./RootScene";
import { LayerType } from "./SceneConst";
import NireusScene from "./NireusScene";

export default class SceneManager {
    public static getInstance(): SceneManager {
        return this._instance || (this._instance = new SceneManager());
    }

    private static _instance: SceneManager;

    private _scene_arr: NireusScene[] = [];

    private constructor() {
        
    }

    public pushScene(scene: NireusScene, param?: any) {
        if (this._scene_arr.length > 0) {
            const top_scene = this._scene_arr[this._scene_arr.length - 1];

            if (top_scene === scene) {
                top_scene.onShow(param);
                return;
            }

            RootScene.getInstance().removeFromLayer(LayerType.LT__BACKGROUND, top_scene);
            top_scene.onHide();
        }

        RootScene.getInstance().addToLayer(LayerType.LT__BACKGROUND, scene);
        scene.onShow(param);
        this._scene_arr.push(scene);
    }

    public replaceScene(scene: NireusScene, param?: any) {
        if (this._scene_arr.length > 0) {
            const top_scene = this._scene_arr[this._scene_arr.length - 1];

            if (top_scene === scene) {
                top_scene.onHide();
                top_scene.onShow(param);
                return;
            }

            RootScene.getInstance().removeFromLayer(LayerType.LT__BACKGROUND, top_scene);
            top_scene.onHide();
            this._scene_arr.pop();
        }

        RootScene.getInstance().addToLayer(LayerType.LT__BACKGROUND, scene);
        scene.onShow(param);
        this._scene_arr.push(scene);
    }

    public popScene() {
        if (this._scene_arr.length <= 1) {
            return;
        }

        let top_scene = this._scene_arr[this._scene_arr.length - 1];

        RootScene.getInstance().removeFromLayer(LayerType.LT__BACKGROUND, top_scene);
        top_scene.onHide();
        this._scene_arr.pop();

        top_scene = this._scene_arr[this._scene_arr.length - 1];
        RootScene.getInstance().addToLayer(LayerType.LT__BACKGROUND, top_scene);
        top_scene.onShow();
    }
}
