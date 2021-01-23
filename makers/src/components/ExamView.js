import "./ExamView.css";
import ExamArea from "./ExamArea";
import { Grid, Hidden } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useDispatch } from "react-redux";
import { SubmitTest, getExamID } from "./api";

const ADD_ID = "ADD_ID";

function ExamView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [examID, setExamID] = useState("");

  async function onInitialLoad() {
    var id = await getExamID();
    setExamID(id);
    dispatch(addExamIDAction(id));
    setIsLoaded(true);
  }

  useEffect(() => onInitialLoad(), []);

  const dispatch = useDispatch();

  function addExamIDAction(value) {
    return {
      type: ADD_ID,
      id: "examID",
      value: value,
    };
  }

  /**
   * Calls submittest from API.js
   * Adds a syntheic wait to make the user thing something is actually going on.
   */
  function Finished() {
    //SubmitTest();
  }

  if (isLoaded)
    return (
      <div class='App'>
        {/**Header  ***********/}
        <header className='header'>
          <div className='container'>
            <p>
              <i className='fa fa-book'></i>
              <b>{"Exam ID : " + examID}</b>
            </p>

            {/* Settings *****************/}
            <button className='settings_button'>
              <i className='fa fa-cog'></i>
              <span className='sr-only'></span>
            </button>

            <button onClick={() => Finished(3)} class='submit_button'>
              Publish Test
            </button>
          </div>
        </header>

        {/* Exam making area **************/}
        <div className='exams'>
          <div className='container'>
            <ExamArea />
          </div>
        </div>
      </div>
    );
  else return "Loading";
}

export default App;

/*
1. Removed LeftPanel
2. Replaced Appbar with header element
3. ExamArea will be inside a box which will have display:flex


*/
