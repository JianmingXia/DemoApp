import NireusScene from "../../Nireus/Scene/NireusScene";
import GlobalConfig from "../../Common/GlobalConfig";
import StartTemplate from "../../UI/Template/StartTemplate";
import SceneManager from "../../Nireus/Scene/SceneManager";
import PlayScene from "./PlayScene";

export default class StartScene extends NireusScene {
    public static getInstance(): StartScene {
        return this._instance || (this._instance = new StartScene());
    }
    
    private static _instance: StartScene;
    private _start_tpl: StartTemplate;

    constructor() {
        super();

        cc.spriteFrameCache.addSpriteFrames("res/start.plist");

        this._start_tpl = new StartTemplate();
        this.addChild(this._start_tpl);

        this._registerEventListener();
    }

    private _onStart() {
        SceneManager.getInstance().replaceScene(PlayScene.getInstance());
    }

    private _registerEventListener() {
        this._start_tpl.start_bt.addClickEventListener(this._onStart.bind(this));
    }
}
