import { AppBar, Toolbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Dashboard-exam.css";

function DashboardExam() {
  const viewAnswer = () => console.log("view Answer");

  return (
    <div className='Dashboard-board'>
      <div className='top'>
        <div className='board-content'>
          <h3>ECO 486: Homework Quiz 5</h3>
          <p>
            Created: <span>16 January, 2021</span>
          </p>
          <p>40 Multiple Choice Questions</p>
        </div>
        {/* Right side */}
        <p className='answer-status'>
          <i className='fa fa-circle'></i>
          <span>38/40</span>
        </p>
      </div>

      <div className='board-settings'>
        <button className='button' onClick={viewAnswer}>
          <i className='fa fa-trash'></i>
          <span>View Answers</span>
        </button>
      </div>
    </div>
  );
  {
    /* single board/box ends */
  }
}

export default DashboardExam;
