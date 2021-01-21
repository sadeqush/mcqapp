import React, { useEffect, useState } from "react";
import "./Modal.css";

function Modal() {
  // Show modal on these conditions
  const [show, setShow] = useState(false);
  const toggleModalHandler = () => (!show ? setShow(true) : setShow(false));
  let transform;
  // IF show === true, hide modal, else display
  show
    ? (transform = { transform: "translateY(0%)" })
    : (transform = { transform: "translateY(-105%)" });

  return (
    <div>
      {/*Demo section   */}
      <div className='demo'>
        <button className='btn-demo' onClick={toggleModalHandler}>
          Toggle Modal
        </button>
      </div>

      {/* Main Modal **********/}
      <div className='backdrop' style={transform}>
        <div className='Modal'>
          <div className='Success'>
            <div className='btn-box'>
              <button onClick={toggleModalHandler}>
                <i className='fa fa-times'></i>
                <span>Close</span>
              </button>
            </div>
            <div className='content'>
              <i className='fa fa-check-circle icon'></i>
              <h2>SUCCESS</h2>
              <p>Congratulations! You've passed the exam!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

/*

1. Modal for success / Fail alert
2. Can be used for other components too
3. For Success use var(--green), for fail, var(--red)
4. Two Components need to build, Success & Fail
5. If animation for modal needed, use transition on .backdrop class
6. props will be added inside the content class

*/
