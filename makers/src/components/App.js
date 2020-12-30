import './App.css';
import ExamArea from './ExamArea';
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import { useStore, useSelector } from 'react-redux';


function App() {

  const [finish, setFinish] = useState({});

  //This variable has all the questions.
  let Mquestion = useSelector(question => question);

  /**
   * @param finish
   * The function gets called on clicking Publish Text. This basically packs everything neatly for the API and eventually call
   * call the API to push everything to the website.
   */
  function finished(examid) {

    var setFinishToThis = {};
    var temp = {};
    temp['questions'] = {...Mquestion};
    temp['property'] = {"graded" : true};
    setFinishToThis["exam"+examid] = {...temp};
    setFinish(setFinishToThis);

    console.log(finish);

  }

  function QuestionListGeneratingFunc(ques) {
    var quickviewElementclass = "answer_quickview_element_answered";
    return(<li class={quickviewElementclass}> {ques.title}</li>);
}

var listQuestionLeftPanel = [];

Object.keys(Mquestion).forEach(
  function(key){
    listQuestionLeftPanel[listQuestionLeftPanel.length] = QuestionListGeneratingFunc(Mquestion[key]);
  });



    return (

      <div class="App">
        <Grid container spacing={0} display="inline">

          {/**Old Top Panel */}
          <Grid item xs={12}>
            <AppBar style={{background: '#14213D', position: "fixed"}}>
              <Toolbar><b>MAKERS</b>
                {/*CSS for the submit button is in App.css*/}
                <button onClick={() => finished(3)} class="submit_button">Publish Test</button>
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
            <ExamArea/>
          </Grid>

        </Grid>

      </div>
    );
  }


export default App;