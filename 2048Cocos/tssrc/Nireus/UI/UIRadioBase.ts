/*
 * @Author: Ryoma 
 * @Date: 2018-04-19 15:22:39 
 * @Last Modified by: Ryoma
 * @Last Modified time: 2018-04-23 17:18:22
 */

import UITemplate from "./UITemplate";
import { OnRadioBaseClickCallbackFunc } from "./Types";
import UIButton from "./UIButton";

type TemplateMap = {
    [key: string]: UITemplate
};

export default class UIRadioBase {
    private _root_template: UITemplate;
    private _selected_btn_name: string;
    private _realte_tpl_map: TemplateMap;
    private _on_click_callback: OnRadioBaseClickCallbackFunc;

    constructor(root_template: UITemplate) {
        this._root_template = root_template;
        this._selected_btn_name = "";
        this._realte_tpl_map = {};
    }

    // set custom callback, replace default callback
    public setClickCallback(click_callback: OnRadioBaseClickCallbackFunc) {
        this._on_click_callback = click_callback;
    }

    public addMember(name: string, relate_tpl?: UITemplate) {
        if (typeof this._root_template === "undefined") {
            cc.log("UIRadioBase::add can not find root template");
            return;
        }

        let btn = this._root_template.getUIButton(name);
        if (btn) {
            if (relate_tpl) {
                this._realte_tpl_map[name] = relate_tpl;
            }
            btn.addClickEventListener(this._onClick.bind(this));
        }
    }

    // when init you need call this func, for set the default selected, no side effects
    public setSelected(name: string, need_callback?: boolean) {
        this._setSelected(name, need_callback);
    }

    private _setSelected(name: string, need_callback = false) {
        this._select(this._selected_btn_name, false);

        if (this._select(name, true)) {
            this._selected_btn_name = name;

            if (need_callback && this._on_click_callback) {
                this._on_click_callback(this._root_template.getUIButton(name));
            }
        }
    }

    private _select(name: string, selected: boolean) {
        let btn: UIButton = this._root_template.getUIButton(name);

        if (btn) {
            btn.setSelected(selected);

            if (this._realte_tpl_map.hasOwnProperty(name)) {
                this._realte_tpl_map[name].setVisible(selected);
            }

            return true;
        }

        return false;
    }

    private _onClick(btn: UIButton) {
        if (btn.isSelected()) {
            return;
        }

        // use custom callback, if you just want do _on_click_cb, please return false 
        if (this._on_click_callback && false === this._on_click_callback(btn)) {
            return;
        }
        
        this._setSelected(btn.getName());
    }
}
