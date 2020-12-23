import McqQuestion from './McqQuestion'
import React, { useState, useEffect } from 'react';
import './ExamArea.css'

/*
This is the file that pulls data from the API and renders questions on the screen.

The props to be passed:
props.questions = key value pair with all the questions.
props.returnF = Got from App.js passed on to McqQuestion.js, This will store the answers.

Things to do:

*/


function ExamArea(props) {
    
    
        var localQuestionArray = [];
        var posInArray = 0;

        for(var key in props.questions) {
            localQuestionArray[posInArray] = props.questions[key];
            posInArray++;
        }

        const mcqQuestionList = localQuestionArray.map((question) =>
        <McqQuestion returnfunc={props.returnF} question_id = {question.id} question_text={question.question_text} choices={question.answer_choices}/>
        );
        

        return (
            <div className="ExamArea">
                {mcqQuestionList}
            </div> 
        );
    

}

export default ExamArea;