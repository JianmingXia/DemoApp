/*
 * @Author: Ryoma 
 * @Date: 2018-05-11 10:54:05 
 * @Last Modified by: Ryoma
 * @Last Modified time: 2018-05-17 14:26:18
 */

import GlobalConfig from "../../Common/GlobalConfig";
import { VoidFunc } from "../CommonTypes";

export default class UIButton extends ccui.Button {
    protected static _original_scale = 1;
    protected static _img_scale_value = 0.86;

    protected _is_disabled = false;
    protected _is_selected = false;
    protected _have_breath_anim = false;
    protected _special = false;
    protected _special_callback: VoidFunc;

    protected _title_scale_value: number;

    private _breath_anim: cc.Action;

    constructor() {
        super();

        super.setTouchEnabled(true);
        super.setPressedActionEnabled(true);

        this._title_scale_value = UIButton._original_scale + this._zoomScale;
    }

    public enableOutLine(outline_color: cc.Color, outline_size: number) {
        if (this._titleRenderer) {
            this._titleRenderer.enableStroke(outline_color, outline_size);
        }
    }

    public setBreathAnim(have_breath_anim = true) {
        if (this._have_breath_anim === have_breath_anim) {
            cc.log("_have_breath_anim repeat set");
            return;
        }

        this._have_breath_anim = have_breath_anim;

        if (this._have_breath_anim) {
            const action1 = cc.scaleTo(0.2, 1.005, 0.995);
            const action2 = cc.scaleTo(0.8, 1.025, 1.015);
            const action3 = cc.scaleTo(0.2, 1.02, 1.02);
            const action4 = cc.scaleTo(0.8, 1, 1);
            const seq = cc.sequence(action1, action2, action3, action4);
            this._breath_anim = cc.repeatForever(seq);
            this.runAction(this._breath_anim);
        } else {
            this.stopAction(this._breath_anim);
        }
    }

    // when selected status changed, then modified _buttonScale9Renderer
    public setSelected(selected: boolean) {
        if (this._is_selected === selected) {
            return;
        }

        this._is_selected = selected;

        if (this._is_selected) {
            this.setTouchEnabled(false);
            this._buttonScale9Renderer.setSpriteFrame(this._buttonClickedSpriteFrame);
        } else {
            this.setTouchEnabled(true);
            this._buttonScale9Renderer.setSpriteFrame(this._buttonNormalSpriteFrame);
        }
    }

    public isSelected() {
        return this._is_selected;
    }

    // disabled
    public setDisabled(is_disabled: boolean) {
        if (this._is_disabled === is_disabled) {
            return;
        }

        this._is_disabled = is_disabled;

        if (this._is_disabled) {
            this.setTouchEnabled(false);
            this._buttonScale9Renderer.setSpriteFrame(this._buttonDisableSpriteFrame);
        } else {
            this.setTouchEnabled(true);
            this._buttonScale9Renderer.setSpriteFrame(this._buttonNormalSpriteFrame);
        }
    }

    public isDisabled() {
        return this._is_disabled;
    }

    public setSpecial(special: boolean, special_callback?: VoidFunc) {
        this._special = special;

        if (special_callback) {
            this._special_callback = special_callback;
        }
    }

    public loadSkin(skin_type: string, path: string, texture_type = ccui.Widget.PLIST_TEXTURE) {
        if (texture_type !== ccui.Widget.PLIST_TEXTURE) {
            path = GlobalConfig.getInstance().res_absolute_path + path;
        }

        if (path.endsWith(".azp")) {
            cc.log("not support azp");
            return;
        }

        switch (skin_type) {
            case "upSkin":
                this.loadTextureNormal(path, texture_type);
                break;
            case "downSkin":
                this.loadTexturePressed(path, texture_type);
                break;
            case "disabledSkin":
                this.loadTextureDisabled(path, texture_type);
                break;
            default:
                cc.log("skin_type maybe error");
                break;
        }
    }

    // overwrite: will be invoked when set this._special = true
    public update() {
        if (this._clickEventListener) {
            this._clickEventListener(this);
        }
    }

    public updateTweenAction(value: number, key: string) {
        switch (key) {
            case "width":
                this.width = value;
                break;
            case "scaleX":
                this.setScaleX(value);
                break;
            default:
                cc.log("UIButton::updateTweenAction key not found");
                break;
        }
    }

    // overwrite: will be invoked onTouchEnded
    protected _releaseUpEvent() {
        if (this._special) {
            this.unscheduleUpdate();
            if (this._special_callback) {
                this._special_callback();
            }

            return;
        }

        super._releaseUpEvent();
    }

    // overwrite
    protected _onPressStateChangedToNormal() {
        this._buttonScale9Renderer.setSpriteFrame(this._buttonNormalSpriteFrame);
        this._buttonScale9Renderer.setState(ccui.Scale9Sprite.state.NORMAL);

        if (this._pressedTextureLoaded) {
            if (this.pressedActionEnabled) {
                this._toNormalAction();
            }
        } else {
            if (this.pressedActionEnabled) {
                this._toNormalAction();
            } else {
                this._noTextureToNormalAction();
            }
        }

        this.unscheduleUpdate();
        if (this._special_callback) {
            this._special_callback();
        }
    }

    // overwrite
    protected _onPressStateChangedToPressed() {
        this._buttonScale9Renderer.setState(ccui.Scale9Sprite.state.NORMAL);
        this._buttonScale9Renderer.setSpriteFrame(this._buttonClickedSpriteFrame);

        if (this._pressedTextureLoaded) {
            if (this.pressedActionEnabled) {
                this._toPressedAction();
            }
        } else {
            if (this.pressedActionEnabled) {
                this._toPressedAction();
            } else {
                this._noTextureToPressedAction();
            }
        }

        if (this._special) {
            this.scheduleUpdate();
        }
    }

    private _toNormalAction() {
        this._buttonScale9Renderer.stopAllActions();
        this._buttonScale9Renderer.runAction(this._getNormalScale());

        if (this._titleRenderer) {
            this._titleRenderer.stopAllActions();
            this._titleRenderer.runAction(this._getNormalScale());
        }
    }

    private _noTextureToNormalAction() {
        this._buttonScale9Renderer.stopAllActions();
        this._buttonScale9Renderer.setScale(UIButton._original_scale);

        if (this._scale9Enabled) {
            this._buttonScale9Renderer.setColor(cc.Color.WHITE);
        }

        if (this._titleRenderer) {
            this._titleRenderer.stopAllActions();
            this._titleRenderer.setScale(UIButton._original_scale);
        }
    }

    private _toPressedAction() {
        this._buttonScale9Renderer.stopAllActions();
        this._buttonScale9Renderer.runAction(this._getPressedScale());

        if (this._titleRenderer) {
            this._titleRenderer.stopAllActions();
            this._titleRenderer.runAction(this._getPressedScale());
        }
    }

    private _noTextureToPressedAction() {
        this._buttonScale9Renderer.stopAllActions();
        this._buttonScale9Renderer.setScale(this._title_scale_value, this._title_scale_value);

        if (this._titleRenderer) {
            this._titleRenderer.stopAllActions();
            this._titleRenderer.setScale(this._title_scale_value, this._title_scale_value);
        }
    }

    private _getPressedScale() {
        return cc.scaleTo(0.1, UIButton._img_scale_value, UIButton._img_scale_value);
    }

    private _getNormalScale() {
        return cc.scaleTo(0.15, UIButton._original_scale);
    }
}
