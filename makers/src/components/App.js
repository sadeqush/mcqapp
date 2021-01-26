import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./App.css";
import { checkSessionToken, login } from "./api";

import Login from "./LoginPage";
import Dashboard from "./Dashboard";
import ExamView from "./ExamView";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPage from "./LoginPage";

function App(props) {
  var dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  var cookie = new Cookies();

  async function onInitialLoad() {
    //Checking if session_token in cookie is valid.
    if (cookie.session_token) {
      var validToken = await checkSessionToken(cookie.session_token);
      if (validToken) {
        var action = {
          type: "ADD_SESSION_TOKEN",
          value: cookie.session_token,
        };

        dispatch(action);
      }
      setIsLoggedIn(validToken);
    }
  }

  useEffect(() => onInitialLoad(), []);

  var routes = [
    <Router>
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/exam_editor'>
        <ExamView />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
    </Router>,
  ];

  if (isLoggedIn) {
    return (
      <span>
        Logged In!
        {routes}
      </span>
    );
  } else {
    return (
      <div>
        {/* <Login /> */}
        {routes}
      </div>
    );
  }
}

export default App;
