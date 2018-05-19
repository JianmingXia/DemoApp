import IApplication from "./IApplication";
import RootScene from "./Nireus/Scene/RootScene";
import GameModule from "./View/Game/module";
import GlobalConfig from "./Common/GlobalConfig";
import SceneManager from "./Nireus/Scene/SceneManager";

export default class Application implements IApplication {
    public startUp() {
        cc.director.runScene(RootScene.getInstance());

        let winsize = cc.director.getWinSize();
        GlobalConfig.getInstance().frame_width = winsize.width;
        GlobalConfig.getInstance().frame_height = winsize.height;

        GameModule.ensure((scene: any) => {
            scene.start();
        });
    }
}
