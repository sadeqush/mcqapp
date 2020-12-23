import './LeftPanel.css';

function LeftPanel(props) {

    var quickviewElementclass = "answer_quickview_element_unselected";
    

    var localQuestionArray = [];
    var posInArray = 0;

    /* This key here is the unique ID of the questions in the database. */
    for(var key in props.questions) {
        localQuestionArray[posInArray] = props.questions[key];
        posInArray++;
    }

    /*Eventually change this to question.title from   question.question_text */
    const listBeingDisplayed = localQuestionArray.map((question) =>
        <div class={quickviewElementclass}> {question.question_text}</div>
    );

    
    return (

        <div class="leftPanel">

            <div class="answer_quickview">

                <h4 class="all_question">Multiple Choice Questions</h4>

                {listBeingDisplayed}


            </div>
        </div>

    );

}

export default LeftPanel;