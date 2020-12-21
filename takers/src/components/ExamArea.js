import McqQuestion from './McqQuestion'
import Card from '@material-ui/core/Card';
import './ExamArea.css'


/*
This is the class that will hold the exam area. Right now, the plan is to just render Mcqquestions in a loop with the
questions and the options choices from reading the database. Then the selected answer would be posted.
*/
function ExamArea() {
    
    return (
    <div>

            <McqQuestion/>
            <McqQuestion/>

    </div>

    );

}

export default ExamArea;