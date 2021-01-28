import React, { useEffect, useState } from "react";
import "./Dashboard-exam.css";
import {getExamProperty} from './api'

function DashboardExam(props) {
  // Display view more btn functionality
  const [viewMore, setViewMore] = useState(false);
  const [property, setProperty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const viewMoreHandler = () =>
    !viewMore ? setViewMore(true) : setViewMore(false);
  const viewMoreBtn = viewMore ? (
    <button className='btn-viewMore'>View result</button>
  ) : null;

  const copyValueHandler = () => console.log("Copy func");

  var examProperty =  getExamProperty(props.examID, setIsLoaded);

  while(!isLoaded){
    null(0);
  }

  setProperty(examProperty);


  return (
    <div className='Dashboard-board'>
      <div className='top'>
        <div className='board-content'>
          <h3>{property.title}</h3>
          <p>
            Created: <span>{property.creation_time}</span>
          </p>
          <p>{property.ques_count} Multiple Choice Questions</p>
        </div>
        <div className='dots' onClick={viewMoreHandler}>
          <i className='fa fa-ellipsis-h'>
            <span className='sr-only'>Click to view result</span>
          </i>
          {viewMoreBtn}
        </div>
      </div>
      <div className='board-settings'>
        <p className='exam-id' onClick={copyValueHandler}>
          Exam id: <span>{property.examID}</span>
        </p>

        <div className='board-settings-right'>
          <button className='button edit'>
            <i className='fa fa-edit'></i>
            <span>Edit</span>
          </button>
          <button className='button'>
            <i className='fa fa-trash'></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
  {
    /* single board/box ends */
  }
}

export default DashboardExam;

/*
<AppBar style={{ background: "#14213D", position: "fixed" }}>
        <Toolbar></Toolbar>
      </AppBar>

      <div className='Exam-card' position='fixed'></div>
      <div className='Exam-card' position='fixed'></div>

*/

/*
1. Single Exam 
2. All the data will be parsed from the api
*/
