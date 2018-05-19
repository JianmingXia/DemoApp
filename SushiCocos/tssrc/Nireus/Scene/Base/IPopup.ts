/*
 * @Author: Ryoma 
 * @Date: 2018-04-26 17:07:39 
 * @Last Modified by: Ryoma
 * @Last Modified time: 2018-04-28 15:22:47
 */

import IDisplayable from "./IDisplayable";
import { AnimType } from "../SceneConst";

interface IPopup extends IDisplayable {
    anim_type: AnimType;
    alpha: number;
    touch_outside_remove: boolean;
}

export default IPopup;
