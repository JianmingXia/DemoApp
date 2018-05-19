/*
 * @Author: Ryoma 
 * @Date: 2018-04-28 14:12:47 
 * @Last Modified by: Ryoma
 * @Last Modified time: 2018-05-09 16:42:06
 */

import NireusPopup from "./NireusPopup";
import RootScene from "./RootScene";
import { AnimType, LayerType } from "./SceneConst";
import GlobalConfig from "../../Common/GlobalConfig";

// _remove_on_click_bg ???
export default class PopupManager {
    public static getInstance(): PopupManager {
        return this._instance || (this._instance = new PopupManager());
    }

    private static _instance: PopupManager;
    private _width_adjust: number;
    private _height_adjust: number;
    private _popup_arr: NireusPopup[] = [];
    private _show_layer_action_func: ShowLayerActionFunc;
    private _hide_layer_action_func: HideLayerActionFunc;

    private constructor() {
        this._width_adjust = GlobalConfig.getInstance().frame_width * 0.01;
        this._height_adjust = GlobalConfig.getInstance().frame_height * 0.01;
    }

    set show_layer_action_func(show_layer_action_func: ShowLayerActionFunc) {
        this._show_layer_action_func = show_layer_action_func;
    }

    set hide_layer_action_func(hide_layer_action_func: HideLayerActionFunc) {
        this._hide_layer_action_func = hide_layer_action_func;
    }

    public addPopup(popup: NireusPopup, param?: any) {
        if (!popup || popup.getParent()) {
            return;
        }

        this._popup_arr.push(popup);
        this._loadPopup();

        this._showPopup(param);
    }

    public removePopup(popup: NireusPopup) {
        this._removePopUpBegin(popup);
    }

    public removeAllPopup() {
        for (let popup of this._popup_arr) {
            this._removePopUp(popup);
        }
    }

    private _loadPopup() {
        let popup = this._getCurrentPopup();

        let layer = new cc.LayerColor(cc.color(0, 0, 0, popup.alpha),
            GlobalConfig.getInstance().frame_width, GlobalConfig.getInstance().frame_height);
        this._addLayerListener(layer, popup);

        popup.setAnchorPoint(0.5, 0.5);
        popup.x = GlobalConfig.getInstance().frame_width * 0.5;
        popup.y = GlobalConfig.getInstance().frame_height * 0.5;
        layer.addChild(popup);

        popup.retain();
        RootScene.getInstance().addToLayer(LayerType.LT__POPUP, layer);
    }

    private _getCurrentPopup() {
        if (this._popup_arr.length === 0) {
            return undefined;
        } else {
            return this._popup_arr[this._popup_arr.length - 1];
        }
    }

    private _showPopup(param: any) {
        let popup = this._getCurrentPopup();
        let layer = popup.getParent();

        switch (popup.anim_type) {
            case AnimType.NO_ANIM:
                {
                    popup.x = GlobalConfig.getInstance().frame_width / 2;
                    popup.y = GlobalConfig.getInstance().frame_height / 2;
                    popup.onShow(param);
                }
                break;

            case AnimType.SCALE:
                {
                    this._runShowLayerAction(layer, popup.alpha);
                    popup.x = GlobalConfig.getInstance().frame_width / 2;
                    popup.y = GlobalConfig.getInstance().frame_height / 2;
                    popup.onShow(param);

                    popup.runAction(this._getShowAction(popup.anim_type));
                }
                break;

            case AnimType.MOVE_FORM_TOP:
                {
                    this._runShowLayerAction(layer, popup.alpha);
                    popup.x = GlobalConfig.getInstance().frame_width / 2;
                    popup.y = GlobalConfig.getInstance().frame_height * 1.5;
                    popup.onShow(param);

                    popup.runAction(this._getShowAction(popup.anim_type));
                }
                break;

            case AnimType.MOVE_FORM_BOTTOM:
                {
                    this._runShowLayerAction(layer, popup.alpha);
                    popup.x = GlobalConfig.getInstance().frame_width / 2;
                    popup.y = -GlobalConfig.getInstance().frame_height / 2;
                    popup.onShow(param);

                    popup.runAction(this._getShowAction(popup.anim_type));
                }
                break;

            case AnimType.MOVE_FORM_LEFT:
                {
                    this._runShowLayerAction(layer, popup.alpha);
                    popup.x = -GlobalConfig.getInstance().frame_width / 2;
                    popup.y = GlobalConfig.getInstance().frame_height / 2;
                    popup.onShow(param);

                    popup.runAction(this._getShowAction(popup.anim_type));
                }
                break;

            case AnimType.MOVE_FORM_RIGHT:
                {
                    this._runShowLayerAction(layer, popup.alpha);
                    popup.x = GlobalConfig.getInstance().frame_width * 1.5;
                    popup.y = GlobalConfig.getInstance().frame_height / 2;
                    popup.onShow(param);

                    popup.runAction(this._getShowAction(popup.anim_type));
                }
                break;

            default:
                break;
        }
    }

