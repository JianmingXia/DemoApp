import { LayerType } from "./SceneConst";

export default class RootScene extends cc.Scene {
    public static getInstance(): RootScene {
        return this._instance || (this._instance = new RootScene());
    }

    private static _instance: RootScene;
    private _layer_arr: cc.Layer[] = [];

    private constructor() {
        super();

        for (let i = 0; i < LayerType.LT__MAX; ++i) {
            let layer = new cc.Layer();
            layer.setAnchorPoint(cc.p(0, 0));
            this._layer_arr.push(layer);
            
            this.addChild(layer);
        }
    }

    public resetLayer() {
        for (let layer of this._layer_arr) {
            if (layer) {
                layer.removeAllChildren();
            }
        }
    }

    public addToLayer(layer_type: number, template: cc.Node) {
        const layer = this._getLayer(layer_type);
        if (layer) {
            if (template.getParent() === layer) {
                cc.log("RootScene::addToLayer: template is already in this layer!");
            } else {
                layer.addChild(template);
            }
        }
    }

    public removeFromLayer(layer_type: number, template: cc.Node) {
        const layer = this._getLayer(layer_type);
        if (layer) {
            if (template.getParent() !== layer) {
                cc.log("RootScene::removeFromLayer: template is not in this layer!");
            } else {
                layer.removeChild(template);
            }
        }
    }

    private _getLayer(layer_type: number): cc.Layer {
        if (layer_type < 0 || layer_type > LayerType.LT__MAX) {
            return undefined;
        }

        return this._layer_arr[layer_type];
    }
}
