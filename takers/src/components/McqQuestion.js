import './McqQuestion.css'
import McqAnswerOption from './McqAnswerOption'
import React, { useState } from 'react';

/*
I can not see what option is selected right now.
This is the question object. We generate McqAnswerOption which requires props.choice a/b/c/d and props.selected boolean.
Onclick, we would change props.selected to true and McqAnswerOptions should do the rest

To Do:
1. Figure out how to get the selected answer out.
2. Pull the MCQAnswerOption choices dynamically.
3. Pull the answer choices from props.

*/
function McqQuestion(){

    const [OptionSelectedStatus, setOptionSelectedStatus] = useState("");


    return(

        <div class="Question">
            <div class ="question-text">Imagine there is a serious question typed in here. To be or not to be that is the question?</div>
            <McqAnswerOption choice="a" text="Answer choice" selected={OptionSelectedStatus=="a"} />
            <McqAnswerOption choice="b" text="Answer choice" selected={OptionSelectedStatus=="b"} />
            <McqAnswerOption choice="c" text="Answer choice" selected={OptionSelectedStatus=="c"} />
            <McqAnswerOption choice="d" text="Answer choice" selected={OptionSelectedStatus=="d"} />
        </div>


    );

}

export default McqQuestion;