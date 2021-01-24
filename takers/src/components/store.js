import { createStore, combineReducers } from "redux";

const ADD_QUESTION = "ADD_QUESTION";
const ADD_ANSWER = "ADD_ANSWER";
const ADD_PROPERTY = "ADD_PROPERTY";

function addQuestionReducer(state = {}, action) {
  var retval = {};

  switch (action.type) {
    case ADD_QUESTION:
      retval = action.payload;
      return retval;
    default:
      return state;
  }
}

function addPropertyReducer(state = {}, action) {
  var retval = {};

  switch (action.type) {
    case ADD_PROPERTY:
      retval = action.payload;
      return retval;
    default:
      return state;
  }
}

function addAnswerReducer(state = {}, action) {
  var retval = { ...state };

  switch (action.type) {
    case ADD_ANSWER:
      retval[action.id] = action.answer;
      return retval;
    default:
      return retval;
  }
}
function addSessionReducer(
  state = {
    session_token: "2a10VdL9EK2KnaaKTHxj4T8gbOIKqYBfq9h8ZyeBaZKRpRuucFiGqwuU",
  },
  action
) {
  return state;
}

const reducer = combineReducers({
  questions: addQuestionReducer,
  answers: addAnswerReducer,
  property: addPropertyReducer,
  session: addSessionReducer,
});

var store = createStore(reducer);

export default store;
