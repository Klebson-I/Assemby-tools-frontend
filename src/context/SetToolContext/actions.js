export const RESET = 'RESET';
export const ADD = 'ADD';

export const addToSetToolState = (payload) => {
    return {
        type: ADD,
        payload:  {
            ...payload,
        },
    };
};

export const resetItemState = () => {
    return {
        type: RESET,
    }
}