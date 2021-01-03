import './App.css';
import ExamArea from './ExamArea';
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LeftPanel from './LeftPanel';
import { useDispatch, useSelector } from 'react-redux';

/*

props.exam_id = ID of the exam, passed on from index.js
*/

const ADD_QUESTION = 'ADD_QUESTION';
const ADD_PROPERTY = 'ADD_PROPERTY';


function App(props) {

  const dispatch = useDispatch();

  var answers = useSelector(state=>state.answers);


  const [isLoaded, setIsLoaded] = useState(false);



  /*The function that does the fetching from the API */
  function getExam(examID) {

    var url = "https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/exams/" + examID + ".json";

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({'type' : ADD_PROPERTY, 'payload' : result.property});
          dispatch({'type' : ADD_QUESTION, 'payload' : result.questions});
          setIsLoaded(true);
        }
      )
  }

  useEffect(() => {
    getExam(props.exam_id);
  }, []);


  if (isLoaded) {

    return (

      <div className="App">
        <Grid container spacing={0} display="inline">


          {/**Old Top Panel */}
          <Grid item xs={12}>
            <AppBar style={{background: '#14213D', position: "fixed"}}>
              <Toolbar><b>ECO181 Homework 3</b>
                {/*CSS for the submit button is in App.css*/}
                <button onClick={() => console.log(answers)} class="submit_button">Submit</button>
              </Toolbar>
            </AppBar>
          </Grid>


         {/**Old Left Panel */}
          <Grid item xs={4} style={{overflowY: 'scroll'}}>
            <LeftPanel/>
          </Grid>


          <Grid item xs={8}>
            <ExamArea/>
          </Grid>

        </Grid>
      </div>
    );
  }

  /*This gets rendered when the fetch method is still getting the response from the API call */
  else {
    return (

      <div class="App loading">
        <CircularProgress style = {{color : "#FCA311"}}></CircularProgress>
      </div>
    )
  }

}

export default App;
