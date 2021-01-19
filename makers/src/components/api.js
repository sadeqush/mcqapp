import axios from "axios";
import store from "./store";
//import firebase from "firebase/app";
//import "firebase/auth";
//import "firebase/firestore";

  /**
   * @param finished
   * The function gets called on clicking Publish Questions. This packs everything neatly for the API and eventually call
   * call the API to push everything to the website.
   */


const bcrypt = require("bcryptjs");


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


/**
 * Function called with username and password to login a user
 */
export async function login(username, password){

  var axiosObject = await axios.get('https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/passwords/'+username+'.json');
  var hash = axiosObject.data;

  var logedIn = bcrypt.compareSync(password, hash);
  console.log(logedIn);

}


/**
 * Function called with username and password to register user
 */
export async function register(username, password){

    var shouldBeNull = await axios.get('https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/users/'+username+'.json');

    if(shouldBeNull.data==null){

      var passwordObject = {};
      var salt = bcrypt.genSaltSync(10);

      var hash = bcrypt.hashSync(password, salt);

      passwordObject[username] = hash ;

      var axiosObject = {};
      axiosObject[username] = {"time_created" : Date.now()};
    
      try{
        await axios.patch('https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/passwords.json', passwordObject);
        await axios.patch('https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/users.json', axiosObject);

        console.log("Registration Successful");
        return true;
      }
      catch(e){
        console.log(e);
      }

    }

    else{
      throw console.error("Username Exists");
    }



}


