import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter, redirect} from "react-router-dom";
import {Login} from "./Pages/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));

const rootLoader = () => {
    return redirect('/login');
}

const router = createBrowserRouter([
    {
        path: '/',
        loader: rootLoader,
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/app',
        element: <App/>
    }
])
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
