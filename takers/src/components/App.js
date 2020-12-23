import './App.css';
import LeftPanel from './LeftPanel';
import ExamArea from './ExamArea';
import { Grid, Hidden } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

/*

props.exam_id = ID of the exam, passed on from index.js
*/


function App(props) {


  const [question, setQuestion] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);



  /*The function that does the fetching from the API */
  function getExam(examID) {

    var url = "https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/exams/" + examID + ".json";

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setQuestion(result);
          setIsLoaded(true);
        }
      )
  }

  useEffect(() => {
    getExam(props.exam_id);
  }, []);


  const appbar_style = {
    background: '#14213D',
    position: "fixed",
  }



  /*This variable has all the user answers */
  let userAnswers = {};

  function returnFromMcqQuestion(quesID, answer){
      userAnswers[quesID] = answer;
  }
  

  if (isLoaded) {

    return (

      <div className="App">

        <Grid container spacing={0} display="inline">

          <Grid item xs={12}>
            <AppBar style={appbar_style}>
              <Toolbar><b>ECO181 Homework 3</b>
                {/*CSS for the submit button is in App.css*/}
                <button onClick={() => console.log(userAnswers)} class="submit_button">Submit</button>
              </Toolbar>
            </AppBar>
          </Grid>


          <Grid item xs={4}>
            <LeftPanel questions={question} />
          </Grid>

          <Grid item xs={8}>
            <ExamArea questions={question} returnF={returnFromMcqQuestion}/>
          </Grid>

        </Grid>

      </div>
    );
  }

  /*This gets rendered when the fetch method is still getting the response from the API call */
  else {
    return (

      <div class="App loading">
        <CircularProgress></CircularProgress>
      </div>
    )
  }

}

export default App;
