import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { login, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils';
import { AuthContext } from '../../contexts';

const ErrorMessage = styled.div`
  color: red;
`;
const Title = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 36px;
  text-weight: 600;
`;
const Form = styled.form`
  width: 30%;
  min-width: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 40px auto;
  padding: 40px;
  justify-content: space-between;
  min-height: 110px;
  border: 1.2px solid rgba(200, 200, 200, 0.5);
  box-shadow: 1px 1px 3px #fbfbfb;
  border-radius: 5px;
  font-family: '微軟正黑體';
`;

export default function LoginPage() {
  // 用 useContext 拿到 App.js 傳入的 setUser 這個 props
  const { setUser } = useContext(AuthContext);
  // 設定 username 的 state
  const [username, setUsername] = useState('');
  // 設定 password 的 state
  const [password, setPassword] = useState('');
  // 設定 errorMessage 的 state
  const [errorMessage, setErrorMessage] = useState('');
  // 是否正在點擊'Log In'按鈕，預設為 false
  const isSubmit = useRef(false);
  const history = useHistory();

  // 執行登入功能
  const handleSubmit = (e) => {
    e.preventDefault();

    // 將錯誤訊息清除
    setErrorMessage(null);
    // 如果正在點擊 'Log In' 按鈕，不進行任何動作
    if (isSubmit.current) return;

    // 否則，將正在點擊 'Log In' 按鈕狀態設為 true
    isSubmit.current = true;
    // 串接登入的 API，並帶入參數 username、password
    login(username, password).then((data) => {
      // 如果有誤 => 回傳錯誤訊息
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      // 否則將回傳的 token 存到 localStorage
      setAuthToken(data.token);
      // 將 token 帶回 API，以進行身份驗證
      getMe().then((response) => {
        // 如果身份驗證有誤
        if (response.ok !== 1) {
          // token 清空
          setAuthToken(null);
          // 回傳錯誤訊息
          return setErrorMessage(response.toString());
        }
        // 身份驗證通過：更新 user 的 state
        setUser(response.data);
        // 回到首頁
        history.push('/');
        //執行完上述後，將正在點擊'Log In'按鈕的狀態，設回 false
        isSubmit.current = false;
      });
    });
  };

  return (
    <>
      <Title>Log In</Title>
      {/* 點擊 Log In 按鈕提交後，表單執行 handleSubmit() */}
      <Form onSubmit={handleSubmit}>
        <div>
          username :{' '}
          <input
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          password :{' '}
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-btn">
          Log In
        </button>

        {/* 有錯誤訊息時，顯示在此 */}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </>
  );
}
