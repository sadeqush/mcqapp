import McqQuestion from './McqQuestion'
import React, { useState, useEffect } from 'react';
import './ExamArea.css'
import { useSelector } from 'react-redux';

/*
This is the file that pulls data from the API and renders questions on the screen.

Things to do:

*/


function ExamArea() {

        var question = useSelector(store => store.questions);

        let mcqQuestionList = [];
        for(var key in question) {
            mcqQuestionList[mcqQuestionList.length] = <McqQuestion question = {question[key]} question_id = {key}/>;
        }
        
        return (
            <div className="ExamArea">
                {mcqQuestionList}
            </div> 
        );
    

}

export default ExamArea;