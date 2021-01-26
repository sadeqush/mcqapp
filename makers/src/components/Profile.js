import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [toggleDrawer, setToggleDrawer] = useState(true);
  const toggleDrawerHandler = () =>
    toggleDrawer ? setToggleDrawer(false) : setToggleDrawer(true);

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
              <span>Anonymous Teacher</span>
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
        </div>
        {/* Profile */}
        <div className='profile '>
          <form className='profile-form'>
            <input type='text' disabled placeholder='Your Full Name' />
            <button type='submit' disabled className='profile-form-submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
