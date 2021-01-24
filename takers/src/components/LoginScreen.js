import { InputBase } from "@material-ui/core";
import React, { useState } from "react";
import App from "./App";
import "./LoginScreen.css";

function LoginScreen() {
  const [ID, setID] = useState("LW6623");
  const [ready, setReady] = useState(false);
  const [inputCN, setInputCN] = useState("id_text");

  if (!ready)
    return (
      <div className='LoginScreen' id='App'>
        <div className=' LoginScreen-form '>
          <img
            className='LoginForm-avatar'
            src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
            alt='Login Avatar'
          />

          <InputBase
            className={inputCN}
            onChange={(e) => setID(e.target.value)}
            placeholder='Input Exam ID'
            onFocus={(e) => setInputCN("id_text_selected")}
            onBlur={(e) => setInputCN("id_text")}
          />
          <button className='button' onClick={() => setReady(true)}>
            Go to Exam!
          </button>
        </div>
      </div>
    );
  else return <App exam_id={ID} />;
}

export default LoginScreen;
