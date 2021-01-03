import { createStore, combineReducers } from 'redux'

const ADD_QUESTION = 'ADD_QUESTION';
const ADD_ANSWER = 'ADD_ANSWER';

function addQuestionReducer(state = {}, action){

    var retval = {};

    switch(action.type){

        case ADD_QUESTION:
            retval = action.payload;
            return retval;
        default:
            return state;
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

const reducer = combineReducers({questions: addQuestionReducer, answers: addAnswerReducer});

var store = createStore(reducer);

export default store;