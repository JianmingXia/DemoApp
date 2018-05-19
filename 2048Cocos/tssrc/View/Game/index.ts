import PlayScene from "./PlayScene";
import SceneManager from "../../Nireus/Scene/SceneManager";

export = {
    start: () => {
        SceneManager.getInstance().pushScene(PlayScene.getInstance());
    }
};
