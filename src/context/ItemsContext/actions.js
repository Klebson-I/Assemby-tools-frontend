export const ADD = 'ADD';

export const addToItemState = (payload) => {
    return {
        type: ADD,
        payload:  {
            ...payload,
        },
    };
};