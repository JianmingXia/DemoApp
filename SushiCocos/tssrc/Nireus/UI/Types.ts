import { ItemAnimType } from "./Const";
import UITemplate from "./UITemplate";
import UIText from "./UIText";
import UIButton from "./UIButton";

// object
export type UIPageViewStruct = {
    col_cnt: number;
    row_cnt: number;
    row_height: number;
    col_width: number;
    item_create_func: CreateUITemplateFunc;
    max_page?: number;
    page_number_text?: UIText;
    one_time?: boolean;
    scroll_page_safe?: boolean;
    direction?: number;
};

export type UITileListStruct = {
    row_height: number;
    col_width: number;
    item_create_func: CreateUITemplateFunc;
    col_cnt?: number;
    row_cnt?: number;
    item_anim_type?: ItemAnimType;
    item_anim_delay_time?: number;
};

// Func
export type CreateUITemplateFunc = (config: any) => UITemplate;

export type OnRadioBaseClickCallbackFunc = (btn: UIButton) => boolean;

export type LoadMoreFunc = (have_more: boolean) => boolean;
