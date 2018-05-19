/*
 * @Author: Ryoma 
 * @Date: 2018-05-08 14:26:53 
 * @Last Modified by: Ryoma
 * @Last Modified time: 2018-05-11 11:19:43
 */

import GlobalConfig from "../../Common/GlobalConfig";

export default class UIImage extends ccui.ImageView {
    constructor() {
        super();
    }

    set source(path: string) {
        this._loadSkin(path);
    }

    private _loadSkin(path: string, texture_type = ccui.Widget.PLIST_TEXTURE) {
        if (texture_type !== ccui.Widget.PLIST_TEXTURE) {
            path = GlobalConfig.getInstance().res_absolute_path + path;
        }

        this.loadTexture(path, texture_type);
    }
}
