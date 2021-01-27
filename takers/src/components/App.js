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
import Spinner from "./Spinner";
import Modal from "./Modal";

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

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () =>
    showModal ? setShowModal(false) : setShowModal(true);

  const [isLoaded, setIsLoaded] = useState(false);

  async function onLoadFunc(examID) {
    var exam = await getExam(examID);
    console.log(exam);
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
        {showModal && (
          <Modal close={toggleModal}>
            <h1>Are you sure?</h1>
            <button className='submit_button'>YESSSSSSSSSSSS</button>
          </Modal>
        )}

        <Grid container spacing={0} display='inline'>
          {/**Header  ***********/}
          <Grid item xs={12}>
            <header className='header'>
              <div className='container'>
                <p>
                  <i className='fa fa-book'></i>
                  <b>{property["title"]}</b>
                </p>

                <button onClick={toggleModal} class='submit_button'>
                  Submit Test
                </button>
              </div>
            </header>
          </Grid>

          {/**Old Left Panel */}
          <Grid item xs={0} md={4}>
            <LeftPanel />
          </Grid>

          <Grid item xs={12} md={8}>
            <div className='container'>
              <ExamArea />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    /*This gets rendered when the fetch method is still getting the response from the API call */
    return (
      <div class='App loading'>
        <Spinner />
      </div>
    );
  }
}

export default App;

/*
1. Replace AppBar with Header tag
2. Added Spinner

*/
