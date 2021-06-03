import Home from "./pages/home";
import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ProductPage from "./pages/product";
import Order from "./pages/order";
import jwtDecode from "jwt-decode";
import AddProduct from "./pages/product/add";
import UserContext from "./context/UserContext";
import Layout from "./layouts";

function App() {
  const [user, setUser] = useState({
    details: null,
    type: null,
    token: null,
    isLogged: false,
  });

  const login = (token, details) => {
    setUser({
      details,
      type: details.type,
      token,
      isLogged: true,
    });
  };

  const logout = () => {
    setUser({
      details: null,
      type: null,
      token: null,
      isLogged: false,
    });
    window.localStorage.clear();
  };

  useEffect(() => {
    if (localStorage.token) {
      login(localStorage.token, jwtDecode(localStorage.token));
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Layout logout={logout}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin">
          {user.isLogged ? <Redirect to="/" /> : <Login login={login} />}
        </Route>
        <Route exact path="/seller/signin">
          {user.isLogged ? (
            <Redirect to="/" />
          ) : (
            <Login login={login} forSeller={true} />
          )}
        </Route>
        <Route exact path="/signup">
          {user.isLogged ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/seller/add">
          {user.type === "admin" ? (
            <Register forSeller={true} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/products/:id" component={ProductPage} />

        <Route
          exact
          path="/products/:id/order"
          render={({ match }) =>
            user.isLogged && user.type !== "seller" ? (
              <Order productId={match.params.id} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route exact path="/product/add">
          {user.type === "seller" ? <AddProduct /> : <Redirect to="/" />}
        </Route>
      </Layout>
    </UserContext.Provider>
  );
}

export default App;
