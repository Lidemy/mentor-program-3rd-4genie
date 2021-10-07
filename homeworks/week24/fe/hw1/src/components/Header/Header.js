import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogout } from '../../redux/reducers/userReducer';
import { setAuthToken } from '../../utils';

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
  padding: 0px 32px;
  background: white;
`;

const Brand = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;

const Nav = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) => props.$active && `background-color: rgba(0,0,0,0.1)`};
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 64px;
  }
`;

export default function Header() {
  const location = useLocation();
  const history = useHistory();

  // 設定變數 dispatch，之後可以將 action 傳送到 reducer 中
  const dispatch = useDispatch();

  // 設定變數 user，從 store 的 users 中拿到 user 的 state
  const user = useSelector((store) => store.users.user);

  // 登出
  const handleLogout = () => {
    // 將 token 設為空
    setAuthToken('');

    // dispatch 一個名為 setUserLogout 的 action，
    // 可將 user 的 state 設為 null
    dispatch(setUserLogout());

    // 如果登出時當前頁不是首頁 => 回到首頁
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>Blog</Brand>
        <NavbarList>
          <Nav to="/" $active={location.pathname === '/'}>
            Posts
          </Nav>

          {/* 使用者登入時顯示 Publish 欄位，讓登入後的使用者可以新增文章 */}
          {user && (
            <Nav to="/new-post" $active={location.pathname === '/new-post'}>
              Publish
            </Nav>
          )}

          <Nav to="/about" $active={location.pathname === '/about'}>
            About
          </Nav>
        </NavbarList>
      </LeftContainer>

      <NavbarList>
        {/* 使用者未登入時顯示 Sign Up 欄位，讓使用者可以註冊  */}
        {!user && (
          <Nav to="/register" $active={location.pathname === '/register'}>
            Sign Up
          </Nav>
        )}

        {/* 使用者未登入時顯示 Log In 欄位，讓使用者可以登入  */}
        {!user && (
          <Nav to="/login" $active={location.pathname === '/login'}>
            Log In
          </Nav>
        )}

        {/* 使用者登入時顯示 Log Out 欄位，讓使用者可以登出  */}
        {user && (
          // 點擊 Log Out 後,執行 handleLogout
          <Nav to="/login" onClick={handleLogout}>
            Log Out
          </Nav>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
