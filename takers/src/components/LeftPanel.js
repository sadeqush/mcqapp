import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


function LeftPanel(props) {

    var answers = useSelector(store => store.answers);
    var questions = useSelector(store => store.questions);


  function QuestionListGeneratingFunc(ques) {
    var quickviewElementclass = "answer_quickview_element_unanswered";
    if(ques.id in answers){quickviewElementclass = "answer_quickview_element_answered"}
    return(<div class={quickviewElementclass}> {ques.title}</div>);
}

let quesList = [];

for(var key in questions){
    quesList[quesList.length] = QuestionListGeneratingFunc(questions[key]);
  }



    return(
        <div class="leftPanel">
        <div class="answer_quickview" position="fixed">
          <h4 class="all_question">Multiple Choice Questions</h4>
          {quesList}
        </div>
      </div>
    );

}

export default LeftPanel;