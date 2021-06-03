import { createContext } from "react";

const UserContext = createContext({
  details: null,
  type: null,
  token: null,
  isLogged: false,
});

export default UserContext;
