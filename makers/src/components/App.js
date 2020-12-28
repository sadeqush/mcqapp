import './App.css';
import ExamArea from './ExamArea';
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'

/*

props.exam_id = ID of the exam, passed on from index.js
*/


function App() {

  const [zquestion, setZQuestion] = useState([]);
  const [Mquestion, setMQuestion] = useState({});
  const [final, setFinal] = useState({});


  /**
   * @param finish
   * The function gets called on clicking Publish Text. This basically packs everything neatly for the API and eventually call
   * call the API to push everything to the website.
   */
  function finish() {

    var final_draft = {};
    var tempObj = {...Mquestion}
    final_draft['questions'] = tempObj;

    final_draft['property'] = {"graded" : true};

    setFinal(final_draft);

    console.log(final);

  }


  const appbar_style = {
    background: '#14213D',
    position: "fixed",
  }


  function returnFromMcqQuestion(quesID, thisQuestion) {
    /**This still needs to be implemented. */
  }

  var localQuestionArray = [];
  var posInArray = 0;

  /* This key here is the unique ID of the questions in the database. */
  for(var key in Mquestion) {
      localQuestionArray[posInArray] = Mquestion[key];
      posInArray++;
  }

  function QuestionListGeneratingFunc(ques) {

    var quickviewElementclass = "answer_quickview_element_answered";
    return(<li class={quickviewElementclass}> {ques.title}</li>);

}

  const listQuestionLeftPanel = localQuestionArray.map((lquestion) =>
  QuestionListGeneratingFunc(lquestion)
  );


    return (

      <div className="App">

        <Grid container spacing={0} display="inline">


          {/**Old Top Panel */}
          <Grid item xs={12}>
            <AppBar style={appbar_style}>
              <Toolbar><b>MAKERS</b>
                {/*CSS for the submit button is in App.css*/}
                <button onClick={() => finish()} class="submit_button">Publish Test</button>
              </Toolbar>
            </AppBar>
          </Grid>


         {/**Old Left Panel */}
          <Grid item xs={4}>
            <Paper class="leftPanel">
              <div class="answer_quickview">
                <h4 class="all_question">MCQ Test Options</h4>
                <List style={{maxHeight: '100%', overflow: 'auto'}} >{listQuestionLeftPanel}</List>
              </div>
            </Paper>
          </Grid>


          <Grid item xs={8}>
            <ExamArea returnF={returnFromMcqQuestion} />
          </Grid>

        </Grid>

      </div>
    );
  }



export default App;
