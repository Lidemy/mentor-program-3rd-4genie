import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { newPost, setErrorMessage } from '../../redux/reducers/postReducer';
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

export default function NewPostPage() {
  // 設定 title 的 state
  const [title, setTitle] = useState('');
  // 設定 content 的 state
  const [content, setContent] = useState('');

  // 設定變數 dispatch，之後可以將 action 傳送到 reducer 中
  const dispatch = useDispatch();

  // 設定變數 newPostResponse，從 store 的 posts 中拿到 newPostResponse 的 state
  const newPostResponse = useSelector((store) => store.posts.newPostResponse);

  // 設定變數 isLoadingNewPost，從 store 的 posts 中拿到 isLoadingNewPost 的 state
  const isLoadingNewPost = useSelector((store) => store.posts.isLoadingNewPost);

  // 設定變數 prevIsUpdatingPost，儲存 isUpdatingPost 上一個的 state 狀態
  const prevIsLoadingNewPost = usePrevious(isLoadingNewPost);

  // 設定變數 errorMessage，從 store 的 posts 中拿到 errorMessage 的 state
  const errorMessage = useSelector((store) => store.users.errorMessage);

  // 是否正在點擊'Publish'按鈕，預設為 false
  const isSubmit = useRef(false);

  const history = useHistory();

  // 執行提交功能
  const handleSubmit = () => {
    // e.preventDefault();

    // 將錯誤訊息清除
    //dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
    dispatch(setErrorMessage(null));

    // 如果正在點擊 'Publish' 按鈕，不進行任何動作
    if (isSubmit.current) return;

    // 否則，將正在點擊 'Publish' 按鈕狀態設為 true
    isSubmit.current = true;

    // 新增文章：dispatch 一個名為 'newPost' 的 action 到 postReducer，並將 id、title、content 帶入 action 中
    dispatch(newPost(title, content));

    // 2. 新增文章後清除 newPostResponse => 拿到 redux thunk return 的 Promise，然後處理
    // dispatch(newPost(title, content)).then((newPostResponse) => {
    //   if (newPostResponse && newPostResponse.id) {
    //     history.push('/posts/' + newPostResponse.id);
    //   }
    // });
  };

  //  1.  新增文章後清除 newPostResponse 的 state
  // newPostResponse => 將 setNewPostResponse 清空

  // useEffect(() => {
  //   return () => {
  //     dispatch(setNewPostResponse(null));
  //   };
  // });

  // useEffect(() => {
  //   if (newPostResponse && newPostResponse.id) {
  //     history.push('/posts/' + newPostResponse.id);
  //   }
  // }, [newPostResponse, history]);

  // 3. 利用 IsLoadingNewPost 的狀態控制
  // 發 request 之前，isLoadingNewPost: false, prevIsLoadingNewPost: false
  // request,isLoadingNewPost: true, prevIsLoadingNewPost: false
  // response,isLoadingNewPost: true, prevIsLoadingNewPost: true

  useEffect(() => {
    if (!isLoadingNewPost && prevIsLoadingNewPost) {
      if (newPostResponse && newPostResponse.id) {
        history.push('/posts/' + newPostResponse.id);
      }
    }
  }, [newPostResponse, history, isLoadingNewPost, prevIsLoadingNewPost]);

  // 新增文章後清除 errorMessage
  // => 將 setErrorMessage 清空
  useEffect(() => {
    return () => {
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);

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
