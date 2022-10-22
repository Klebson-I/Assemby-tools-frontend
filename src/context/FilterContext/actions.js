export const ADD = 'ADD';

export const addToFilterState = (payload) => {
    return {
        type: ADD,
        payload:  {
            ...payload,
        },
    };
};