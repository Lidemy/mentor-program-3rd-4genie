import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setErrorMessage } from '../../redux/reducers/userReducer';

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
  // 設定 username 的 state
  const [username, setUsername] = useState('');
  // 設定 password 的 state
  const [password, setPassword] = useState('');

  // 設定變數 user，從 store 的 users 中拿到 user 的 state
  const user = useSelector((store) => store.users.user);

  // 設定變數 errorMessage，從 store 的 users 中拿到 errorMessage 的 state
  const errorMessage = useSelector((store) => store.users.errorMessage);

  // 是否正在點擊'Log In'按鈕，預設為 false
  const isSubmit = useRef(false);

  const history = useHistory();

  // 設定變數 dispatch，之後可以將 action 傳送到 reducer 中
  const dispatch = useDispatch();

  // 執行登入功能
  const handleSubmit = (e) => {
    e.preventDefault();

    // 將錯誤訊息清除
    //dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
    dispatch(setErrorMessage(null));

    // 如果正在點擊 'Log In' 按鈕，不進行任何動作
    if (isSubmit.current) return;

    // 否則，將正在點擊 'Log In' 按鈕狀態設為 true
    isSubmit.current = true;

    // 登入：dispatch 一個名為 'login' 的 action 到 userReducer，並將 username、password 帶入 action 中
    dispatch(login(username, password));

    //執行完上述後，將正在點擊'Log in'按鈕的狀態，設回 false
    isSubmit.current = false;
  };

  // log in 後清除 errorMessage
  // => 將 setErrorMessage 清空
  useEffect(() => {
    return () => {
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (user && user.id) {
      history.push('/');
    }
  }, [user, history]);

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
