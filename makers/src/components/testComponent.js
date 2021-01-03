import './McqQuestion.css'
import React, { useState, useEffect, useContext } from 'react';
import { Checkbox } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
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

    function checkb(){
        return(
            <Checkbox
            disableRipple={true}
            style={{ color: "#FCA311" }}
            name="checkedG"
            icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
            checkedIcon={<CheckBoxIcon fontSize="large" />}
          />
        );
    }



    return(
        <div class='question'>
        <InputBase endAdornment={checkb()} startAdornment={<b class={selectorcnGenerator('a')}>a</b>}  className={cngenerator('a')} onSelect={ () => setCn("a")} label="Option A"/>
        <InputBase startAdornment={<b class={selectorcnGenerator('b')}>b</b>}  className={cngenerator('b')} onSelect={ () => setCn("b")} label="Option B"/>
        <InputBase startAdornment={<b class={selectorcnGenerator('c')}>c</b>}  className={cngenerator('c')} onSelect={ () => setCn("c")} label="Option C"/>
        <InputBase startAdornment={<b class={selectorcnGenerator('d')}>d</b>}  className={cngenerator('d')} onSelect={ () => setCn("d")} label="Option D"/>
            
        </div>
    )

}

export default TestComponent;