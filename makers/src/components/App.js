import './App.css';
import ExamArea from './ExamArea';
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector } from 'react-redux';
import LeftPanel from './LeftPanel'


function App() {


  //This variable has all the questions.
  let fullstore = useSelector(store =>store);

  /**
   * @param finished
   * The function gets called on clicking Publish Questions. This packs everything neatly for the API and eventually call
   * call the API to push everything to the website.
   */
  function finished() {

    console.log(fullstore);

  }


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
              <LeftPanel/>
          </Grid>


          <Grid item xs={8}>
            <ExamArea/>
          </Grid>

        </Grid>

      </div>
    );
  }


export default App;