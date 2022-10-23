import React, {createContext, useContext, useReducer} from "react";
import {reducer} from "./reducer";

const itemStateContext = createContext();
const itemStateDispatchContext = createContext();

export const ItemContext = ({ children }) => {
    const [itemState, dispatchItemState] = useReducer(reducer,{
        assemblyItems: [],
        turningHolderItems: [],
        cuttingInsertItems: [],
    });
    return <itemStateContext.Provider value={itemState}>
        <itemStateDispatchContext.Provider value={dispatchItemState}>
            { children }
        </itemStateDispatchContext.Provider>
    </itemStateContext.Provider>
}

export const useItemState = () => {
    const context = useContext(itemStateContext);
    if (!context) {
        throw new Error();
    }
    return context;
}

export const useItemStateDispatch = () => {
    const context = useContext(itemStateDispatchContext);
    if (!context) {
        throw new Error();
    }
    return context;
}