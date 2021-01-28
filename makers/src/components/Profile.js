import React from "react";
import "./Profile.css";

const profile = () => (
  <div className='profile '>
    <form className='profile-form'>
      <div className='input-box'>
        <i className='fa fa-user'></i>
        <input type='text' placeholder='Your Full Name' disabled />
      </div>

      <button type='submit' disabled className='profile-form-submit'>
        Submit Changes
      </button>
    </form>
  </div>
);

export default profile;
