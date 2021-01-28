import McqQuestion from "./McqQuestion";
import React, { useState } from "react";
import "./ExamArea.css";
import { useDispatch } from "react-redux";

/*
This component generates McqQuestion components one after another, and gets them their ids. That is all.

The props to be passed:

Things to do:
1. Style out the whole thing.
2. Add a way to record the correct answer.
*/

const ADD_QUES_COUNT = "ADD_QUES_COUNT";

function ExamArea() {
  const [currentQuesID, setCurrentQuesID] = useState(2);
  const [mcqQuestionIDList, setmcqQuestionIDList] = useState([1]);

  function addAnotherQuestion() {
    setmcqQuestionIDList(mcqQuestionIDList.concat(currentQuesID));
    dispatch(addQuesIDAction(currentQuesID));
    setCurrentQuesID(currentQuesID + 1);
  }

  const dispatch = useDispatch();

  function addQuesIDAction(value) {
    return {
      type: ADD_QUES_COUNT,
      id: "ques_count",
      value: value,
    };
  }

  return (
    <div className='ExamArea'>
      {mcqQuestionIDList.map((idi) => (
        <McqQuestion id={idi} key={idi} />
      ))}
      <button
        onClick={() => addAnotherQuestion()}
        className='add_another_question_button'
      >
        + Add Another Question
      </button>
    </div>
  );
}

export default ExamArea;
