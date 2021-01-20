import axios from "axios";
import store from "./store";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



const bcrypt = require("bcryptjs");
var firebaseApp;


const firebaseConfig = {
  apiKey: "AIzaSyBZJSwfTnrIyFFfyUx-wb_U8sAU3zlEokw",
  authDomain: "mcq-app-6cef8.firebaseapp.com",
  databaseURL: "https://mcq-app-6cef8-default-rtdb.firebaseio.com",
  projectId: "mcq-app-6cef8",
  storageBucket: "mcq-app-6cef8.appspot.com",
  messagingSenderId: "40587533414",
  appId: "1:40587533414:web:727305c796e72ee0de61a7"
};


export async function firebaseInit(){
  firebaseApp = firebase.initializeApp(firebaseConfig);
}

export async function SubmitTest() {

    var fullstore = store.getState();
    var examID = fullstore.property.examID;

    var axiosObject = {} 
    axiosObject[examID] = {questions : {...fullstore.questions}, property : {...fullstore.property}};

    var axiosAnswerObject = {}
    axiosAnswerObject[examID] = {...fullstore.answers};

    try {
      await axios.patch('https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/exams.json', axiosObject);
      await axios.patch('https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/answers.json', axiosAnswerObject);
    } catch (e) {
      console.log(e);
    }

}
/**
 * Function returns an exam ID is guranteed unique.
 */
export async function getExamID(){


    /**
    * Function generates unique Exam ID with 2 letters, followed by 4 numbers ie AB1234 or XC3223
    * Takes Date.now() as seed. Over 6.7 Million possible unique identifiers.
    * The output can be used as Exam key, but should never be used for authentication.
    * Reengineer this eventually.
    */
    function generateRandomExamID(){

        var retval = "";

        var seed = Date.now();
        seed = seed%87889091;

        //Generating a 8 digit number if its not 8 digits.
        while(seed<10000001){
            var random = Math.floor(Math.random() * 10) + 1;
            seed=seed*random;
        }

        //Seed's first two digits mod 26, added to retval
        var temp = Math.floor((seed / 1000000) % 100)
        retval = String.fromCharCode(65+Math.floor(temp%26));

        //Second two digits mod 26, added to retval
        temp = Math.floor((seed / 10000) % 100);
        retval = retval + String.fromCharCode(65+Math.floor(temp%26));

        //Adding last 4 digits to retval.
        temp = Math.floor(seed%10000);
        retval = retval + temp;

        return retval;

    }

    var id;
    var isAlright = false;

    //Generates an id, checks if it already exists in DB, and then assigns this Exam an ID.
    while(!isAlright){
      id = generateRandomExamID();
      var url = "https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/exams/" + id + ".json";

      await fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          if(result==null)
          isAlright = true;
        }
      )
    }

    //Code here to save this is Database.

    return id;
}

export async function login(email, password){

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    console.log(user, "Logged In");
    return user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

}

export async function register(email, password){

  firebaseApp.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {

    console.log(user);
    return user;
  })
  .catch((error) => {
    console.log(error)
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

}


export default function logout(){
  firebaseApp.auth().signOut().then(() => {
    return true;
  }).catch((error) => {
    console.log(e);
  });

  return false;
}