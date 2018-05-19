import NireusScene from "../../Nireus/Scene/NireusScene";
import GlobalConfig from "../../Common/GlobalConfig";
import PlayTemplate from "../../UI/Template/PlayTemplate";
import SushiSprite from "./SushiSprite";
import UIText from "../../Nireus/UI/UIText";
import SceneManager from "../../Nireus/Scene/SceneManager";

export default class PlayScene extends NireusScene {
    private _sushi_sprites: cc.Sprite[];
    private _play_tpl: PlayTemplate;
    private _score_label: UIText;
    private _score = 0;
    private _timeout_label: UIText;
    private _timeout = 10;

    constructor() {
        super();
        this._sushi_sprites = [];

        cc.spriteFrameCache.addSpriteFrames("res/sushi.plist");

        this._play_tpl = new PlayTemplate();
        this.addChild(this._play_tpl);

        this._score_label = new UIText(`score:${this._score}`, "Arial", 30);
        this._score_label.x = GlobalConfig.getInstance().frame_width / 2 + 100;
        this._score_label.y = GlobalConfig.getInstance().frame_height - 30;
        this.addChild(this._score_label, 5);

        this._timeout_label = new UIText("" + this._timeout, "Arial", 30);
        this._timeout_label.x = 20;
        this._timeout_label.y = GlobalConfig.getInstance().frame_height - 30;
        this.addChild(this._timeout_label, 5);

        this._addSushi();
        this.schedule(this._update, 1, 16 * 1024, 1);
        this.schedule(this._timer, 1, this._timeout, 1);
    }

    private _update() {
        this._addSushi();

        this._removeSushi();
    }

    private _removeSushi() {
        for (let i = 0; i < this._sushi_sprites.length; i++) {
            if (0 > this._sushi_sprites[i].y) {
                cc.log("remove:" + this._sushi_sprites.length);
                this._sushi_sprites[i].removeFromParent();
                this._sushi_sprites[i] = undefined;
                this._sushi_sprites.splice(i, 1);
                i = i - 1;
            } else {
                break;
            }
        }
    }

    private _addSushi() {
        let sprite = cc.spriteFrameCache.getSpriteFrame("sushi_1n.png");
        const sushi_sprite = new SushiSprite(sprite);
        sushi_sprite.setOnTouchBeganCallback(this._addScore.bind(this));

        const x_value = sushi_sprite.width / 2 + GlobalConfig.getInstance().frame_width / 2 * cc.random0To1();

        sushi_sprite.x = x_value;
        sushi_sprite.y = GlobalConfig.getInstance().frame_height - 30;

        this._play_tpl.addChild(sushi_sprite, 5);

        const drop_action = cc.moveTo(4, cc.p(sushi_sprite.x, -60));
        sushi_sprite.runAction(drop_action);

        this._sushi_sprites.push(sushi_sprite);
    }

    private _addScore() {
        this._score += 1;
        this._score_label.setString(`score:${this._score}`);
    }

    private _timer() {
        if (this._timeout === 0) {
            cc.log("游戏结束");
            let gameover = new cc.LayerColor(cc.color(225, 225, 225, 100));

            let gameover_label = new UIText("Game Over", "Arial", 38);
            gameover_label.x = GlobalConfig.getInstance().frame_width / 2;
            gameover_label.y = GlobalConfig.getInstance().frame_height / 2;

            gameover.addChild(gameover_label, 5);

            let touch_listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: () => {
                    return true;
                }
            });

            cc.eventManager.addListener(touch_listener, gameover);

            let try_again_item = new cc.MenuItemFont(
                "Try Again",
                () => {
                    cc.log("Menu is clicked!");
                    // let transition = new cc.TransitionFade(1, new PlayScene(), cc.color(255, 255, 255, 255));
                    SceneManager.getInstance().replaceScene(new PlayScene());
                }, this);
            
            try_again_item.x = GlobalConfig.getInstance().frame_width / 2;
            try_again_item.y = GlobalConfig.getInstance().frame_height / 2 - 60;

            let menu = new cc.Menu(try_again_item);
            menu.x = 0;
            menu.y = 0;
            gameover.addChild(menu, 1);

            this.getParent().addChild(gameover);

            this.unschedule(this._update);
            this.unschedule(this._timer);
            return;
        }

        this._timeout -= 1;
        this._timeout_label.setString(this._timeout.toString());
    }
}
