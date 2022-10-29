import React, {createContext, useContext, useReducer} from "react";
import {reducer} from "./reducer";

const setToolStateContext = createContext();
const setToolStateDispatchContext = createContext();

export const SetToolContext = ({children}) => {
    const [setToolState, dispatchSetToolState] = useReducer(reducer, {});

    return <setToolStateContext.Provider value={setToolState}>
        <setToolStateDispatchContext.Provider value={dispatchSetToolState}>
            {children}
        </setToolStateDispatchContext.Provider>
    </setToolStateContext.Provider>
};

export const useSetToolState = () => {
    const context = useContext(setToolStateContext);
    if (!context) {
        throw new Error();
    }
    return context;
};

export const useSetToolStateDispatch = () => {
    const context = useContext(setToolStateDispatchContext);
    if (!context) {
        throw new Error();
    }
    return context;
}