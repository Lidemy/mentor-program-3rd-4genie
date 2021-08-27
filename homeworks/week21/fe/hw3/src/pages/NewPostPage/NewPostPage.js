import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { addNewPost } from '../../WebAPI';

const ErrorMessage = styled.div`
  color: red;
`;

const PageTitle = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 36px;
  text-weight: 600;
`;

const Form = styled.form`
  width: 50%;
  min-width: 40px;
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  padding: 40px;
  min-height: 360px;
  border: 1.2px solid rgba(200, 200, 200, 0.5);
  box-shadow: 1px 1px 3px #fbfbfb;
  border-radius: 5px;
  font-family: '微軟正黑體';
`;

export default function RegisterPage() {
  // 設定 title 的 state
  const [title, setTitle] = useState('');
  // 設定 content 的 state
  const [content, setContent] = useState('');
  // 設定 errorMessage 的 state
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  // 是否正在點擊'Publish'按鈕，預設為 false
  const isSubmit = useRef(false);

  // 執行提交功能
  const handleSubmit = (e) => {
    // e.preventDefault();
    // 將錯誤訊息清除
    setErrorMessage(null);
    // 如果正在點擊 'Publish' 按鈕，不進行任何動作
    if (isSubmit.current) return;
    // 否則，將正在點擊 'Publish' 按鈕狀態設為 true
    isSubmit.current = true;
    // 串接新增文章的 API，並帶入參數 title、content
    addNewPost(title, content).then((data) => {
      if (data.ok === 0) {
        // 如果有錯，顯示錯誤訊息
        return setErrorMessage(data.message);
      }
      // 回到首頁
      history.push('/');
      //執行完上述後，將正在點擊'Publish'按鈕的狀態，設回 false
      isSubmit.current = false;
    });
  };

  return (
    <>
      <PageTitle>New Post</PageTitle>
      {/* 點擊 Publish 按鈕提交後，表單執行 handleSubmit() */}
      <Form onSubmit={handleSubmit}>
        <div>
          <input
            className="form-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            className="form-textarea"
            placeholder="Say something..."
            rows="15"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-btn">
          Publish
        </button>

        {/* 有錯誤訊息時，顯示在此 */}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </>
  );
}
