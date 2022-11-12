import React, {createContext, useContext, useReducer} from "react";
import {reducer} from "./reducer";

const infoPopupContext = createContext();
const infoPopupDispatchContext = createContext();

export const InfoPopupContext = ({children}) => {
    const [state, dispatchState] = useReducer(reducer,{
        text: '',
        severity: '',
        isOpen: false,
    });
    return <infoPopupContext.Provider value={state}>
        <infoPopupDispatchContext.Provider value={dispatchState}>
            {children}
        </infoPopupDispatchContext.Provider>
    </infoPopupContext.Provider>
}

export const useInfoPopupState = () => {
    const context = useContext(infoPopupContext);
    if(!context) {
        throw new Error();
    }
    return context;
};

export const useInfoPopupDispatchState = () => {
    const context = useContext(infoPopupDispatchContext);
    if(!context) {
        throw new Error();
    }
    return context;
};

