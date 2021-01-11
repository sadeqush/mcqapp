import React, { useState, useEffect, useContext } from 'react';

function TestComponent(props) {


    return(
        <div>
            <input type="email" placeholder="Email ID" id="email"></input>
            <input type="password" placeholder="Password" id="password"></input>
            <button type="submit" value="submit">Submit</button>
        </div>
    );
}

export default TestComponent;