import "./App.css";
import ExamArea from "./ExamArea";
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LeftPanel from "./LeftPanel";
import { useDispatch, useSelector } from "react-redux";
import { getExam } from "./api";

/*

props.exam_id = ID of the exam, passed on from index.js
*/

const ADD_QUESTION = "ADD_QUESTION";
const ADD_PROPERTY = "ADD_PROPERTY";

function App(props) {
  var property = useSelector((state) => state.property);

  const dispatch = useDispatch();

  setInterval(checkFocus, 200);

  function checkFocus() {
    if (document.hasFocus() == false) {
      //Do some checking and raise a red flag if this runs during an exam.
    }
  }

  const [isLoaded, setIsLoaded] = useState(false);

  async function onLoadFunc(examID) {
    var exam = await getExam(examID);
    dispatch({ type: ADD_PROPERTY, payload: exam.property });
    dispatch({ type: ADD_QUESTION, payload: exam.questions });
    setIsLoaded(true);
  }

  useEffect(() => {
    onLoadFunc(props.exam_id);
  }, []);

  if (isLoaded) {
    return (
      <div className='App' id='App'>
        <Grid container spacing={0} display='inline'>
          {/**Old Top Panel */}
          <Grid item xs={12}>
            <AppBar style={{ background: "#14213D", position: "fixed" }}>
              <Toolbar>
                <b>{property["title"]}</b>
                {/*CSS for the submit button is in App.css*/}
                <button
                  onClick={() => console.log("answers")}
                  class='submit_button'
                >
                  Submit
                </button>
              </Toolbar>
            </AppBar>
          </Grid>

          {/**Old Left Panel */}
          <Grid item xs={0} md={4}>
            <LeftPanel />
          </Grid>

          <Grid item xs={12} md={8}>
            <ExamArea />
          </Grid>
        </Grid>
      </div>
    );
  } else {

  /*This gets rendered when the fetch method is still getting the response from the API call */
    return (
      <div class='App loading'>
        <CircularProgress style={{ color: "#FCA311" }}></CircularProgress>
      </div>
    );
  }
}

export default App;
