import './McqQuestion.css'
import React, { useState, useEffect, useContext } from 'react';
import { Paper, TextField } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch } from 'react-redux';

const ADD_QUESTION = 'ADD_QUESTION';

/*
This is the component that lets the maker create the question, and then stores the question to packedQuestion.
packedQuestipn is in a format which can be directly sent to the API to be uploaded to the database.
A basic question has question_text, question.title

Props passed:
props.id = The Question ID.

Things to Do:
1. [OBSOLETE] Send packedQuestion to returnFunction() somewhere in the code.
2. Design and style the input fields.
3. Figure out a way to pass the correct answers.

*/


function McqQuestion(props) {

    const [cn, setCn] = useState("Option-unselected");

    const dispatch = useDispatch();

    /**
     * This function is the action that gets passed to the Redux store.
     * @param {String} quesid Question ID in the form ques1, ques2, ques3 and onwards. Not an integer.
     * @param {Object} ques Packed question that gets stored directy into the store, ready for use later on.
     */
    function addQuestionAction(quesid, ques){

        var retval = {
            'type' : ADD_QUESTION,
            'id' : quesid,
            'question' : ques
        };

        return retval;
    }

    
    const [packedQuestion, setPackedQuestion] = useState({});


    /*These two variables store a local copy of packedQuestion. These variables are first updated with the information from
    onChange (or a variation of it), and then packedQuestion is set to an instance of this. */

    let local_question_mcq = {};
    let local_answerChoices_mcq =  {};

    function fillUpQuestionWithDefault(){

        function addOption(character, value) {
            local_answerChoices_mcq[character] = value;
            local_question_mcq["answer_choices"] = local_answerChoices_mcq;
        }

        /**
         * Function that packs Questions.
         * @param {Boolean} title Boolean isTitle. If the value is a title set to true. If it is question_text, set to false.
         * @param {String} value Value that would be sent to packed question.
         */
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
        dispatch(addQuestionAction("ques"+props.id, local_question_mcq));
    }

    useEffect(() =>fillUpQuestionWithDefault(), []);


    function optionOnInputFunc(character, value) {
        local_question_mcq = {...packedQuestion};
        local_answerChoices_mcq = {...local_question_mcq["answer_choices"]};
        local_answerChoices_mcq[character] = value;
        local_question_mcq["answer_choices"] = local_answerChoices_mcq;
        
        setPackedQuestion(local_question_mcq);
        dispatch(addQuestionAction("ques"+props.id, local_question_mcq));

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

        dispatch(addQuestionAction("ques"+props.id, local_question_mcq));
    }


    //Styling functions.
    function cngenerator(char){
        if(char==cn) return "Option-selected";
        else return "Option-unselected";
    }

    function selectorcnGenerator(char){
        if(char==cn) return "selector-selected";
        else return "selector-unselected";
    }


    function mcqChoiceGeneratingFunc() {

        return (
            
            <div class = "Opt">
        <InputBase startAdornment={<b class={selectorcnGenerator('a')}>a</b>} onChange = {e => optionOnInputFunc('a', e.target.value)} className={cngenerator('a')} onSelect={ () => setCn("a")} label="Option A"/>
        <InputBase startAdornment={<b class={selectorcnGenerator('b')}>b</b>} onChange = {e => optionOnInputFunc('b', e.target.value)} className={cngenerator('b')} onSelect={ () => setCn("b")} label="Option B"/>
        <InputBase startAdornment={<b class={selectorcnGenerator('c')}>c</b>} onChange = {e => optionOnInputFunc('c', e.target.value)} className={cngenerator('c')} onSelect={ () => setCn("c")} label="Option C"/>
        <InputBase startAdornment={<b class={selectorcnGenerator('d')}>d</b>} onChange = {e => optionOnInputFunc('d', e.target.value)} className={cngenerator('d')} onSelect={ () => setCn("d")} label="Option D"/>
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