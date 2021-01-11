import React, { useState } from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import './LeftPanel.css';
import { InputBase, TextField } from '@material-ui/core';

function LeftPanel() {

    const dispatch = useDispatch();

    const[selectedHeader, setSelectedHeader] = useState("question");
    /**
     * This returns the view that would be seen in the left panel based on what header option is selected.
     */
    function leftpanelview() {
        if(selectedHeader=="question") return(

        <List>{listQuestionLeftPanel}</List>

        );
        else return(
        <div>
            <InputBase className="leftpanel_title_changer" onChange={(e)=> titleOnChange(e.target.value)} placeholder="Exam Title" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "#d9d9d9"}}></InputBase>
        </div>
        );
    }

    function addTitleAction(target){
        return {
            type : "ADD_TITLE",
            id : "title",
            value : target
        }
    }

    function titleOnChange(value){
        dispatch(addTitleAction(value));
    }

    /**
     * The function that gets called when  left panel headings are clicked. It changes out the app properties in store and renders
     * the required view.
     *  @param value String with the value for what panel to show.
     */
    function leftPanelHeadingOnClick(e) {
        setSelectedHeader(e.target.id);
    }

    /**
     * Returns the appropriate classname for the element.
     * @param {String} event ID of the header element
     */
    function headerClassname(event){
        if(event==selectedHeader){
            return "leftpanel_heading_element_selected"
        }
        else {
            return "leftpanel_heading_element";
        }
    }
    

    function QuestionListGeneratingFunc(ques) {
        var quickviewElementclass = "answer_quickview_element_answered";
        return(<li class={quickviewElementclass}> {ques.title}</li>);
    }

    
    let Mquestion = useSelector(store => store.questions);
    var listQuestionLeftPanel = [];

    Object.keys(Mquestion).forEach(
        function(key){
        listQuestionLeftPanel[listQuestionLeftPanel.length] = QuestionListGeneratingFunc(Mquestion[key]);
    });

    return(
    <Paper class="leftPanel" style={{overflowY: 'scroll'}}>
        <div class="answer_quickview">
        <div class="leftPanel_heading">
              <span id="question" className={headerClassname("question")} onClick={(e)=>leftPanelHeadingOnClick(e)}>Questions</span>
              <span id="exam_options" className={headerClassname("exam_options")} onClick={(e)=>leftPanelHeadingOnClick(e)}>Exam Options</span>
        </div>
        {leftpanelview()}
        </div>
      </Paper>
    );
}

export default LeftPanel;