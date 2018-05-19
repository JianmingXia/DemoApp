/*
 * @Author: Ryoma 
 * @Date: 2018-04-28 14:12:47 
 * @Last Modified by: Ryoma
 * @Last Modified time: 2018-05-15 18:07:36
 */

import { CreateFrameAnimConfig, FrameAnimConfig, ResetFrameAnimConfig } from "./Types";
import { AnimResourceType } from "./Const";

export default class FrameAnimManager {
    public static getInstance(): FrameAnimManager {
        return this._instance || (this._instance = new FrameAnimManager());
    }

    private static _instance: FrameAnimManager;
    // TexturePacker generate result
    private _swf_plist_index_length = 4;

    private constructor() {
    }

    // get frame animation, if no cache then new one
    public createFrameAnimation({ name, scale = 1, delay = 0.04, loop = false, type = AnimResourceType.DEFAULT }
        : CreateFrameAnimConfig) {
        let sprite = new cc.Sprite();
        sprite.setScale(scale);

        let animation = this._getPrimaryAnimation({ name, delay, type });

        sprite.runAction(this._getProcessAnim(animation, loop));

        return sprite;
    }

    // reset frame anim
    public resetFrameAnimation(sprite: cc.Sprite, { name, loop }: ResetFrameAnimConfig) {
        let animation = cc.animationCache.getAnimation(name);

        if (animation) {
            animation.setRestoreOriginalFrame(true);

            sprite.stopAllActions();
            sprite.runAction(this._getProcessAnim(animation, loop));
        } else {
            cc.log(`FrameAnimManager::resetFrameAnimation no animation: ${name}`);
        }
    }

    private _getProcessAnim(animation: cc.Animation, loop: boolean) {
        animation.setRestoreOriginalFrame(true);

        let animate = new cc.Animate(animation);
        return loop ? animate.repeatForever() : animate;
    }

    private _getPrimaryAnimation({ name, delay, type }: FrameAnimConfig) {
        let animation = cc.animationCache.getAnimation(name);

        if (!animation) {
            animation = this._createPrimaryAnimation({ name, delay, type });

            cc.animationCache.addAnimation(animation, name);
        }

        return animation;
    }

    private _createPrimaryAnimation({ name, delay, type }: FrameAnimConfig) {
        let frames = [];

        let index = 0;
        while (true) {
            let frame_name = this._getFrameName(name, index, type);

            let frame = cc.spriteFrameCache.getSpriteFrame(frame_name);
            if (frame) {
                frames.push(frame);
                index++;
            } else {
                break;
            }
        }

        if (frames.length === 0) {
            cc.log(`FrameAnimManager::_createPrimaryAnimation no spriteFrame: ${name}`);
        }

        return new cc.Animation(frames, delay);
    }

    private _getFrameName(name: string, index: number, type: AnimResourceType) {
        switch (type) {
            case AnimResourceType.DEFAULT:
                return `${name}_${index}.png`;
            case AnimResourceType.SWF_2_PLIST:
                let frame_name = index.toString().padStart(this._swf_plist_index_length, "0");
                return `${name}/${frame_name}`;
            default:
                break;
        }
    }
}
