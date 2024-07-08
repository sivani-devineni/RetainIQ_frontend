import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

function App() {
  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: 'black', top: 0 }}>
        <Toolbar>         
        </Toolbar>
      </AppBar>

      <AppBar position="fixed" style={{ backgroundColor: 'black', top: 'auto', bottom: 0 }}>
        <Toolbar>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
