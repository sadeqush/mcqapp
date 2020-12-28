import './McqQuestion.css'
import React, { useState, useEffect } from 'react';
import { Paper, TextField } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';



/*
This is the component that lets the maker create the question, and then stores the question to packedQuestion.
packedQuestipn is in a format which can be directly sent to the API to be uploaded to the database.
A basic question has question_text, question.title

Props passed:
props.id = The Question ID.
props.returnfunc = The function that gets called with packedQuestion and props.id when everything is done. 
                    props.returnfunc(props.id, packedQuestion) is the thing that is called.


Things to Do:
1. Send packedQuestion to returnFunction() somewhere in the code.
2. Design and style the input fields.
3. Figure out a way to pass the correct answers.

*/


function McqQuestion(props) {

    
    const [packedQuestion, setPackedQuestion] = useState({});
    useEffect(()=> props.returnfunc(props.id, packedQuestion));


    /*These two variables store a local copy of packedQuestion. These variables are first updated with the information from
    onChange (or a variation of it), and then packedQuestion is set to an instance of this. */

    let local_question_mcq = {};
    let local_answerChoices_mcq =  {};

    function fillUpQuestionWithDefault(){

        function addOption(character, value) {
            local_answerChoices_mcq[character] = value;
            local_question_mcq["answer_choices"] = local_answerChoices_mcq;
        }

        function addQuestion(title, value){

            if(title){
                local_question_mcq['title'] = value;
            }
            else {
                local_question_mcq['question_text'] = value;
            }

        }

        addQuestion(true, "Question "+props.id);
        addQuestion(false, "");

        addOption("a", "");
        addOption("b", "");
        addOption("c", "");
        addOption("d", "");

        local_question_mcq['title'] = "Question " + props.id;
        local_question_mcq['id'] = props.id;
        
        setPackedQuestion(local_question_mcq);

    }

    useEffect(() =>fillUpQuestionWithDefault(), []);


    function optionOnInputFunc(character, value) {
        local_question_mcq = {...packedQuestion};
        local_answerChoices_mcq = {...local_question_mcq["answer_choices"]};
        local_answerChoices_mcq[character] = value;
        local_question_mcq["answer_choices"] = local_answerChoices_mcq;
        
        setPackedQuestion(local_question_mcq);

    }

    function questionOnInputFunc(title, value) {

        if(title){
            local_question_mcq = {...packedQuestion};
            local_question_mcq['title'] = value;
            setPackedQuestion(local_question_mcq);
        }

        else {
            local_question_mcq = {...packedQuestion};
            local_question_mcq['question_text'] = value;
            setPackedQuestion(local_question_mcq);
        }
        
    }


    function mcqChoiceGeneratingFunc() {

        return (
            
            <div class = "Opt">
                <TextField onChange = {e => optionOnInputFunc('a', e.target.value)}  label="Option A" variant="filled" multiline rowsMax={4}/>
                <TextField onChange = {e => optionOnInputFunc('b', e.target.value)}  label="Option B" variant="filled" multiline rowsMax={4}/>
                <TextField onChange = {e => optionOnInputFunc('c', e.target.value)}  label="Option C" variant="filled" multiline rowsMax={4}/>
                <TextField onChange = {e => optionOnInputFunc('d', e.target.value)}  label="Option D" variant="filled" multiline rowsMax={4}/>
            </div>

        );
    }



    return (

        <Paper class="Question">
            <form class="Question-form">

                <a class = "editpencil">✎</a>
                <InputBase class = "questionedit"
                    onChange = {e => questionOnInputFunc(true, e.target.value)}
                    defaultValue={"Question "+props.id}
                    inputProps = {{"maxlength": 40}}/>
                

                <div class="question-text">
                    <TextField onChange = {e => questionOnInputFunc(false, e.target.value)} variant="outlined" fullWidth="true" label="Type your question"></TextField>
                </div>
                {mcqChoiceGeneratingFunc()}


            </form>
            
        </Paper>


    );

}

export default McqQuestion;