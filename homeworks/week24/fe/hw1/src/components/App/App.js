import React, { useEffect } from 'react';
import styled from 'styled-components';
import '../../index.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import HomePage from '../../pages/HomePage';
import PostPage from '../../pages/PostPage';
import AboutPage from '../../pages/AboutPage';
import NewPostPage from '../../pages/NewPostPage';
import EditPostPage from '../../pages/EditPostPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { getAuthToken } from '../../utils';
import { getToken } from '../../redux/reducers/userReducer';

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  // 設定變數 dispatch，之後可以將 action 傳送到 reducer 中
  const dispatch = useDispatch();

  // 註冊/登入機制
  useEffect(() => {
    // 如果 localStorage 有名為 'token' 的 token
    if (getAuthToken()) {
      // dispatch 一個名為 'getToken' 的 action 到 userReducer
      dispatch(getToken());
    }
  }, [dispatch]);

  return (
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
          <Route path="/edit-post/:id">
            <EditPostPage />
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
  );
}

export default App;
