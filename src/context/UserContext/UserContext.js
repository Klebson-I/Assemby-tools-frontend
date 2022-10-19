import React, {createContext, useContext, useReducer} from "react";
import {reducer} from "./reducer";

const userStateContext = createContext();
const dispatchUserStateContext = createContext();

export  const UserContext = ({children}) => {
    const [userState, dispatchUserState] = useReducer(reducer,{
        userType: '',
        login: '',
        password: '',
    });
    return <userStateContext.Provider value={userState}>
        <dispatchUserStateContext.Provider value={dispatchUserState}>
            {children}
        </dispatchUserStateContext.Provider>
    </userStateContext.Provider>
}

export const useUserState = () => {
     const context = useContext(userStateContext);
     if (!context) {
         throw new Error();
     }
     return context;
 };

 export const useUserStateDispatch = () => {
     const context = useContext(dispatchUserStateContext);
     if (!context) {
        throw new Error();
    }
     return context;
 }