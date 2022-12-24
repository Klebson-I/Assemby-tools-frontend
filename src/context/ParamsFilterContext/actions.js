export const RESET = 'RESET';
export const ADD = 'ADD';

export const addToParamFilterState = (payload) => {
    return {
        type: ADD,
        payload,
    };
};

export const resetParamFilterState = () => {
    return {
        type: RESET,
    }
}
