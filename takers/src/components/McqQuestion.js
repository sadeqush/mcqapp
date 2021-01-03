import './McqQuestion.css'
import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

/*
This is the question object. It takes in the question and returns the question card with the question
and answers.

The props to be passed:
props.question = Question object, packed properly.

To Do:


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

    /**
     * Generates the answer "component", with the proper className.
     * @param {String} choice The text for the answer choice
     * @param {char} index One of a/b/c/d 
     */
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
                    <span class="question-title-text">{props.question.title}</span>
                </div>
                <div class="question-text">{props.question.question_text}</div>
                {mcqChoices}
            </form>
        </Paper>


    );

}

export default McqQuestion;