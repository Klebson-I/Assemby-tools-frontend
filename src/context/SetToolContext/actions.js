export const ADD = 'ADD';

export const addToSetToolState = (payload) => {
    return {
        type: ADD,
        payload:  {
            ...payload,
        },
    };
};