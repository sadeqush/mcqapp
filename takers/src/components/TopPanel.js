import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

function TopPanel() {
    
    return (

        <React.Fragment>
        <AppBar position="fixed" id="Appbar">
          <Toolbar>ECO181 Homework 3</Toolbar>
        </AppBar>
        <Toolbar />
      </React.Fragment>

    );

}

export default TopPanel;