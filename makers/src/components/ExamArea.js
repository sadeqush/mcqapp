import McqQuestion from './McqQuestion'
import React, { useState, useEffect } from 'react';
import './ExamArea.css'

/*
This component generates McqQuestion components one after another, and gets them their ids. That is all.

The props to be passed:

Things to do:
1. Style out the whole thing.
2. Add a way to record the correct answer.

*/


function ExamArea() {

    const[currentQuesID, setCurrentQuesID] = useState(2);
    const[mcqQuestionList, setmcqQuestionList] = useState([<McqQuestion id={1}/>]);



    function generateMCQ(questionid) {
        return (<McqQuestion id={questionid}/>)
    }


    function addAnotherQuestion() {
        setmcqQuestionList(mcqQuestionList.concat(generateMCQ(currentQuesID)));
        setCurrentQuesID(currentQuesID+1);
     }
        

    return (

        <div className="ExamArea">
            {mcqQuestionList}
            <button onClick={()=>addAnotherQuestion()} class="add_another_question_button">+ Add Another Question</button>
        </div> 

        );
    

}

export default ExamArea;