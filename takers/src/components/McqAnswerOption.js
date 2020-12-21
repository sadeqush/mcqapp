import './McqAnswerOption.css'


/*
McqAnswerOptions are the options a/b/c/d. This requires boolean props.selected to render the selected version of McqAnswerOption
and props.choice which contains a/b/c/d, and props.text, which is the text.
*/

function McqAnswerOption(props) {

    var optionClassname = "Option-unselected";
    var selectorClassname = "selector-unselected";

    if (props.selected) {
        optionClassname = "Option-selected";
        selectorClassname = "selector-selected";
    }
    
    return (
        
        <div class = {optionClassname}>
           <b class ={selectorClassname}>{props.choice}</b>
           <div class ="answer-option-text">{props.text}</div>

        </div>

    );

}

export default McqAnswerOption;