import { InputBase } from '@material-ui/core';
import React, { useState } from 'react';
import App from './App'
import './LoginScreen.css'

function LoginScreen() {

    const[ID, setID] = useState("LW6623");
    const[ready, setReady] = useState(false)
    const[inputCN, setInputCN] = useState("id_text");      

    if(!ready) return(

        <div className="LoginScreen" id="App">
        <InputBase className={inputCN} onChange={(e)=>setID(e.target.value) } placeholder="Input Exam ID" onFocus={(e) => setInputCN("id_text_selected")} onBlur={(e) => setInputCN("id_text")}/>
        <button className="button" onClick={()=>setReady(true)}>Go to Exam!</button>
        </div>
    );
    else return (
        <App exam_id={ID}/>
    );

}

export default LoginScreen;