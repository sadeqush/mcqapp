import { TrendingUpOutlined } from "@material-ui/icons";
import axios from "axios";
import store from "./store";

axios.defaults.timeout = 4000;


/**
 * Base URL of the API Endpoint.
 */
const baseURL = "https://us-central1-mcq-app-6cef8.cloudfunctions.net/app/";



export async function SubmitTest() {

  var fullstore = store.getState();
  var session_token = fullstore.session.session_token;
  var questions = {...fullstore.questions};
  var answers = {...fullstore.answers};

  var axiosObject = {};
  axiosObject['session_token'] = session_token;
  axiosObject['exam'] = {...questions};
  axiosObject['exam_answers'] = {...answers};


  var response = await axios.put(baseURL+'publish_exam', axiosObject);
  response = response.data;

  if(response.success){
    return true;
  }


}

export async function getExamID(){

  var fullstore = store.getState();
  var session_token = fullstore.session.session_token;

  var axiosObject = {};
  axiosObject['session_token'] = session_token;

  var response = axios.put(baseURL+'generate_exam_id', axiosObject);
  response = response.data;

  if(response.success){
    var generatedExamID = response.generated_examid;
  }

  return generatedExamID;

}

export async function login(email, password){

  var axiosObject = {};
  axiosObject['username'] = email;
  axiosObject['password'] = password;
  var response = await axios.post(baseURL+'login', axiosObject);

  response = response.data;

  if(response.success){
    var session_token = response.session_token;
    var sessionIDAction = {
      'type' : 'ADD_SESSION_TOKEN',
      'value' : session_token
    }
    store.dispatch(sessionIDAction);
    return session_token;
  }else{
    return false;
  }
  

}

export async function register(email, password){

  var axiosObject = {};
  axiosObject['username'] = email;
  axiosObject['password'] = password;

  var response = await axios.put(baseURL+'register', axiosObject);
  response = response.data;

  if(response.success){
    console.log(response.success);
  }
}

export async function logout(session_token){

  var axiosObject = {};
  axiosObject['session_token'] = session_token;

  var response = await axios.put(baseURL+'logout', axiosObject);

  

  response = response.data;

  if(response.success){
    console.log("Logged Out");
    return true;
  }
  
}