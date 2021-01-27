import { useHistory, useLocation } from 'react-router-dom';
import './ErrorPage.css'
import "./index.css";
function ErrorPage(props) {

  console.log(props.location, "Props from ErrorPage");
  const history = useHistory();
  const location = useLocation();
  

    return (
      <div className="ePage">          
          <i class="fa fa-bug"></i>
          <span className='oops'>Oops!</span>
          <h5 className='text'>{location.text?location.text:props.text }</h5>
          <button className='goBackBtn' onClick={()=>history.goBack()}><b>Go Back</b></button>
      </div>
    )
  }
  
export default ErrorPage;