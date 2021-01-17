import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './LeftPanel.css'
import { List, Paper } from '@material-ui/core';


function LeftPanel() {

    var answers = useSelector(store => store.answers);
    var questions = useSelector(store => store.questions);

    const[selectedHeader, setSelectedHeader] = useState("question");


        /**
     * The function that gets called when  left panel headings are clicked. It changes out the app properties in store and renders
     * the required view.
     *  @param value String with the value for what panel to show.
     */
    function leftPanelHeadingOnClick(e) {
      setSelectedHeader(e.target.id);
  }

      /**
     * This returns the view that would be seen in the left panel based on what header option is selected.
     */
    function leftpanelview() {
      if(selectedHeader=="question") return(

      <List>{quesList}</List>

      );
      else return(
      <div>
      </div>
      );
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


  function QuestionListGeneratingFunc(ques, ques_id) {
    var quickviewElementclass = "answer_quickview_element_unanswered";
    if(ques_id in answers){quickviewElementclass = "answer_quickview_element_answered"}
    return(
    <div class={quickviewElementclass}>
        <span>{ques.title}</span>
    </div>
        );
}

let quesList = [];

for(var key in questions){
    quesList[quesList.length] = QuestionListGeneratingFunc(questions[key], key);
  }



    return(
        <Paper class="leftPanel" style={{overflowY: 'scroll'}}>
        <div class="leftpanel_quickview" position="fixed">
          <div class="leftPanel_heading">
            <span id="question" className={headerClassname("question")} onClick={(e)=>leftPanelHeadingOnClick(e)}>Questions</span>
              <span id="exam_options" className={headerClassname("exam_options")} onClick={(e)=>leftPanelHeadingOnClick(e)}>Results</span>
          </div>

          {leftpanelview()}

        </div>
      </Paper>
    );

}

export default LeftPanel;