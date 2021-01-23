import React from "react";
import ReactDOM from "react-dom";
import "./components/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./components/store";
import "font-awesome/css/font-awesome.min.css";
import {firebaseInit} from './components/api'



import LoginPage from "./components/LoginPage";

import LoginPage from "./components/App";

//Test Imports
import TestComponent from "./components/testComponent";
var test = true;

if (test) {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <LoginPage></LoginPage>
      </React.StrictMode>
    </Provider>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App exam_id='exam0' />
      </React.StrictMode>
    </Provider>,
    document.getElementById("root")
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
