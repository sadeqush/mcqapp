import { AppBar, Toolbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Exam from "./Dashboard-exam";

function Dashboard() {
  const [toggleDrawer, setToggleDrawer] = useState(true);
  const toggleDrawerHandler = () =>
    toggleDrawer ? setToggleDrawer(false) : setToggleDrawer(true);
  // const toggleOpenDrawerHandler = () =>
  //   toggleDrawer ? setToggleDrawer(false) : null;

  console.log(toggleDrawer);

  let pushLeft;
  toggleDrawer ? (pushLeft = { left: "0rem" }) : (pushLeft = { left: "-100%" });

  return (
    <div className='Dashboard'>
      {/* Drawer *********************/}
      <div className='Dashboard-drawer' style={pushLeft}>
        <div>
          <button className='toggle-close' onClick={toggleDrawerHandler}>
            <i className='fa fa-times'></i>
            <span className='sr-only'>Close Drawer</span>
          </button>
          <div className='welcome'>
            <img
              className='user-avatar'
              src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
              alt='User Avatar'
            />

            <p>
              Welcome, <br />
              <span>Anonymous Student</span>
            </p>
          </div>
          <div className='tabs'>
            <i className='fa fa-user-circle'></i>
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
          <button className='toggle-menu' onClick={toggleDrawerHandler}>
            <i className='fa fa-bars'></i>
            <span className='sr-only'>Toggle Drawer Menu</span>
          </button>

          <div className='dashboard-content-form'>
            <input type='text' placeholder='Input Exam ID' />
            <button className='create-new'>
              <i className='fa fa-plus-square'></i>
              <span>New Exam</span>
            </button>
          </div>
        </div>

        {/* All the exams *********/}
        <div className='Dashboard-boards'>
          <Exam />
          <Exam />
          <Exam />
          <Exam />
          <Exam />
          <Exam />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

/*
1. fixed the drawer to the left with a width of 22.5rem/225px.
2. The Exam will come from Dashboard-exam.js which will get data from the api
*/
