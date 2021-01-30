import axios from "axios";
import store from "./store";
import Cookies from "universal-cookie";

axios.defaults.timeout = 8000;

var cookie = new Cookies();

/**
 * Base URL of the API Endpoint.
 */
const baseURL = "https://us-central1-mcq-app-6cef8.cloudfunctions.net/app/";
//const baseURL = "http://localhost:6969/"

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

export async function login(email, password) {
  var axiosObject = {};
  axiosObject["username"] = email;
  axiosObject["password"] = password;
  var response = await axios.post(baseURL + "login", axiosObject);

  response = response.data;

  if (response.success) {
    var session_token = response.session_token;
    var sessionIDAction = {
      type: "ADD_SESSION_TOKEN",
      value: session_token,
    };
    store.dispatch(sessionIDAction);
    cookie.set("session_token", session_token);
    return session_token;
  } else {
    return false;
  }
}

export async function register(email, password) {
  var axiosObject = {};
  axiosObject["username"] = email;
  axiosObject["password"] = password;

  var response = await axios.post(baseURL+'register', axiosObject);
  response = response.data;

  if (response.success) {
    console.log(response.success);
  }
}

export async function getIsLoggedIn(){
  var fullstore = store.getState();
  var isLoggedIn = fullstore.session.isLoggedIn;

  //Checking for cookie's session token.
  if(!isLoggedIn){
    var session_token = cookie.get('session_token');
    isLoggedIn = await checkSessionToken(session_token);
  }
  return isLoggedIn;
}

export async function checkSessionToken(session_token){

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
    
    console.log("Logged Out");
    return true;
  }
}


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


export async function getAllExamList(session_token){

  if(!session_token){
    var fullstore = store.getState();
    var session_token = fullstore.session.session_token;
    console.log("Implicit session token");
  }

  var axiosObject = {};

  axiosObject['session_token'] = session_token;

  try{var response = await axios.post(baseURL+'get_all_exam_list', axiosObject);}
  catch {return false}
  response = response.data;

  return response;

}
