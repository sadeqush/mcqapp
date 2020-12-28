import McqQuestion from './McqQuestion'
import React, { useState, useEffect } from 'react';
import './ExamArea.css'

/*

This is just a connection between App.js and McqQuestions. This component generates McqQuestion componenets and that is about it.
It gives a unique ID and passes on the return function that it got from App.js down to McqQuestion.

The props to be passed:
props.returnF = Got from App.js passed on to McqQuestion.js, This will store the answers.

Things to do:
1. Style out the whole thing.
2. Add a way to record the correct answer.
*/


function ExamArea(props) {

    const[currentQuesID, setCurrentQuesID] = useState(2);
    const[mcqQuestionList, setmcqQuestionList] = useState([<McqQuestion returnfunc={returnFromMcqQuestion} id={1}/>]);
    const[ques, setQues] = useState({});


    function returnFromMcqQuestion(quesID, thisQuestion) {
        var temp = {...ques};
        temp["ques"+quesID] = thisQuestion;
        console.log(temp);

        setQues(temp);
      }

    function generateMCQ(questionid) {
        return (<McqQuestion returnfunc={returnFromMcqQuestion} id={questionid}/>)
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