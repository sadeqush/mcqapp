import './App.css';
import ExamArea from './ExamArea';
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

/*

props.exam_id = ID of the exam, passed on from index.js
*/


function App(props) {


  const [question, setQuestion] = useState([]);
  const [answers, setanswers] = useState({});
  const [examProperties, setExamProperties] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);



  /*The function that does the fetching from the API */
  function getExam(examID) {

    var url = "https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/exams/" + examID + ".json";

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setQuestion(result.questions);
          setExamProperties(result.property);
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



  function returnFromMcqQuestion(quesID, answer) {
    var userAnswers = {};
    userAnswers = { ...answers };
    userAnswers[quesID] = answer;
    setanswers(userAnswers);
  }


  var localQuestionArray = [];
  var posInArray = 0;

  /* This key here is the unique ID of the questions in the database. */
  for(var key in question) {
      localQuestionArray[posInArray] = question[key];
      posInArray++;
  }

  function QuestionListGeneratingFunc(ques) {

    var quickviewElementclass = "answer_quickview_element_unanswered";
    if(ques.id in answers){quickviewElementclass = "answer_quickview_element_answered"}
    return(<div class={quickviewElementclass}> {ques.title}</div>);

}

  const listQuestionLeftPanel = localQuestionArray.map((lquestion) =>
  QuestionListGeneratingFunc(lquestion)
  );


  if (isLoaded) {

    return (

      <div className="App">

        <Grid container spacing={0} display="inline">


          {/**Old Top Panel */}
          <Grid item xs={12}>
            <AppBar style={appbar_style}>
              <Toolbar><b>ECO181 Homework 3</b>
                {/*CSS for the submit button is in App.css*/}
                <button onClick={() => console.log(answers)} class="submit_button">Submit</button>
              </Toolbar>
            </AppBar>
          </Grid>


         {/**Old Left Panel */}
          <Grid item xs={4}>
            <div class="leftPanel">
              <div class="answer_quickview">
                <h4 class="all_question">Multiple Choice Questions</h4>
                {listQuestionLeftPanel}
              </div>
            </div>
          </Grid>


          <Grid item xs={8}>
            <ExamArea questions={question} returnF={returnFromMcqQuestion} />
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
