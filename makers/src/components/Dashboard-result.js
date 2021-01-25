import React, { useEffect, useState } from "react";
import "./Dashboard-result.css";

function DashboardResult() {
  return (
    <div className='Dashboard-result'>
      <div className='header'>
        <div className='left'>
          <h3>ECO 486: Homework Quiz 42</h3>
          <div className='labels'>
            <span>Published</span>
            <span>Drafted</span>
          </div>
        </div>
        <button className='edit-btn'>Edit Exam</button>
      </div>
      {/* Download section */}
      {/* The list */}
    </div>
  );
}

export default DashboardResult;

/*

<div className='top'>
        <div className='board-content'>
          <h3>ECO 486: Homework Quiz result</h3>
          <p>
            Created: <span>16 January, 2021</span>
          </p>
          <p>40 Multiple Choice Questions</p>
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
          Exam id: <span>NF453</span>
        </p>

        <button className='button edit'>
          <i className='fa fa-edit'></i>
          <span>Edit</span>
        </button>
        <button className='button'>
          <i className='fa fa-trash'></i>
          <span>Delete</span>
        </button>
      </div>




*/
