import StartScene from "./StartScene";
import SceneManager from "../../Nireus/Scene/SceneManager";

export = {
    start: () => {
        SceneManager.getInstance().pushScene(StartScene.getInstance());
    }
};
