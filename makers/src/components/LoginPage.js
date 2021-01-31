import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import Cookies from 'universal-cookie';
import InputBase from "@material-ui/core/InputBase";
import { login, register } from "./api";

import Spinner from "./Spinner"

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {getIsLoggedIn} from './api';

import logo from './mcqappAvatar-01.png';



/*
1. Moved the input elements into a form.
2. className='LoginPage' has 100% width & 100% height, display grid to place the form always centered.
3. all the elements inside the form has some margin & padding.
*/
function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCN, setEmailCN] = useState("id_text");
  const [pwCN, setPWCN] = useState("id_text");

  const [spinnerClassName, setSpinnerClassName] = useState("spinner");
  const [loginErrorVisibility, setLoginErrorVisibility] = useState("message-invisible");
  const [mainDivClassname, setMainDivClassname] = useState("LoginPage")
  const [errorMessage, setErrorMessage] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect( () => {
    async function onInnitialLoad() {
      var tempIsLoggedin = await getIsLoggedIn();
      setIsLoggedIn(tempIsLoggedin);
      setIsLoaded(true);
  } onInnitialLoad();
} , []);

  let history = useHistory();

  async function processLogin() {
    //Do Some email validation
    toggleSpinner();
    var session_token = await login(email, password);
    if(session_token){      
      history.push(
        {
          pathname : "/dashboard",
          isLoggedIn : true,
        }
      );
    }

    else{
      ShowMessage("Username or Password is Wrong");
    }

  }

  async function processRegister() {

    toggleSpinner();
    //Do some email validation
    var user = await register(email, password);
    if(user.success){
      ShowMessage("Successfully Registered, please login.")
    }
    else{
      ShowMessage("Username is taken");
    }
    
  }

  function toggleSpinner(){
    spinnerClassName=='spinner'?setSpinnerClassName('spinner-active'):setSpinnerClassName('spinner');
    mainDivClassname=='LoginPage'?setMainDivClassname('LoginPage-blurred'):setMainDivClassname('LoginPage');
  }

  function ShowMessage(message){
    setSpinnerClassName('spinner');
    setMainDivClassname('LoginPage');

    setErrorMessage(message);
    setLoginErrorVisibility('message-visible');
  }

  if(!isLoggedIn && isLoaded) return (      
    <div>
      <div className={spinnerClassName}><Spinner/></div>
      <div className={mainDivClassname}>
        <form className='LoginForm'>
          <img
          className='LoginForm-avatar'
          src={logo}
          alt='Login Avatar'
          />
        <div className={loginErrorVisibility}>
          {errorMessage}
        </div>

        {/* Input elements */}
        <InputBase
          className={emailCN}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Username'
          onFocus={(e) => setEmailCN("id_text_selected")}
          onBlur={(e) => setEmailCN("id_text")}
        />
        <InputBase
          className={pwCN}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          onFocus={(e) => setPWCN("id_text_selected")}
          onBlur={(e) => setPWCN("id_text")}
        />

        <button className='button' type="button" onClick={()=>{processLogin()}}>
          Login
        </button>

        <div className='LoginForm-bar'></div>

        <button className='button' type="button" onClick={()=>{processRegister()}}>
          Register
        </button>
      </form>

    </div>
    </div>
  );
  if(isLoaded && isLoggedIn){
    history.push(
      {
        pathname : "/dashboard",
        isLoggedIn : true,
      }
    );
    return (
      <div>
      <Spinner className='loading'/>
    </div>
    );
  }

  //This else statement runs if user is logged in (authenticated via cookie)
  else{
    return (
      <div>
        <Spinner className='loading'/>
      </div>
      
      
    );
  }
}

export default LoginPage;
