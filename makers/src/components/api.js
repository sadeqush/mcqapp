import axios from "axios";
import store from "./store";
import Cookies from "universal-cookie";

axios.defaults.timeout = 8000;

var cookie = new Cookies();


const ADD_QUESTION = 'ADD_QUESTION';
const ADD_ANSWER = 'ADD_ANSWER';
const ADD_TITLE  = 'ADD_TITLE';
const ADD_ID = 'ADD_ID';
const ADD_SESSION_TOKEN = 'ADD_SESSION_TOKEN';
const ADD_QUES_COUNT = 'ADD_QUES_COUNT';
const ADD_CREATION_TIME = 'ADD_CREATION_TIME';
const ADD_IS_LOGGED_IN = "ADD_IS_LOGGED_IN";


/**
 * Base URL of the API Endpoint.
 */
const baseURL = "https://us-central1-mcq-app-6cef8.cloudfunctions.net/app/";
//const baseURL = "http://localhost:6969/"

/**
 * Question, Property, Answers, Session token is taken from the redux store automatically.
 * This returns true if the test was successfully published.
 * Would return false if there was any issue.
 */
export async function SubmitTest() {
  
  var fullstore = store.getState();
  var session_token = fullstore.session.session_token;
  var questions = { ...fullstore.questions };
  var property = {...fullstore.property};
  var answers = { ...fullstore.answers };

  var axiosObject = {};
  axiosObject["session_token"] = session_token;
  axiosObject["exam"] = { ...questions };
  axiosObject["exam_answers"] = { ...answers };
  axiosObject['property'] = property;
  axiosObject["examID"] = fullstore.property.examID;

try{
  var response = await axios.post(baseURL+'publish_exam', axiosObject);
}
catch{
  return false;
}

  response = response.data;
  console.log(response);

  if (response.success) {
    return true;
  }
  else{
    console.log(response.error_message);
    return false;
  }
}

/**
 * Generates a random exam ID based on the time the request was made.
 */
export async function getExamID() {
  var fullstore = store.getState();
  var session_token = fullstore.session.session_token;

  var axiosObject = {};
  axiosObject["session_token"] = session_token;
  var response = await axios.post(baseURL+'generate_exam_id', axiosObject);
  response = response.data;

  if (response.success) {
    var generatedExamID = response.generated_examid;
  }

  return generatedExamID;
}

/**
 * Returns the session token. Also, stores the session token to the redux store and to the cache.
 * @param {*} email This is actually username, not email. Emails would not work right now.
 * @param {*} password 
 */
export async function login(email, password) {
  var axiosObject = {};
  axiosObject["username"] = email;
  axiosObject["password"] = password;
  var response = await axios.post(baseURL + "login", axiosObject);

  response = response.data;

  if (response.success) {
    var session_token = response.session_token;
    var sessionIDAction = {
      'type': ADD_SESSION_TOKEN,
      'value': session_token
    };

    store.dispatch(sessionIDAction);
    var action = {
      'type' : ADD_IS_LOGGED_IN,
      'value' : true
    }
    store.dispatch(action);
    cookie.set("session_token", session_token);
    return session_token;
  } else {
    return false;
  }
}

/**
 * Self Explanatory. This does not log you in, after registration is done. User needs to login again.
 * @param {*} email Username, not email.
 * @param {*} password 
 */
export async function register(email, password) {
  var axiosObject = {};
  axiosObject["username"] = email;
  axiosObject["password"] = password;

  var response = await axios.post(baseURL+'register', axiosObject);
  response = response.data;
  console.log(response);

  return response.success;
}

/**
 * Check if store.session.isLoggedIn is set to true. If it is true, this returns true instantly.
 * If not, this checks cookie to get the session_token, then if the session_token is valid, this will store the session_token along with 
 * IsLoggedIn to the store.
 * Returns false if the user is not logged in or if the session_token stored in cookie is not valid.
 */
export async function getIsLoggedIn(){

  var fullstore = store.getState();
  var isLoggedIn = fullstore.session.isLoggedIn;

  if(isLoggedIn) return true;


  //If there is no isLoggedin in the store, checking for cookie's session token.
  else{
    var session_token = cookie.get('session_token');
    var response = await checkSessionToken(session_token);

//Putting the session token back into the store.
    if (response) {
      var sessionIDAction = {
        'type': ADD_SESSION_TOKEN,
        'value': session_token
      };
      store.dispatch(sessionIDAction);
      var action = {
        'type' : ADD_IS_LOGGED_IN,
        'value' : true
      }
      store.dispatch(action);
      return true;
    }
    else{
      cookie.remove('session_token');
      return false;
    }
  }
}

/**
 * This checks the session_token. This is not meant to be used outside of the API.js file.
 * @param {*} session_token Can be implicitly generated, not necessary to provide.
 */
async function checkSessionToken(session_token){

  if(!session_token){
    var fullstore = store.getState();
    var session_token = fullstore.session.session_token;
    console.log("Implicit session token");
  }
  var axiosObject = {};
  axiosObject['session_token'] = session_token;

  var response = await axios.post(baseURL+'authenticate_sessiontoken', axiosObject);
  response  = response.data;

  if(response.isAuthenticated){
    return true;
  }
  else return false;

}

/**
 * Will simply remove the token from the database and return true.
 * @param {*} session_token Can be implicit.
 */
export async function logout(session_token){
  if(!session_token){
    var fullstore = await store.getState();
    var session_token = fullstore.session.session_token;
    console.log("Implicit session token");
  }
  var axiosObject = {};
  axiosObject['session_token'] = session_token;
  var response = await axios.post(baseURL+'logout', axiosObject);
  response = response.data;
  if (response.success) {
    var action = {
      type : 'ADD_IS_LOGGED_IN',
      value : false
    }
    store.dispatch(action);
    console.log("Logged Out");
    cookie.remove('session_token');
    return true;
  }
}

/**
 * Will return the property of the examID sent as argument.
 * @param {*} examID Needs the examID.
 */
export async function getExamProperty(examID){
  
  var fullstore = store.getState();
  var session_token = fullstore.session.session_token;
  console.log("Implicit session token");
  
  var axiosObject = {}
  axiosObject['session_token'] = session_token;
  axiosObject['examID'] = examID;

  var retval = await axios.post(baseURL+'get_exam_property', axiosObject);
  return retval.data;

}

/**
 * Get an array of the exams created by this user.
 */
export async function getAllExamList(){

  if(!session_token){
    var fullstore = store.getState();
    var session_token = fullstore.session.session_token;
  }

  var axiosObject = {};

  axiosObject['session_token'] = session_token;
  axiosObject['only_makers'] = true;

  try{
    var response = await axios.post(baseURL+'get_all_exam_list', axiosObject);
  }
  catch(e){
    return false
  }
  response = response.data;


  if(response.success==false){
    console.log(response, "getExamList");
    console.log(axiosObject, "AxiosObject");
    return false;
  }

  return response;

}
