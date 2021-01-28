import "./ExamView.css";
import ExamArea from "./ExamArea";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SubmitTest, getExamID } from "./api";
import Spinner from "./Spinner";
import { useHistory } from "react-router-dom";

const ADD_ID = "ADD_ID";
const ADD_CREATION_TIME = "ADD_CREATION_TIME";

function ExamView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [examID, setExamID] = useState("");

  var history = useHistory();

  async function onInitialLoad() {
    var id = await getExamID();
    setExamID(id);
    dispatch(addExamIDAction(id));
    dispatch(addExamCreationTime(Date.now()));
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

  function addExamCreationTime(value) {
    return {
      type: ADD_CREATION_TIME,
      id: "creation_time",
      value: value,
    };
  }

  /**
   * Calls submittest from API.js
   * Adds a syntheic wait to make the user thing something is actually going on.
   */
  async function Finished() {
    //Show the modal
    var submitsuccess = await SubmitTest();
    console.log(submitsuccess, "SubmitSucecss");
    if (submitsuccess) {
      history.push("/dashboard", {});
    } else {
    }
  }
  console.log(history);

  if (isLoaded)
    return (
      <div className='App'>
        {/**Header  ***********/}
        <header className='header'>
          <div className='container'>
            <div className='back_button_wrapper'>
              <button className='back_button' onClick={() => history.goBack()}>
                <i className='fa fa-chevron-circle-left'></i>
                <span className='sr-only'>Go Back</span>
              </button>
            </div>
            <p>
              <i className='fa fa-book'></i>
              <b>{"Exam ID : " + examID}</b>
            </p>

            {/* Settings *****************/}
            <button className='settings_button'>
              <i className='fa fa-cog'></i>
              <span className='settings_button_text'>Settings</span>
            </button>

            <button onClick={() => Finished(3)} className='submit_button'>
              <i className='fa fa-paper-plane'></i>
              <span>Publish </span>
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
  else
    return (
      <div className='spinner-wrapper'>
        <Spinner />
      </div>
    );
}

export default ExamView;

/*
1. Removed LeftPanel
2. Replaced Appbar with header element


*/
