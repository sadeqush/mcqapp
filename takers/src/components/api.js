import axios from "axios";
/**
 * The function that does the fetching from the API
 * @param {String} examID ID of the exam to be pulled.
 */

var baseURL = "https://us-central1-mcq-app-6cef8.cloudfunctions.net/app/";

export async function getExam(examID) {
  var url = baseURL + "get_exam";
  var axiosObject = {
    session_token: "2a10VdL9EK2KnaaKTHxj4T8gbOIKqYBfq9h8ZyeBaZKRpRuucFiGqwuU",
    exam_id: examID,
  };

  var retval = await axios.post(url, axiosObject);
  console.log(retval.data);
  return retval.data;
}
