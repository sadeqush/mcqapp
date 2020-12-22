import './McqQuestion.css'
import McqAnswerOption from './McqAnswerOption'
import React, { useState } from 'react';

/*
This is the question object. It takes in the question and the answer choices and returns the question card with the question
and answers.

The props to be passed:
props.choices = string[] choices  which are the mcq choices.
props.question_text = string question_text which is the question.
props.selected = char/string selected

To Do:
1. Figure out how to get the selected up to the parent components.
This was solved. OptionSelectedStatus right now has the letter stored.

*/


function McqQuestion(props){

    const [OptionSelectedStatus, setOptionSelectedStatus] = useState(props.selected);

    const choices = props.choices;

    
    const mcqChoices = choices.map((choice, index) =>
    <McqAnswerOption onClick={() => setOptionSelectedStatus(String.fromCharCode(97 + index))} choice={String.fromCharCode(97 + index)} text={choice} selected={OptionSelectedStatus==String.fromCharCode(97 + index)} />
    );
    

    return(

        <form class="Question">
            <div class ="question-text">{props.question_text}</div>
            {mcqChoices}
        </form>


    );

}

export default McqQuestion;