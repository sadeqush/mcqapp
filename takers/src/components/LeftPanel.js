import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './LeftPanel.css'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

function LeftPanel(props) {

    var answers = useSelector(store => store.answers);
    var questions = useSelector(store => store.questions);


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
        <div class="leftPanel">
        <div class="leftpanel_quickview" position="fixed">
          <div class="leftPanel_heading">
              <span class="leftpanel_heading_element_selected">Assigned</span>
              <span class="leftpanel_heading_element">Results</span>
          </div>

          {quesList}

        </div>
      </div>
    );

}

export default LeftPanel;