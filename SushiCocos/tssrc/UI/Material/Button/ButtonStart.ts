import UIButton from "../../../Nireus/UI/UIButton";

export default class ButtonStart extends UIButton {
    constructor() {
        super();

        this.loadSkin("upSkin", "start_N.png");
        this.loadSkin("downSkin", "start_S.png");
    }
}
