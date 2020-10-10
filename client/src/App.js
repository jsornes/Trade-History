import React from "react";
import NavBar from "./components/Navbar/NavBar";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import { Grid } from "@material-ui/core";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          <NavBar className="navbar" />
        </Grid>
        <Grid item xs={12}>
          <Body className="body" />
        </Grid>
        <Grid item xs={12}>
          <Footer className="footer" />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
