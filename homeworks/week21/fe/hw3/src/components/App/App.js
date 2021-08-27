import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../index.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import HomePage from '../../pages/HomePage';
import PostPage from '../../pages/PostPage';
import AboutPage from '../../pages/AboutPage';
import NewPostPage from '../../pages/NewPostPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../contexts';
import { getMe } from '../../WebAPI';
import { getAuthToken } from '../../utils';

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  // 設定 user 的 state
  const [user, setUser] = useState(null);
  // 設定 isLoadingGetMe 的 state
  const [isLoadingGetMe, setIsLoadingGetMe] = useState(true);

  useEffect(() => {
    //有 token 才 call api
    if (getAuthToken()) {
      // 進行身份驗證
      getMe().then((response) => {
        // 如果驗證成功
        if (response.ok) {
          // 更新 User 的 state
          setUser(response.data);
          // 更新 isLoadingGetMe 的 state 為 false
          setIsLoadingGetMe(false);
        }
      });
    } else {
      // 如果驗證失敗， 更新 isLoadingGetMe 的 state 為 false
      setIsLoadingGetMe(false);
    }
  }, []);

  return (
    //react 中的 createContext，將很多子 component 都會共用到的 props 傳下去
    <AuthContext.Provider value={{ user, setUser, isLoadingGetMe }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/posts/:id">
              <PostPage />
            </Route>
            <Route exact path="/new-post">
              <NewPostPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
