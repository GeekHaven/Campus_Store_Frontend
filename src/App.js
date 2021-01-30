import "./App.css";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import { useEffect, useState } from "react";
import Menu from "./components/menu";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ProductPage from "./pages/product";
import { useWindowWidth } from "@react-hook/window-size";

function App() {
  const screenWidth = useWindowWidth();
  const [menu, setMenu] = useState(false);
  const [menuWidth, setMenuWidth] = useState("");
  useEffect(() => {
    if (screenWidth > 600) {
      setMenuWidth("24rem");
    } else {
      setMenuWidth("12rem");
    }
  }, [screenWidth]);
  const toggleMenu = () => {
    setMenu((prevValue) => !prevValue);
  };
  return (
    <Router>
      <div
        style={{
          marginLeft: menu ? menuWidth : "0rem",
          transitionDuration: "0.6s",
        }}
        className="w-screen min-h-screen"
      >
        <div
          style={{
            left: menu ? "0rem" : "-" + menuWidth,
            transitionDuration: "0.6s",
            width: menuWidth,
          }}
          className="fixed h-screen z-20"
        >
          <Menu toggle={toggleMenu} />
        </div>
        <NavBar toggle={toggleMenu} />

        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/products/:id" component={ProductPage} />
      </div>
    </Router>
  );
}

export default App;
