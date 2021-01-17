import './App.css';
import ExamArea from './ExamArea';
import { Grid, Hidden } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch } from 'react-redux';
import LeftPanel from './LeftPanel'
import {SubmitTest} from "./api";

const ADD_ID = 'ADD_ID';

function App() {

  const[isLoaded, setIsLoaded] = useState(false);
  const[examID, setExamID] = useState("");


  async function onInitialLoad(){
    
    var id = "";
    var isAlright = false;

    //Generates an id, checks if it already exists in DB, and then assigns this Exam an ID.
    while(!isAlright){
      id = randomIDGenerator();
      var url = "https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/exams/" + id + ".json";

      await fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          if(result==null)
          isAlright = true;
        }
      )
    }

    var axiosObject = {};
    axiosObject[id] = "";

    //Reserve spot here.

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
  async function Finished() {
    SubmitTest();
  }

/**
 * Function generates unique Exam ID with 2 letters, followed by 4 numbers ie AB1234 or XC3223
 * Takes Date.now() as seed. Over 6.7 Million possible unique identifiers.
 * The output can be used as Exam key, but should never be used for authentication.
 * Reengineer this eventually.
 */
  function randomIDGenerator(){

    var retval = "";

    var seed = Date.now();
    seed = seed%87889091;

    //Generating a 8 digit number if its not 8 digits.
    while(seed<10000000){
      var random = Math.floor(Math.random() * 10) + 1;
      seed=seed*random;
    }

    //Seed's first two digits mod 26, added to retval
    var temp = Math.floor((seed / 1000000) % 100)
    retval = String.fromCharCode(65+Math.floor(temp%26));

    //Second two digits mod 26, added to retval
    temp = Math.floor((seed / 10000) % 100);
    retval = retval + String.fromCharCode(65+Math.floor(temp%26));

    //Adding last 4 digits to retval.
    temp = Math.floor(seed%10000);
    retval = retval + temp;

    return retval;
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