    private _getShowAction(anim_type: AnimType) {
        switch (anim_type) {
            case AnimType.SCALE:
                {
                    let scale_to = cc.scaleTo(0.4, 1.01);
                    let scale_to2 = cc.scaleTo(0.2, 1.0);
                    let scale_ease_out = scale_to.easing(cc.easeBackOut());
                    let scale_ease_out2 = scale_to2.easing(cc.easeBackOut());
                    let seq = cc.sequence(scale_ease_out, scale_ease_out2);
                    return seq;
                }
            case AnimType.MOVE_FORM_TOP:
                {
                    let move_by = cc.moveBy(0.4, cc.p(0,
                        -GlobalConfig.getInstance().frame_height - this._height_adjust));
                    let move_by2 = cc.moveBy(0.2, cc.p(0, this._height_adjust));
                    let move_ease_out = move_by.easing(cc.easeBackOut());
                    let move_ease_out2 = move_by2.easing(cc.easeBackOut());
                    let seq = cc.sequence(move_ease_out, move_ease_out2);

                    return seq;
                }
            case AnimType.MOVE_FORM_BOTTOM:
                {
                    let move_by = cc.moveBy(0.4, cc.p(0,
                        GlobalConfig.getInstance().frame_height + this._height_adjust));
                    let move_by2 = cc.moveBy(0.2, cc.p(0, -this._height_adjust));
                    let move_ease_out = move_by.easing(cc.easeBackOut());
                    let move_ease_out2 = move_by2.easing(cc.easeBackOut());
                    let seq = cc.sequence(move_ease_out, move_ease_out2);

                    return seq;
                }
            case AnimType.MOVE_FORM_LEFT:
                {
                    let move_by = cc.moveBy(0.3, cc.p(GlobalConfig.getInstance().frame_width * 0.9, 0));
                    let move_by2 = cc.moveBy(0.5, cc.p(GlobalConfig.getInstance().frame_width * 0.1, 0));
                    let move_ease_out = move_by.easing(cc.easeSineIn());
                    let move_ease_out2 = move_by2.easing(cc.easeElasticOut());
                    let seq = cc.sequence(move_ease_out, move_ease_out2);

                    return seq;
                }
            case AnimType.MOVE_FORM_RIGHT:
                {
                    let move_by = cc.moveBy(0.4, cc.p(-GlobalConfig.getInstance().frame_width - this._width_adjust, 0));
                    let move_by2 = cc.moveBy(0.2, cc.p(this._width_adjust, 0));
                    let move_ease_out = move_by.easing(cc.easeBackOut());
                    let move_ease_out2 = move_by2.easing(cc.easeBackOut());
                    let seq = cc.sequence(move_ease_out, move_ease_out2);

                    return seq;
                }
        }
    }

