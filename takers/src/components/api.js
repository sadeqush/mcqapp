/**
 * The function that does the fetching from the API 
 * @param {String} examID ID of the exam to be pulled.
 */
export async function getExam(examID){

    var url = "https://mcq-app-6cef8-default-rtdb.firebaseio.com/test/exams/" + examID + ".json";
    var retval;
    await fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          retval = {...result}
        }
      )
      return retval;
}