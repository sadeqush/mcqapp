import { AppBar, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "./Dashboard.css"


function Dashboard() {



    return(
        <div className="Dashboard">
            <AppBar style={{background: '#14213D', position: "fixed"}}>
            <Toolbar></Toolbar>
            </AppBar>

            <div className="Exam-card" position="fixed">
            </div>
            <div className="Exam-card" position="fixed">
            </div>


        </div>
    );


}

export default Dashboard;