    private _addLayerListener(layer: cc.LayerColor, popup: NireusPopup) {
        let touch_listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: () => {
                return true;
            },
            onTouchEnded: this._onTouchEndedCb.bind(this, popup)
        });
        
        cc.eventManager.addListener(touch_listener, layer);
    }

    private _onTouchEndedCb(popup: NireusPopup, touch: cc.Touch, event: cc.Event) {
        if (popup && popup.touch_outside_remove) {
            let target = event.getCurrentTarget();
            let touchPos = target.convertToNodeSpace(touch.getLocation());
            let inner_rect = popup.getBoundingBox();

            if (!cc.rectContainsPoint(inner_rect, touchPos)) {
                this._removePopUpBegin(popup);
                cc.log("out");
            } else {
                cc.log("in");
            }
        }
    }

    private _removePopUpBegin(popup: NireusPopup) {
        let length = this._popup_arr.length;

        for (let i = length - 1; i >= 0; i++) {
            if (this._popup_arr[i] === popup && popup && popup.getParent()) {
                this._removePopUp(popup);

                this._popup_arr.splice(i, 1);
                break;
            }
        }
    }

    private _removePopUp(popup: NireusPopup) {
        switch (popup.anim_type) {
            case AnimType.NO_ANIM:
                {
                    this._removePopUpAnimEnd(popup);
                }
                break;

            case AnimType.SCALE:
            case AnimType.MOVE_FORM_TOP:
            case AnimType.MOVE_FORM_BOTTOM:
            case AnimType.MOVE_FORM_LEFT:
            case AnimType.MOVE_FORM_RIGHT:
                {
                    this._runHideLayerAction(popup.getParent());

                    popup.runAction(this._getHideAction(popup));
                }
                break;

            default:
                break;
        }
    }

    private _getHideAction(popup: NireusPopup) {
        let removePopUpAnimEnd = cc.callFunc(this._removePopUpAnimEnd, this, popup);

        switch (popup.anim_type) {
            case AnimType.SCALE:
                {
                    let action2 = cc.scaleTo(0.3, 0.5);
                    let scale_ease_in = action2.easing(cc.easeBackIn());
                    let seq = cc.sequence(scale_ease_in, removePopUpAnimEnd);

                    return seq;
                }
            case AnimType.MOVE_FORM_TOP:
                {
                    let move_by = cc.moveBy(0.2, cc.p(0, -this._height_adjust));
                    let move_by2 = cc.moveBy(0.4, cc.p(0,
                        GlobalConfig.getInstance().frame_height + this._height_adjust));
                    let move_ease_out = move_by.easing(cc.easeBackOut());
                    let move_ease_out2 = move_by2.easing(cc.easeBackOut());
                    let seq = cc.sequence(move_ease_out, move_ease_out2, removePopUpAnimEnd);

                    return seq;
                }
            case AnimType.MOVE_FORM_BOTTOM:
                {
                    let move_by = cc.moveBy(0.2, cc.p(0, this._height_adjust));
                    let move_by2 = cc.moveBy(0.4, cc.p(0,
                        -GlobalConfig.getInstance().frame_height - this._height_adjust));
                    let move_ease_out = move_by.easing(cc.easeBackOut());
                    let move_ease_out2 = move_by2.easing(cc.easeBackOut());
                    let seq = cc.sequence(move_ease_out, move_ease_out2, removePopUpAnimEnd);

                    return seq;
                }
            case AnimType.MOVE_FORM_LEFT:
                {
                    let move_by = cc.moveBy(0.3, cc.p(-GlobalConfig.getInstance().frame_width * 0.4, 0));
                    let move_by2 = cc.moveBy(0.3, cc.p(-GlobalConfig.getInstance().frame_width * 0.6, 0));
                    let delay = cc.delayTime(0.1);
                    let move_ease_out = move_by.easing(cc.easeBackIn());
                    let move_ease_out2 = move_by2.easing(cc.easeSineOut());
                    let seq = cc.sequence(delay, move_ease_out, move_ease_out2, removePopUpAnimEnd);

                    return seq;
                }
            case AnimType.MOVE_FORM_RIGHT:
                {
                    let move_by = cc.moveBy(0.2, cc.p(-this._width_adjust, 0));
                    let move_by2 = cc.moveBy(0.4,
                        cc.p(GlobalConfig.getInstance().frame_width + this._width_adjust, 0));
                    let move_ease_out = move_by.easing(cc.easeBackOut());
                    let move_ease_out2 = move_by2.easing(cc.easeBackOut());
                    let seq = cc.sequence(move_ease_out, move_ease_out2, removePopUpAnimEnd);

                    return seq;
                }
        }
    }

    private _removePopUpAnimEnd(popup: NireusPopup) {
        switch (popup.anim_type) {
            case AnimType.NO_ANIM:
                break;
            default:
                {
                    popup.setScale(1, 1);
                    popup.stopAllActions();
                }
                break;
        }

        popup.onHide();
        popup.getParent().removeFromParent();
        popup.removeFromParent();
        popup.release();
    }

    private _runShowLayerAction(layer: cc.Node, alpha: number) {
        if (this._show_layer_action_func) {
            this._show_layer_action_func(layer, alpha);
        } else {
            layer.setOpacity(0);
            let fadeto = cc.fadeTo(0.2, alpha);
            layer.runAction(fadeto);
        }
    }

    private _runHideLayerAction(layer: cc.Node) {
        if (this._hide_layer_action_func) {
            this._hide_layer_action_func(layer);
        } else {
            let delay = cc.delayTime(0.4);
            let fadeto = cc.fadeTo(0.2, 0);

            layer.runAction(cc.sequence(delay, fadeto));
        }
    }
}
