import { FilterTypes } from "../constants.js"

export default {
    namespace: 'filter',
    state: {
        value: FilterTypes.ALL
    },
    reducers: {
        toggle(state, { payload: value }) {
            return {
                ...state,
                value: value
            }
        },
    }
};