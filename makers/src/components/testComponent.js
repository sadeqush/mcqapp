import './McqQuestion.css'
import React, { useState, useEffect, useContext } from 'react';
import { Paper, TextField } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch } from 'react-redux';


function TestComponent(props) {

    const [cn, setCn] = useState("Option-unselected");

    function cngenerator(char){
        if(char==cn) return "Option-selected";
        else return "Option-unselected";
    }

    function selectorcnGenerator(char){
        if(char==cn) return "selector-selected";
        else return "selector-unselected";
    }

    function optionOnInputFunc(){
        
    }



    return(
        <div>
        <InputBase startAdornment={<b class={selectorcnGenerator('a')}>a</b>} onChange = {e => optionOnInputFunc('a', e.target.value)} className={cngenerator('a')} onSelect={ () => setCn("a")} label="Option A"/>
        <InputBase startAdornment={<b class={selectorcnGenerator('b')}>b</b>} onChange = {e => optionOnInputFunc('b', e.target.value)} className={cngenerator('b')} onSelect={ () => setCn("b")} label="Option B"/>
        <InputBase startAdornment={<b class={selectorcnGenerator('c')}>c</b>} onChange = {e => optionOnInputFunc('c', e.target.value)} className={cngenerator('c')} onClick={ () => setCn("c")} label="Option C"/>
        <InputBase startAdornment={<b class={selectorcnGenerator('c')}>c</b>} onChange = {e => optionOnInputFunc('d', e.target.value)} className={cngenerator('d')} onClick={ () => setCn("d")} label="Option D"/>
        </div>
    )

}

export default TestComponent;