import { Paper } from '@material-ui/core';
import {Editor, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from 'react';
import React from 'react';
import './QuestionEditor.css'


/**
 * Returns a question Editor, with all the necessary things.
 * 
 * props.editorState
 * props.onChange
 * props.onFocus
 * props.onBlur
 */
export default function QuestionEditor(props){

    const [toggleBold, setToggleBold] = useState(false);
    const [toggleUnderline, setToggleUnderline] = useState(false);
    const [toggleItalic, setToggleItalic] = useState(false);


    function handleRichUtils(style){
        
        var newState;
        switch(style){
            case 'BOLD':
                newState = RichUtils.toggleInlineStyle(props.editorState, 'BOLD');
        }
        if(newState) props.onChange(newState);
        
    }

    function generateBlockStyle(){

    }
            

    /**
     * Function that handles command like ctrl+b to bold and ctrl+u to underline and the likes.
     */
    function handleKeyCommand(command, editorState){
        const newState = RichUtils.handleKeyCommand(editorState, command);

        console.log(newState);

        if (newState){
            props.onChange(newState);
        }
        else {
            console.log("Nothing to run that command on.")
        }

    }

    function onClickBold(e){
        if(toggleBold){
            e.target.className="inlinebutton";
            setToggleBold(false);
        }
        else{
            e.target.className="inlinebutton_active";
            setToggleBold(true);
        }
        
    }

    function onClickUnderline(e){
        if(toggleUnderline){
            e.target.className="inlinebutton";
            setToggleUnderline(false);
        }
        else{
            e.target.className="inlinebutton_active";
            setToggleUnderline(true);
        }
    }

    function onClickItalic(e){
        if(toggleUnderline){
            e.target.className="inlinebutton";
            setToggleUnderline(false);
        }
        else{
            e.target.className="inlinebutton_active";
            setToggleUnderline(true);
        }
    }

    return (
        <React.Fragment>
            <div
                    onFocus={() => props.onFocus("question-text-selected")} 
                    onBlur={() => props.onBlur("question-text")}>
                        <div className='btns'>
                            <span className="inlinebutton" onClick={(e)=>onClickBold(e)}>Bold</span>
                            <span className="inlinebutton" onClick={(e)=>onClickUnderline(e)}>Underline</span>
                            <span className="inlinebutton" onClick={(e)=>onClickItalic(e)}>Italic</span>
                        </div>
                <Editor placeholder="Add details to your Question"
                handleKeyCommand={handleKeyCommand} 
                editorState={props.editorState} 
                onChange={props.onChange}>
                </Editor>

            </div>
        </React.Fragment>
    );
}