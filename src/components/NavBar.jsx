import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

function App() {
  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: 'black', top: 0 }}>
        <Toolbar>
          {/* Content for the top AppBar */}
        </Toolbar>
      </AppBar>

      {/* Your main content here */}

      <AppBar position="fixed" style={{ backgroundColor: 'black', top: 'auto', bottom: 0 }}>
        <Toolbar>
          {/* Content for the bottom AppBar */}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
