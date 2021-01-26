import React from "react";
import "./Spinner.css";

const spinner = () => {
  return (
    <div className='Spinner'>
      <div class='lds-ripple'>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default spinner;
