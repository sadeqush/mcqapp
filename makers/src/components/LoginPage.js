import React, { useState } from "react";
import "./LoginPage.css";
import InputBase from "@material-ui/core/InputBase";
import { login, register } from "./api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailCN, setEmailCN] = useState("id_text");
  const [pwCN, setPWCN] = useState("id_text");

  function processLogin() {
    login(username, password);
  }

  function processRegister() {
    register(username, password);
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
          onChange={(e) => setUsername(e.target.value)}
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

        <button className='button' onClick={processLogin}>
          Login
        </button>

        <div className='LoginForm-bar'></div>

        <button className='button' onClick={processRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

/*
1. Moved the input elements into a form.
2. className='LoginPage' has 100% width & 100% height, display grid to place the form always centered.
3. all the elements inside the form has some margin & padding.
*/
