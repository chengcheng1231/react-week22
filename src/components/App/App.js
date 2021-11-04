import React from 'react';
import styled from "styled-components";
import Header from "../Header";
import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";
import WritePage from "../../pages/WritePage";
import SignInPage from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignUpPage";
import SinglePage from "../../pages/SinglePage";
import { useState, useEffect } from 'react'
import { AuthContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Root = styled.div`

`

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    
    // 有 token 才 call api 確認登入狀況
    getMe().then(response => {
      if (response.ok !== 1) return
      setUser(response.data)
    })
  }, [])

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact basename="/">
              <HomePage />
            </Route>
            <Route basename="/about">
              <AboutPage />
            </Route>
            <Route basename="/write">
              <WritePage />
            </Route>
            <Route basename="/signin">
              <SignInPage />
            </Route>
            <Route basename="/signup">
              <SignUpPage />
            </Route>
            <Route basename="/page/:slug">
              <SinglePage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
