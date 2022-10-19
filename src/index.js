import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserContext} from "./context/UserContext/UserContext";
import {Login} from "./Pages/Login";
import {AppHeader} from "./Components/AppHeader/AppHeader";
import {ActionSelectContainer} from "./Components/ActionSelectContainer/ActionSelectContainer";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <UserContext>
              <Routes>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/app' element={<App/>}/>
              </Routes>
          </UserContext>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
