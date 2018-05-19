/*
 * @Author: Ryoma 
 * @Date: 2018-04-25 15:28:30 
 * @Last Modified by: Ryoma
 * @Last Modified time: 2018-05-11 11:22:24
 */

type UIBaseMap = {
    [key: string]: any
};

export default class UITemplate extends ccui.Widget {
    protected _ui_base_map: UIBaseMap;
    constructor() {
        super();

        this._ui_base_map = {};
    }

    public addUI(ui: ccui.Widget) {
        if (ui.getName() !== "" && ui.getName() !== "default") {
            this._ui_base_map[ui.getName()] = ui;
        }
    }

    public getUI(name: string) {
        return this._getUI(name);
    }

    public getUITemplate(name: string) {
        return this._getUI(name);
    }

    public getUIButton(name: string) {
        return this._getUI(name);
    }

    public getUIImage(name: string) {
        return this._getUI(name);
    }

    public getUIText(name: string) {
        return this._getUI(name);
    }

    public getUIInputField(name: string) {
        return this._getUI(name);
    }

    public getUITileList(name: string) {
        return this._getUI(name);
    }

    public getUICanvas(name: string) {
        return this._getUI(name);
    }

    private _getUI(prop: string) {
        if (this._ui_base_map.hasOwnProperty(prop)) {
            return this._ui_base_map[prop];
        }

        return undefined;
    }
}
