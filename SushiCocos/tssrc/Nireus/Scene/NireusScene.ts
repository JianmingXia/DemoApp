/*
 * @Author: Ryoma 
 * @Date: 2018-04-26 14:23:25 
 * @Last Modified by: Ryoma
 * @Last Modified time: 2018-04-28 15:02:04
 */

import UITemplate from "../UI/UITemplate";
import IDisplayable from "./Base/IDisplayable";

export default class NireusScene extends UITemplate implements IDisplayable {
    constructor() {
        super();
    }

    public onShow(param?: any) {
        cc.log("NireusScene onShow");
        return;
    }

    public onHide() {
        cc.log("NireusScene onHide");
        return;
    }
}
