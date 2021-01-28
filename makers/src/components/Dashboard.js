import { AppBar, Toolbar } from "@material-ui/core";
import React, { useEffect, useState, useLayoutEffect } from "react";
import "./Dashboard.css";
import Exam from "./Dashboard-exam";
import ErrorPage from "./ErrorPage";
import Profile from "./Profile";
import { getIsLoggedIn, logout } from "./api";
import { useHistory } from "react-router-dom";

function Dashboard() {
  // Toggler
  const [toggleDrawer, setToggleDrawer] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [showContent, setShowContent] = useState("exams");

  const changeContentHandler = (newState) => {
    switch (newState) {
      case "exams":
        setShowContent("exams");
        break;
      case "profile":
        setShowContent("profile");
        break;

      default:
        setShowContent("exams");
        break;
    }
  };

  let history = useHistory();

  useEffect(onInnitialLoad, []);

  async function onInnitialLoad() {
    var isLoggedin = await getIsLoggedIn();

    //Get more information here.
    if (!isLoggedin) {
      setIsLoaded(false);
    }
  }

  async function LogoutButtonHandler() {
    var isLoggedOut = await logout();
    if (isLoggedOut) {
      history.push({
        pathname: "/",
        isLoggedIn: false,
      });
    }
  }

  const toggleDrawerHandler = () =>
    toggleDrawer ? setToggleDrawer(false) : setToggleDrawer(true);
  let pushLeft;
  toggleDrawer ? (pushLeft = { left: "0rem" }) : (pushLeft = { left: "-100%" });

  function createExamButtonOnClick() {
    history.push({
      pathname: "/exam_editor",
    });
  }

  let content;
  if (showContent === "exams") {
    content = (
      <div>
        <Exam
          title='ECO 486: Homework Quiz 5'
          created_date='16 January, 2021'
          nques={40}
        />
        <Exam />
        <Exam />
        <Exam />
      </div>
    );
  } else if (showContent === "profile") {
    content = <Profile />;
  }

  if (!isLoaded) {
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
                <span>Anonymous User</span>
              </p>
            </div>
            <div
              className={showContent === "profile" ? "tabs-active" : "tabs"}
              onClick={() => changeContentHandler("profile")}
            >
              <i className='fa fa-user-circle'></i>
              <span>Profile</span>
            </div>
            <div
              className={showContent === "exams" ? "tabs-active" : "tabs"}
              onClick={() => changeContentHandler("exams")}
            >
              <i className='fa fa-book'></i>
              <span>Exams</span>
            </div>

            <div className='tabs'>
              <i className='fa fa-cog'></i>
              <span>Settings</span>
            </div>
          </div>

          <button className='logout' onClick={() => LogoutButtonHandler()}>
            Log out
          </button>
        </div>

        {/* Exam boards ******************/}
        <div className='Dashboard-content'>
          <div className='header'>
            <button className='toggle-menu' onClick={toggleDrawerHandler}>
              <i className='fa fa-bars'></i>
              <span className='sr-only'>Toggle Drawer Menu</span>
            </button>

            <button
              className='create-new'
              onClick={(e) => createExamButtonOnClick()}
            >
              <i className='fa fa-plus-square'></i>
              <span>Create New Exam</span>
            </button>
          </div>

          {/* All the exams *********/}
          <div className='Dashboard-boards'>{content}</div>
        </div>
      </div>
    );
  } else {
    return <ErrorPage text="You're not logged in" />;
  }
}

export default Dashboard;

/*
1. fixed the drawer to the left with a width of 22.5rem/225px.
2. The Exam will come from Dashboard-exam.js which will get data from the api
*/
