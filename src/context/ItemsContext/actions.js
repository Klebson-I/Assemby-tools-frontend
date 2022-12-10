export const ADD = 'ADD';
export const RESET = 'RESET';

export const addToItemState = (payload) => {
    return {
        type: ADD,
        payload:  {
            ...payload,
        },
    };
};