import React, { useState } from "react";
import Admin from "./admin/Admin";
import "./App.css";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { About, Loading, NotFound } from "./Pages";

import { getIsLoggedIn, logOutUser } from "./utils";

const requireLogin = (to, from, next) => {
  if (to.meta.auth === true) {
    if (getIsLoggedIn()) {
      next();
    }
    next.redirect("/login");
  } else {
    next();
  }
};
//
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <GuardProvider
          guards={[requireLogin]}
          loading={Loading}
          error={NotFound}
        >
          <Switch>
            <GuardedRoute exact path="/login" component={Login} />
            <GuardedRoute exact path="/" meta={{ auth: true }}>
              <Redirect to="/admin" />
            </GuardedRoute>
            <GuardedRoute exact path="/admin" meta={{ auth: true }}>
              <Admin />
            </GuardedRoute>
            <GuardedRoute exact path="*" meta={{ auth: true }}>
              {getIsLoggedIn() ? (
                <Redirect to="/admin" />
              ) : (
                <Redirect to="/login" />
              )}
            </GuardedRoute>
          </Switch>
        </GuardProvider>
      </BrowserRouter>
      {/* <Admin /> */}
    </div>
  );
};

const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [toggleState, setToggleState] = useState(true);

  function changeLogInData(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function onLogIn() {
    let authorization = "";
    authorization =
      "Basic " + btoa(loginData["username"] + ":" + loginData["password"]);
    var myHeaders = new Headers();
    myHeaders.append(
      "Ocp-Apim-Subscription-Key",
      "1a55d8e0ffa94fc7988a1fc24deb69b0"
    );
    myHeaders.append("Authorization", authorization);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://pikaia.azurewebsites.net/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          let token = data.token;
          // remove previously created cookie
          document.cookie =
            "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

          // saving token in cookie
          let date = new Date();
          date.setTime(date.getTime() + 3 * 60 * 60 * 1000); // 3 hours
          let expires = "; expires=" + date.toUTCString();
          document.cookie = "token=" + token + expires + "; path=/";

          // updating isLoggedInState
          onLoginSuccess();
        } else {
          onLoginFail();
        }
      })
      .catch((error) => {
        onLoginFail();
      });
  }

  function onLoginSuccess() {
    setToggleState(!toggleState);
    window.location.href = "/admin";
  }

  function onLoginFail() {
    alert("Login Failed");
  }

  return (
    <div>
      {/* {getIsLoggedIn() ? <Redirect to="/admin" /> : <Redirect to="/login" />} */}
      <h2>Welcome to LogIn...</h2>
      <p>
        <label>
          UserName :
          <input
            type="text"
            value={loginData.username}
            name="username"
            onChange={changeLogInData}
          ></input>
        </label>
      </p>
      <p>
        <label>
          PassWord :
          <input
            type="password"
            value={loginData.password}
            name="password"
            onChange={changeLogInData}
          ></input>
        </label>
      </p>
      <button onClick={onLogIn}>LogIn</button>
    </div>
  );
};

export default App;

// react render prop
