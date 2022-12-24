import {createContext, useContext, useReducer} from "react";
import {reducer} from "./reducer";

const paramsFilterContext = createContext();
const paramsFilterDispatchContext = createContext();

export const ParamsFilterContext = ({children}) => {
    const [paramsFilterState, dispatchParamsFilterState] = useReducer(reducer, []);

    return <paramsFilterContext.Provider value={paramsFilterState}>
        <paramsFilterDispatchContext.Provider value={dispatchParamsFilterState}>
            {children}
        </paramsFilterDispatchContext.Provider>
    </paramsFilterContext.Provider>
};

export const useParamsFilterState = () => {
    const context = useContext(paramsFilterContext);
    if (!context) {
        throw new Error();
    }
    return context;
};

export const useParamsFilterStateDispatch = () => {
    const context = useContext(paramsFilterDispatchContext);
    if (!context) {
        throw new Error();
    }
    return context;
}