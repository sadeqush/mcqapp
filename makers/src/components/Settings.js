import React from "react";
import "./Settings.css";

const settings = () => (
  <div className='settings '>
    <form className='settings-form'>
      <div className='input-box'>
        <i className='fa fa-user'></i>
        <input type='text' placeholder='Your Updated Name' disabled />
      </div>

      <div className='input-box'>
        <i className='fa fa-envelope'></i>
        <input type='email' placeholder='Your New Email' disabled />
      </div>

      <div className='input-box'>
        <i className='fa fa-lock'></i>
        <input type='text' placeholder='Your New Password' disabled />
      </div>

      <button type='submit' disabled className='settings-form-submit'>
        Submit Changes
      </button>
    </form>
  </div>
);

export default settings;
