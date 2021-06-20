import Dashboard from "./Dashboard";
import ExamView from "./ExamView";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./LoginScreen";
import ErrorPage from "./ErrorPage";

function App() {
  var routes = [
    <Router>
      <Switch>
        <Route exact path='/'>
          <LoginPage />
        </Route>
        <Route exact path='/dashboard'>
          <Dashboard />
        </Route>
        <Route exact path='/exam_editor'>
          <ExamView />
        </Route>
        <Route>
          <ErrorPage text="Error 404 : Page doesn't Exist" />
        </Route>
      </Switch>
    </Router>,
  ];

  return routes;
}

export default App;
