import React from "react";
import "./Dashboard-res-student.css";

const listElement = (props) => (
  <li>
    <p className='name'>{props.name}</p>
    <p className='score'> {props.score} </p>
  </li>
);

export default listElement;
