import axios from "axios";
import store from "./store";


  /**
   * @param finished
   * The function gets called on clicking Publish Questions. This packs everything neatly for the API and eventually call
   * call the API to push everything to the website.
   */
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