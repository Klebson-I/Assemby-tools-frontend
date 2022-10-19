import {ADD} from "./actions";

export const reducer = (state, {type, payload}) => {
    switch (type) {
        case ADD : return {
            ...state,
            ...payload,
        };
        default: return {};
    };
};