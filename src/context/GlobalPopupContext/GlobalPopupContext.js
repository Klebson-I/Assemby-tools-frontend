import React, {createContext, useContext, useReducer} from "react";
import {reducer} from "./reducer";

const globalPopupContext = createContext();
const globalPopupDispatchContext = createContext();

export const GlobalPopupContext = ({children}) => {
    const [state, dispatchState] = useReducer(reducer,{
        isOpen: false,
        component: {},
        styles: {},
    });
    return <globalPopupContext.Provider value={state}>
        <globalPopupDispatchContext.Provider value={dispatchState}>
            {children}
        </globalPopupDispatchContext.Provider>
    </globalPopupContext.Provider>
}

export const useGlobalPopupState = () => {
    const context = useContext(globalPopupContext);
    if(!context) {
        throw new Error();
    }
    return context;
};

export const useGlobalPopupDispatchState = () => {
    const context = useContext(globalPopupDispatchContext);
    if(!context) {
        throw new Error();
    }
    return context;
};

