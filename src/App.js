import "./App.css";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { useState } from "react";
import Menu from "./components/Menu";

function App() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu((prevValue) => !prevValue);
  };
  return (
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
        <Menu />
      </div>
      <NavBar toggle={toggleMenu} />
      <Main />
    </div>
  );
}

export default App;
