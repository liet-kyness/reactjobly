import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import Nav from "./routes/Nav";
import Routes from "./routes/Routes";
import Loading from "./common/Loading";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";

export const TOKEN_STORAGE_ID = "jobly-token";
function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  console.debug("App",
  "infoLoaded=", infoLoaded,
  "currentUser=", currentUser,
  "token=", token);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch(err) {
          console.error("User Error", err);
          setCurrentUser(null);
        }
      };
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  };
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch(err) {
      console.error("signup failed", err);
      return { success: false, err };
    }
  };

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch(err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  };

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  };

  function applyToJob(id) {
    if (hasAppliedToJob(id)) {
      return;
    };
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  };
  if (!infoLoaded) {
    return (
      <Loading />
    )
  };

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
        <div className="App">
          <Nav logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )

}

export default App;
