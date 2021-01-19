import './App.css';
import ExamArea from './ExamArea';
import { Grid, Hidden } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch } from 'react-redux';
import LeftPanel from './LeftPanel'
import {SubmitTest, getExamID} from "./api";

const ADD_ID = 'ADD_ID';

function App() {

  const[isLoaded, setIsLoaded] = useState(false);
  const[examID, setExamID] = useState("");


  async function onInitialLoad(){
    
    var id = await getExamID();
    setExamID(id);
    dispatch(addExamIDAction(id));
    setIsLoaded(true);

  }

  useEffect(()=>onInitialLoad(), []);

  const dispatch = useDispatch();

  function addExamIDAction(value) {

    return(
      {
        'type' : ADD_ID,
        'id' : "examID",
        'value' : value
      }
    )
    
  }


/**
 * Calls submittest from API.js
 * Adds a syntheic wait to make the user thing something is actually going on.
 */
  function Finished() {
    SubmitTest();
  }


    if(isLoaded) return (

      <div class="App">
        <Grid container spacing={0} display="inline">

          {/**Old Top Panel */}
          <Grid item xs={12}>
            <AppBar style={{background: '#14213D', position: "fixed"}}>
              <Toolbar>
                <b>
                {"Exam ID : " + examID}
                </b>
                {/*CSS for the submit button is in App.css*/}
                <button onClick={() => Finished(3)} class="submit_button">Publish Test</button>
              </Toolbar>
            </AppBar>
          </Grid>


         {/**Old Left Panel */}
          <Grid item xs={0} md={4}>
              <LeftPanel/>
          </Grid>


          <Grid item xs={12} md={8}>
            <ExamArea/>
          </Grid>

        </Grid>

      </div>
    );

    else return(
    "Loading"
    );
  }


export default App;