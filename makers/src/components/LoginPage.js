import React, { useState } from "react";
import "./LoginPage.css";
import InputBase from "@material-ui/core/InputBase";
import { login, register } from "./api";
import { useSelector } from "react-redux";
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


  const reduxstore = useSelector(store=>store.session);

  async function processLogin() {
    //Do Some email validation
    var user = await login(email, password);
    console.log(user, "User from login page");
  }

  async function processRegister() {

    //Do some email validation
    //var user = await register(email, password);
    console.log(reduxstore.session_token);
  }

  return (
    <div className='LoginPage'>
      <form className='LoginForm'>
        <img
          className='LoginForm-avatar'
          src={logo}
          alt='Login Avatar'
        />
        <div className="msg">
          <p>You have logged in successfully!</p>
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
  );
}

export default LoginPage;
