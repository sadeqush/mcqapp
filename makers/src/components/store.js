import { createStore, combineReducers } from 'redux'

const ADD_QUESTION = 'ADD_QUESTION';

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

function addAnswerReducer(state = {'answers' : {}}, action){

}

/**
 * @param reducer This is the main reducer function that will join all my customer reducers into one.
 * This needs to be implemented with all my reducers combined into one.
 */
function reducer(){
    return combineReducers({addQuestionReducer, addAnswerReducer});
};

var store = createStore(addQuestionReducer);

export default store;