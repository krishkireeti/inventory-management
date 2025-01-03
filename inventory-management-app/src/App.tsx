import React, { useState } from 'react';
import AdminView from "./components/AdminView";
import UserView from "./components/UserView";
import { Button, Container, AppBar, Toolbar, Typography } from "@mui/material";
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Inventory Management
          </Typography>
          <Button color="inherit" onClick={() => setIsAdmin(!isAdmin)} variant='outlined'>
            Switch to {isAdmin ? "User" : "Admin"} View
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "2rem" }}>
        {isAdmin ? <AdminView /> : <UserView />}
      </Container>
    </div >
  );
}

export default App;
