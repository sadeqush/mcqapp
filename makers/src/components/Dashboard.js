import { AppBar, Toolbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className='Dashboard'>
      {/* Drawer *********************/}
      <div className='Dashboard-drawer'>
        <div>
          <div className='welcome'>
            <img
              className='user-avatar'
              src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
              alt='User Avatar'
            />

            <p>
              Welcome, <br />
              <span>Anonymous User</span>
            </p>
          </div>
          <div className='tabs'>
            <i class='fa fa-user-circle'></i>
            <span>Profile</span>
          </div>
          <div className='tabs active'>
            <i className='fa fa-book'></i>
            <span>Exams</span>
          </div>

          <div className='tabs'>
            <i className='fa fa-cog'></i>
            <span>Settings</span>
          </div>
        </div>

        <button className='logout'>Log out</button>
      </div>

      {/* Exam boards ******************/}
      <div className='Dashboard-content'>
        <div className='header'>
          <button>
            <i className='fa fa-plus-square'></i>
            <span>Create New Exam</span>
          </button>
        </div>

        {/* All the exams *********/}
        <div className='Dashboard-boards'>
          <div className='Dashboard-board'>
            <div className='board-content'>
              <h3>ECO 486: Homework Quiz 5</h3>
              <p>
                Created: <span>16 January, 2021</span>{" "}
              </p>
              <p>40 Multiple Choice Questions</p>
            </div>
            <div className='board-settings'>
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
          {/* single board/box ends */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

/*
<AppBar style={{ background: "#14213D", position: "fixed" }}>
        <Toolbar></Toolbar>
      </AppBar>

      <div className='Exam-card' position='fixed'></div>
      <div className='Exam-card' position='fixed'></div>
*/

/*
1. fixed the drawer to the left with a width of 20rem/200px.
2. 
*/
