import React, {createContext, useContext, useReducer} from "react";
import {reducer} from "./reducer";

const filterContext = createContext();
const filterDispatchContext = createContext();


export const FilterContext = ({ children }) => {
    const [filterState, dispatchFilterState] = useReducer(reducer, {
        toolsFilter: [],
        actionFilter: [],
    });
    return <filterContext.Provider value={filterState}>
        <filterDispatchContext.Provider value={dispatchFilterState}>
            {children}
        </filterDispatchContext.Provider>
    </filterContext.Provider>
};

export const useFilterState = () => {
    const context = useContext(filterContext);
    if (!context) {
        throw new Error();
    }
    return context;
};

export const useFilterStateDispatch = () => {
    const context = useContext(filterDispatchContext);
    if (!context) {
        throw new Error();
    }
    return context;
}