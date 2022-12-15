import {ADD, RESET} from './actions';

export const reducer = (state, {type, payload}) => {
    switch (type) {
        case ADD : return {
            ...state,
            ...payload,
        };
        case RESET : return {};
        default: return {};
    };
}