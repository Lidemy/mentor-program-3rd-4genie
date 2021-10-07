import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import {
  getPost,
  updatePost,
  setErrorMessage,
} from '../../redux/reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';

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
  width: 80%;
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
  word-wrap: break-word;
`;

// 儲存上一個 state 狀態的 hook （引用別人事先寫好的）
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default function EditPostPage() {
  // 取得 URL 上 id 的參數
  const { id } = useParams();

  // 設定 title 的 state
  const [title, setTitle] = useState('');

  // 設定 textArea 的 state
  const [textArea, setTextArea] = useState('');

  // 設定變數 dispatch，之後可以將 action 傳送到 reducer 中
  const dispatch = useDispatch();

  // 設定變數 post，從 store 的 posts 中拿到 post 的 state
  const post = useSelector((store) => store.posts.post);

  // 設定變數 newPostResponse，從 store 的 posts 中拿到 newPostResponse 的 state
  const newPostResponse = useSelector((store) => store.posts.newPostResponse);

  // 設定變數 isUpdatingPost，從 store 的 posts 中拿到 isUpdatingPost 的 state
  const isUpdatingPost = useSelector((store) => store.posts.isUpdatingPost);

  // 設定變數 prevIsUpdatingPost，儲存 isUpdatingPost 上一個的 state 狀態
  const prevIsUpdatingPost = usePrevious(isUpdatingPost);

  // 設定變數 errorMessage，從 store 的 posts 中拿到 errorMessage 的 state
  const errorMessage = useSelector((store) => store.posts.errorMessage);

  // 是否正在點擊'Update'按鈕，預設為 false
  const isSubmit = useRef(false);

  const history = useHistory();
  console.log(post);

  // 拿到修改前此文章的標題與內容
  useEffect(() => {
    // 拿到單一文章的內容：
    //dispatch 一個名為 'getPost' 的 action 到 postReducer，並將 id 帶入 action 中
    // 將回傳資料中的 title、body，設為欄位的預設值
    dispatch(getPost(id)).then((post) => {
      // console.log(post);
      setTitle(post[0].title);
      setTextArea(post[0].body);
    });
  }, [id, dispatch]);

  // 利用 isUpdatingPost 的狀態控制：
  // 發 request 之前，isUpdatingPost: false, prevIsUpdatingPost: false
  // request,isUpdatingPost: true, prevIsUpdatingPost: false
  // response,isUpdatingPost: true, prevIsUpdatingPost: true

  useEffect(() => {
    if (!isUpdatingPost && prevIsUpdatingPost) {
      if (newPostResponse && newPostResponse.id) {
        history.push('/posts/' + newPostResponse.id);
      }
    }
  }, [newPostResponse, history, isUpdatingPost, prevIsUpdatingPost]);

  // 執行提交功能
  const handleEditPost = () => {
    // e.preventDefault();

    // 將錯誤訊息清除
    //dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
    dispatch(setErrorMessage(null));

    // 如果正在點擊 'Update' 按鈕，不進行任何動作
    if (isSubmit.current) return;

    // 否則，將正在點擊 'Update' 按鈕狀態設為 true
    isSubmit.current = true;

    // 編輯文章：dispatch 一個名為 'updatePost' 的 action 到 postReducer，並將 id、title、textArea 帶入 action 中
    dispatch(updatePost(id, title, textArea));
  };

  return (
    <>
      <PageTitle>Update Post</PageTitle>
      {/* 點擊 Publish 按鈕提交後，表單執行 handleSubmit() */}
      <Form onSubmit={handleEditPost}>
        <div>
          <input
            className="form-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            className="form-textarea"
            rows="15"
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
        </div>
        <button type="submit" className="form-btn">
          Update
        </button>

        {/* 有錯誤訊息時，顯示在此 */}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </>
  );
}
