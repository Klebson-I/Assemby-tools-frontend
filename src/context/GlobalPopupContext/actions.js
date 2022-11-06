export const ADD = 'ADD';

export const addToGlobalPopupState = (payload) => {
    return {
        type: ADD,
        payload:  {
            ...payload,
        },
    };
};