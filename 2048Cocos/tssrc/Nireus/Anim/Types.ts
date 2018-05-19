export type CreateFrameAnimConfig = {
    name: string,
    scale?: number,
    loop?: boolean,
    delay?: number,
    type?: number
};

export type FrameAnimConfig = {
    name: string,
    delay: number,
    type: number
};

export type ResetFrameAnimConfig = {
    name: string,
    loop?: boolean
};
