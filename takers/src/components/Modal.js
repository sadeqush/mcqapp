import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = (props) => (
  <div className='backdrop'>
    <div className='Modal'>
      <div className='Success'>
        <div className='btn-box'>
          <button onClick={props.close}>
            <i className='fa fa-times'></i>
            <span>Close</span>
          </button>
        </div>
        <div className='content'>{props.children}</div>
      </div>
    </div>
  </div>
);

export default Modal;

/*

1. Modal for anything
2. Call it from any component 
3. No need to touch this file

Sample for using it on any component 
------------------------------------
1. set state
const [showModal, setShowModal] = useState(false);
  const toggleModal = () =>
    showModal ? setShowModal(false) : setShowModal(true);

2. Keep this anywhere you return & change the inside element on your wish

{showModal && (
  <Modal close={toggleModal}>
    <h1>Are you sure?</h1>
    <button className='submit_button'>YESSSSSSSSSSSS</button>
  </Modal>
)}

*/
