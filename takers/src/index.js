import React from "react";
import ReactDOM from "react-dom";
import "./components/index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./components/store";
import "font-awesome/css/font-awesome.min.css";

import LoginScreen from "./components/Dashboard";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <LoginScreen exam_id='LW6623' />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
