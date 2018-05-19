export default class GlobalConfig {
    public static getInstance(): GlobalConfig {
        return this._instance || (this._instance = new GlobalConfig());
    }

    private static _instance: GlobalConfig;

    private _frame_width: number;
    private _frame_height: number;
    private _res_absolute_path = "/res/";

    private constructor() {
    }

    set frame_width(width: number) {
        this._frame_width = width;
    }

    get frame_width() {
        return this._frame_width;
    }

    set frame_height(height: number) {
        this._frame_height = height;
    }

    get frame_height() {
        return this._frame_height;
    }

    set res_absolute_path(res_absolute_path: string) {
        this._res_absolute_path = res_absolute_path;
    }

    get res_absolute_path() {
        return this._res_absolute_path;
    }
}
