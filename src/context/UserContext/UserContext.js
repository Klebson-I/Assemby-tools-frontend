import React, {createContext, useContext, useReducer} from "react";
import {reducer} from "./reducer";

const userState = createContext();
const dispatchUserState = createContext();

export const UserContext = ({children}) => {
    const [userState, dispatchUserState] = useReducer(reducer,{
        userType: '',
        login: '',
        password: '',
    });
    return <userState.Provider value={userState}>
        <dispatchUserState.Provider value={dispatchUserState}>
            {children}
        </dispatchUserState.Provider>
    </userState.Provider>
}

export const useUserState = () => {
    const context = useContext(userState);
    if (!context) {
        throw new Error();
    }
    return context;
};

export const useUserStateDispatch = () => {
    const context = useContext(dispatchUserState);
    if (!context) {
        throw new Error();
    }
    return context;
}