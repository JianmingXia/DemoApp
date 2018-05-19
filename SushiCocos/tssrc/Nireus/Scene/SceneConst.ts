/*
 * @Author: Ryoma 
 * @Date: 2018-04-26 17:08:13 
 * @Last Modified by: Ryoma
 * @Last Modified time: 2018-04-28 14:54:01
 */

// 依次为 背景层 & 中间层 & 弹出层 & 特殊层 & 引导层 & 掩码层 & 加载层
enum LayerType {
    LT__BACKGROUND = 0,
    LT__MIDDLE = 1,
    LT__POPUP = 2,
    LT__SPECIAL = 3,
    LT__GUIDE = 4,
    LT__MASK = 5,
    LT__LOADING = 6,
    LT__MAX = 7
}

enum AnimType {
    NO_ANIM = 0,
    SCALE = 1,
    MOVE_FORM_TOP = 2,
    MOVE_FORM_BOTTOM = 3,
    MOVE_FORM_LEFT = 4,
    MOVE_FORM_RIGHT = 5
}

export { LayerType, AnimType };
