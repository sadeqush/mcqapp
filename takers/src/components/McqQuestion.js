import './McqQuestion.css'
import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';

/*
This is the question object. It takes in the question and the answer choices and returns the question card with the question
and answers.

The props to be passed:
props.choices = string[] choices  which are the mcq choices.
props.question_text = string question_text which is the question.
props.question_id = ID of the question. It will be used to keep track of questions and answers.
props.returnfunc() = This gets filled with returnfunc(props.question_id, answer)

To Do:
1. Figure out how to get the selected up to the parent components.
This was solved. OptionSelectedStatus right now has the letter stored.

*/


function McqQuestion(props) {

    const [OptionSelectedStatus, setOptionSelectedStatus] = useState("");

    function mcqChoiceGeneratingFunc(choice, index) {

        var optionClassname = "Option-unselected";
        var selectorClassname = "selector-unselected";

        if (OptionSelectedStatus == String.fromCharCode(97 + index)) {
            optionClassname = "Option-selected";
            selectorClassname = "selector-selected";
        }

        return (

            <div onClick={() => setOptionSelectedStatus(String.fromCharCode(97 + index))} class={optionClassname}>
                <b class={selectorClassname}>{String.fromCharCode(97 + index)}</b>
                <div class="answer-option-text">{choice}</div>
            </div>

        );
    }

    const choices = props.choices;

    const mcqChoices = choices.map((choice, index) =>

        mcqChoiceGeneratingFunc(choice, index)

    );
    
    props.returnfunc(props.question_id, OptionSelectedStatus);


    return (

        <Paper class="Question">
            <form class="Question-form">
                <div class="question-text">{props.question_text}</div>
                {mcqChoices}
            </form>
        </Paper>


    );

}

export default McqQuestion;