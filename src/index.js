import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {UserContext} from "./context/UserContext/UserContext";
import {Login} from "./Pages/Login";
import {FilterContext} from "./context/FilterContext/FilterContext";
import {ItemContext} from "./context/ItemsContext/ItemContext";
import {SingleToolView} from "./Pages/SingleToolView";
import {SetToolContext} from "./context/SetToolContext/SetToolContext";
import {GlobalPopupContext} from "./context/GlobalPopupContext/GlobalPopupContext";
import {UserAccount} from "./Pages/UserAccount";
import {InfoPopupContext} from "./context/InfoContext/InfoContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <UserContext>
              <FilterContext>
                  <ItemContext>
                      <GlobalPopupContext>
                          <SetToolContext>
                              <InfoPopupContext>
                                  <Routes>
                                      <Route path={'/'} element={<Navigate to='/app'/>}/>
                                      <Route path='/login' element={<Login/>}/>
                                      <Route path='/app' element={<App/>}/>
                                      <Route path='/app/singletool/:type/:id' element={<SingleToolView/>}/>
                                      <Route path='/app/userAccount/' element={<UserAccount/>}/>
                                  </Routes>
                              </InfoPopupContext>
                          </SetToolContext>
                      </GlobalPopupContext>
                  </ItemContext>
              </FilterContext>
          </UserContext>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
