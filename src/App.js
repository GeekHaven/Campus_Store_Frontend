import NavBar from "./components/navbar";
import Home from "./pages/home";
import { useEffect, useState } from "react";
import Menu from "./components/menu";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ProductPage from "./pages/product";
import { useWindowWidth } from "@react-hook/window-size";
import Order from "./pages/order";
import jwtDecode from "jwt-decode";
import AddProduct from "./pages/product/add";

function App() {
  //checking for token and if there is, loggin in
  useEffect(() => {
    if (localStorage.token) {
      login(localStorage.token, jwtDecode(localStorage.token));
    }
  }, []);

  //auth state
  const [auth, setAuth] = useState({
    token: null,
    user: null,
    state: false,
  });

  const login = (token, user) => {
    setAuth({
      token,
      user,
      state: true,
    });
  };

  const logout = () => {
    setAuth({
      token: null,
      user: null,
      state: false,
    });
    window.localStorage.clear();
  };

  //UI states
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
          <Menu auth={auth} logout={logout} toggle={toggleMenu} />
        </div>
        <NavBar auth={auth} toggle={toggleMenu} />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin">
          {auth.state ? <Redirect to="/" /> : <Login login={login} />}
        </Route>
        <Route exact path="/signup">
          {auth.state ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/seller/signin">
          {auth.state ? (
            <Redirect to="/" />
          ) : (
            <Login login={login} forSeller={true} />
          )}
        </Route>{" "}
        <Route exact path="/seller/add">
          {auth.user?.isAdmin ? (
            <Register forSeller={true} auth={auth} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route
          exact
          path="/products/:id"
          render={({ match }) => (
            <ProductPage
              productId={match.params.id}
              seller={auth?.user?.type === "seller"}
            />
          )}
        />
        <Route
          exact
          path="/products/:id/order"
          render={({ match }) =>
            auth.state && auth?.user?.type !== "seller" ? (
              <Order productId={match.params.id} auth={auth} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route exact path="/product/add">
          {auth.user?.type === "seller" ? (
            <AddProduct auth={auth} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </div>
    </Router>
  );
}

export default App;
