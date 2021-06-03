import React, { useState, useEffect } from "react";
import Menu from "../components/menu";
import NavBar from "../components/navbar";
import { useWindowWidth } from "@react-hook/window-size";

export default function Layout({ children, logout }) {
  const screenWidth = useWindowWidth();
  const [menu, setMenu] = useState(false);
  const [menuWidth, setMenuWidth] = useState("");
  useEffect(() => {
    if (screenWidth > 600) {
      setMenuWidth("30rem");
    } else {
      setMenuWidth("16rem");
    }
  }, [screenWidth]);

  const toggleMenu = () => {
    setMenu((prevValue) => !prevValue);
  };

  return (
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
        <Menu logout={logout} toggle={toggleMenu} />
      </div>
      <NavBar toggle={toggleMenu} />
      {children}
    </div>
  );
}
