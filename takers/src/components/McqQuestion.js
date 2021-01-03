import './McqQuestion.css'
import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

/*
This is the question object. It takes in the question and the answer choices and returns the question card with the question
and answers.

The props to be passed:
props.choices = string[] choices  which are the mcq choices.
props.question_text = string question_text which is the question.
props.question_id = ID of the question. It will be used to keep track of questions and answers.

To Do:
1. Figure out how to get the selected up to the parent components.
This was solved. OptionSelectedStatus right now has the letter stored.

*/


function McqQuestion(props) {

    const ADD_ANSWER = 'ADD_ANSWER';

    var dispatch = useDispatch();

    const [OptionSelectedStatus, setOptionSelectedStatus] = useState("");

    
    function updateAnswer(a) {

        dispatch(
            {
                "type" : ADD_ANSWER,
                "id" : props.question.id,
                "answer" : a
            }
        );

        setOptionSelectedStatus(a);

    }

    function mcqChoiceGeneratingFunc(choice, index) {

        var optionClassname = "Option-unselected";
        var selectorClassname = "selector-unselected";

        if (OptionSelectedStatus == String.fromCharCode(97 + index)) {
            optionClassname = "Option-selected";
            selectorClassname = "selector-selected";
        }

        return (

            <div onClick={() => updateAnswer(String.fromCharCode(97 + index))} class={optionClassname}>
                <b class={selectorClassname}>{String.fromCharCode(97 + index)}</b>
                <div class="answer-option-text">{choice}</div>
            </div>

        );
    }

    const choices = props.question.answer_choices;

    const mcqChoices = choices.map((choice, index) =>

        mcqChoiceGeneratingFunc(choice, index)

    );


    return (

        <Paper class="Question">
            <form class="Question-form">
                <div class="question-title">
                    <QuestionAnswerIcon style = {{color: "#FCA311", display: "inline-block"}}/>
                    <span class="question-title">{props.question.title}</span>
                </div>
                <div class="question-text">{props.question.question_text}</div>
                {mcqChoices}
            </form>
        </Paper>


    );

}

export default McqQuestion;