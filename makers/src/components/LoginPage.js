import React, { useState } from "react";
import "./LoginPage.css";
import Cookies from 'universal-cookie';
import InputBase from "@material-ui/core/InputBase";
import { login, register } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


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


  const dispatch = useDispatch();

  let history = useHistory();


  async function processLogin() {
    //Do Some email validation
    var session_token = await login(email, password);

    if(session_token){

      var action = {
        'type' : 'ADD_SESSION_TOKEN',
        'value' : session_token
      }

      dispatch(action);

      var cookie = new Cookies();
      cookie.set('session_token', session_token);
      history.push('/dashboard');

    }

    else{
      ShowMessage("Error");
    }

  }

  async function processRegister() {

    //Do some email validation
    var user = await register(email, password);
    if(user.success){
      ShowMessage("Successfully Registered, please login.")
    }
    else{
      ShowMessage("Username is taken.");
    }
    
  }

  function ShowMessage(message){
    //This would populate an error box with the error message
  }

  return (
    <div className='LoginPage'>
      <form className='LoginForm'>
        <img
          className='LoginForm-avatar'
          src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
          alt='Login Avatar'
        />

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
  );
}

export default LoginPage;
