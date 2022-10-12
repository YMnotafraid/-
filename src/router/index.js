import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "../views/login/Login";
import Detail from "../views/news/Detail";
import News from "../views/news/News";
import NewsSandBox from "../views/sandbox/NewsSandBox";
export default function Myrouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/news" component={News}></Route>
        <Route path="/detail/:id" component={Detail}></Route>
        <Route path="/login" component={Login}></Route>
        <Route
          path="/"
          render={() => {
            return localStorage.getItem("token") ? (
              <NewsSandBox></NewsSandBox>
            ) : (
              <Redirect to="/login"></Redirect>
            );
          }}
        ></Route>
      </Switch>
    </HashRouter>
  );
}
