import "./App.css";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { useState } from "react";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu((prevValue) => !prevValue);
  };
  return (
    <Router>
      <div
        style={{
          marginLeft: menu ? "24rem" : "0rem",
          transitionDuration: "0.6s",
        }}
        className="w-screen"
      >
        <div
          style={{ left: menu ? "0rem" : "-24rem", transitionDuration: "0.6s" }}
          className="fixed w-96 -left-96 h-screen z-20"
        >
          <Menu toggle={toggleMenu} />
        </div>
        <NavBar toggle={toggleMenu} />

        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
      </div>
    </Router>
  );
}

export default App;
