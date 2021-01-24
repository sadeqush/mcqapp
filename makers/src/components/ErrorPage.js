import './ErrorPage.css'
import "./index.css";
function ErrorPage(props) {
    return (
      <div className="ePage">          
          <i class="fa fa-bug"></i>
          <span className='oops'>Oops!</span>
          <h5 className='text'>{props.text}</h5>
          <button className='goBackBtn'>Go Back</button>
      </div>
    )
  }
  
export default ErrorPage;