export default class SushiSprite extends cc.Sprite {
    private _disappear_action: cc.Animate;
    private _touch_listener: cc.EventListener;
    private _on_touch_began_cb: VoidFunction;

    constructor(fileName?: string | object, rect?: cc.Rect, rotated?: boolean) {
        super(fileName, rect, rotated);
    }

    public setOnTouchBeganCallback(cb: VoidFunction) {
        this._on_touch_began_cb = cb;
    }

    public onEnter() {
        super.onEnter();

        this._addTouchEventListenser();
        this._disappear_action = this._createDisappearAction();
        this._disappear_action.retain();
    }

    public onExit() {
        cc.log("onExit");
        this._disappear_action.release();

        super.onExit();
    }

    private _addTouchEventListenser() {
        this._touch_listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this._onTouchBegan.bind(this)
        });

        cc.eventManager.addListener(this._touch_listener, this);
    }

    private _onTouchBegan(touch: cc.Touch, event: cc.Event) {
        let pos = touch.getLocation();
        let target = event.getCurrentTarget();
        if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
            cc.log("touched");
            this._removeTouchEventListenser();
            cc.log("pos.x=" + pos.x + ",pos.y=" + pos.y);

            target.stopAllActions();
            this._onTouchBeganCallback();

            let seq_ac = cc.sequence(this._disappear_action, cc.callFunc(() => {
                cc.log("callfun........");
                target.removeFromParent();
            }, target));

            target.runAction(seq_ac);

            return true;
        }
        return false;
    }

    private _removeTouchEventListenser() {
        cc.eventManager.removeListener(this._touch_listener);
    }

    private _createDisappearAction() {
        let frames = [];
        for (let i = 0; i < 11; i++) {
            let str = "sushi_1n_" + i + ".png";
            let frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        let animation = new cc.Animation(frames, 0.02);
        let action = new cc.Animate(animation);

        return action;
    }

    private _onTouchBeganCallback() {
        if (this._on_touch_began_cb) {
            this._on_touch_began_cb();
        }
    }
}
