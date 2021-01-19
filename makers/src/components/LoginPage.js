import React, { useState } from 'react';
import "./LoginPage.css"
import InputBase from '@material-ui/core/InputBase';
import {login, register} from './api'


function LoginPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailCN, setEmailCN] = useState("id_text");
    const [pwCN, setPWCN] = useState("id_text");



    function processLogin(){

        login(username, password);

    }


    function processRegister(){

        register(username, password);

    }
    

    return(
        <div className="LoginPage">
        <InputBase className={emailCN} onChange={(e)=>setUsername(e.target.value) } placeholder="Username" onFocus={(e) => setEmailCN("id_text_selected")} onBlur={(e) => setEmailCN("id_text")}/>
        <InputBase className={pwCN} type="password" onChange={(e)=>setPassword(e.target.value) } placeholder="Password" onFocus={(e) => setPWCN("id_text_selected")} onBlur={(e) => setPWCN("id_text")}/>
        <button className="button" onClick={processLogin}>Login</button>
        <button className="button" onClick={processRegister}>Register</button>
        </div>
    );

}

export default LoginPage;