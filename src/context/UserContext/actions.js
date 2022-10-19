export const ADD = 'ADD';

export const addToUserState = (payload) => {
    return {
        type: ADD,
        payload:  {
            ...payload,
        },
    };
};