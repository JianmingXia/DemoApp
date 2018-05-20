const CARD_ROW_NUM = 4;
const INITIAL_CARD_NUMBER = 2;
const CARD_BORDER_WIDTH = 15;
const NUMBER_TWO_PERCENT = 80;

type CardIndex = {
    x: number,
    y: number
};

const enum Direction {
    UP = 0,
    DOWN = 1,
    LEFT = 2,
    RIGHT = 3
}

export { CARD_ROW_NUM, INITIAL_CARD_NUMBER, CardIndex, NUMBER_TWO_PERCENT, CARD_BORDER_WIDTH, Direction };
