import { createStore, combineReducers } from 'redux'

const ADD_QUESTION = 'ADD_QUESTION';
const ADD_ANSWER = 'ADD_ANSWER';
const ADD_TITLE  = 'ADD_TITLE';
const ADD_ID = 'ADD_ID';

function addQuestionReducer(state = {}, action){

    var retval = {...state};

    switch(action.type){

        case ADD_QUESTION:
            retval[action.id] = action.question;
            return retval;
        default:
            return retval;
    }
}

function addAnswerReducer(state = {}, action){

    var retval = {...state};

    switch(action.type){

        case ADD_ANSWER:
            retval[action.id] = action.answer;
            return retval;
        default:
            return retval;
    }
}

function addPropertyReducer(state = {}, action){

    var retval = {...state};

    switch(action.type) {

        case ADD_TITLE:
            retval[action.id] = action.value;
            return retval;
        case ADD_ID:
            retval[action.id] = action.value;
            return retval;
        default:
            return state;
    }

}

const reducer = combineReducers({questions: addQuestionReducer, answers: addAnswerReducer, property : addPropertyReducer});

var store = createStore(reducer);

export default store;