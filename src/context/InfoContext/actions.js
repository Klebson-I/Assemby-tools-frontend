export const ADD = 'ADD';

export const addToInfoPopupState = (payload) => {
    return {
        type: ADD,
        payload:  {
            ...payload,
        },
    };
};