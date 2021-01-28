import React from "react";
import "./Profile.css";

const profile = () => (
  <div className='profile '>
    <form className='profile-form'>
      <input type='text' disabled placeholder='Your Full Name' />
      <button type='submit' disabled className='profile-form-submit'>
        Submit
      </button>
    </form>
  </div>
);

export default profile;
