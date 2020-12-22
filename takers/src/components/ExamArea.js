import McqQuestion from './McqQuestion'
import React, { useState, useEffect } from 'react';
import './ExamArea.css'


/*
This is the file that pulls data from the API and renders questions on the screen.

The props to be passed:
props.exam_id = The unique ID of the exam that would be generated. This is being passed on from App.js right now.

Things to do:
1. Eventually do something with the question key that I get from the API JSON file.

*/


function ExamArea(props) {

    const [question, setQuestion] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);



    /*The function that does the fetching from the API */
    function getExam(examID){

        var url = "https://mcq-app-6cef8-default-rtdb.firebaseio.com/exams/"+examID+".json";
 
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                setQuestion(result);
                setIsLoaded(true);
            }
        )
    }
    
    useEffect(() => {
        getExam(props.exam_id);      
      }, []);
    
    
    if(isLoaded)   
    {
        var localQuestionArray = [];
        var posInArray = 0;

        /* This key here is the unique ID of the questions in the database. */
        for(var key in question) {
            localQuestionArray[posInArray] = question[key];
            posInArray++;
        }

        const mcqQuestionList = localQuestionArray.map((question) =>
        <McqQuestion question_text={question.question_text} choices={question.answer_choices}/>
        );
        
        return (
            <div>
                {mcqQuestionList}
            </div>
        );
    }

    /*This gets rendered when the fetch method is still getting the response from the API call */
    else {
        return (
            <div>
                Loading! This might take a few minutes!
            </div>
        )
    }

}

export default ExamArea;