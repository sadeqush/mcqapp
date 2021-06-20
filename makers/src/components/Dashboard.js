import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Exam from "./Dashboard-exam";
import ErrorPage from "./ErrorPage";
import Profile from "./Profile";
import Settings from "./Settings";
import { getIsLoggedIn, logout, getAllExamList } from "./api";
import { useHistory } from "react-router-dom";
import Spinner from "./Spinner";




function Dashboard() {
  const [toggleDrawer, setToggleDrawer] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showContent, setShowContent] = useState("exams");
  const [examList, setExamList] = useState([]);

  const changeContentHandler = (newState) => {
    switch (newState) {
      case "exams":
        setShowContent("exams");
        break;
      case "profile":
        setShowContent("profile");
        break;
      case "settings":
        setShowContent("settings");
        break;

      default:
        setShowContent("exams");
        break;
    }
  };



  let history = useHistory();




  useEffect( () => {
    async function onInnitialLoad() {

      var tempisLoggedin = await getIsLoggedIn();
      setIsLoggedIn(tempisLoggedin);

      if(tempisLoggedin) {
        var tempexamList = await getAllExamList();
        if(!tempexamList){
          setIsLoggedIn(false);
          setIsLoaded(true);
        }
        else{
          setExamList(tempexamList);
          setIsLoaded(true);}
       }

    }

 onInnitialLoad();
} , []); 




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
      {
      examList.map((idi) => (
        <Exam id={idi} examID={idi} />
      ))
      }
      </div>
    );
  } else if (showContent === "profile") {
    content = <Profile />;
  } else if (showContent === "settings") {
    content = <Settings />;
  }


  //This is returned if the user isLoggedIn and the view isLoaded.
  if(isLoaded && isLoggedIn){
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

            <div
              className={showContent === "settings" ? "tabs-active" : "tabs"}
              onClick={() => changeContentHandler("settings")}
            >
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
  }



//This is for the times when isLoaded is false.
  if(!isLoaded){
    return(
      //We would replace this with the loading screen
      <div>
      <Spinner className='spinner'/>
      </div>
    );
  }
  
  

 //This is returned if isLoaded, but not isLoggedin. 
  else {
    return <ErrorPage text="You're not logged in" />;
  }



}

export default Dashboard;