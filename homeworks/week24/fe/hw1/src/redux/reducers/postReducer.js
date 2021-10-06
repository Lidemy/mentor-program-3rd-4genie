import { createSlice } from '@reduxjs/toolkit';
import {
  getPosts as getPostsAPI,
  getPost as getPostAPI,
  addNewPost,
  editPost,
  deletePost as deletePostAPI,
  getLimitPosts,
} from '../../WebAPI';

import { getPages } from '../../utils';

export const postReducer = createSlice({
  // 設定 name 以及初始的 state
  name: 'posts',
  initialState: {
    isLoadingPost: false,
    post: null,

    isLoadingNewPost: false,
    newPostResponse: null,

    isUpdatingPost: false,
    errorMessage: null,
    limit: 5,
    allPageNumber: [],
  },

  // 設定接收到不同的 action 後，reducer 會對 state 做的處理
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setIsLoadingNewPost: (state, action) => {
      state.isLoadingNewPost = action.payload;
    },
    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
    setIsUpdatingPost: (state, action) => {
      state.isUpdatingPost = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setAllPageNumber: (state, action) => {
      state.allPageNumber = action.payload;
    },
  },
});

export const {
  setIsLoadingPost,
  setPost,
  setNewPostResponse,
  setIsLoadingNewPost,
  setIsUpdatingPost,
  setErrorMessage,
  setAllPageNumber,
} = postReducer.actions;

// 拿到全部文章：
export const getPosts = (limit) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  // 執行 getPosts 的 API，並將 limit 帶入
  return getPostsAPI(limit)
    .then((res) => {
      // 如果有錯
      if (res.ok === 0) {
        dispatch(setIsLoadingPost(false));
        // 回傳錯誤訊息
        // dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
        return dispatch(setErrorMessage(res.message));
      }
      // 如果 API 連線成功
      // 總頁數由 response 的 header 中 "x-total-count" 取得總共的留言筆數，然後再除以每頁的筆數，無條件進位
      let totalPages = Math.ceil(res.headers.get('x-total-count') / limit);

      // 更新 allPageNumber 的狀態
      dispatch(setAllPageNumber(getPages(totalPages)));
      return res.json();
    })
    .then((data) => {
      // 到第一頁
      // 執行 getLimitPosts 的 API，並將 1、 limit 帶入
      getLimitPosts(1, limit).then((data) => {
        // 更新 post 的 state 為從 getPost API 接收到的資料
        dispatch(setPost(data));
        dispatch(setIsLoadingPost(false));
        // 回傳接收到的資料
        return data;
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(setIsLoadingPost(false));
    });
};

// 拿到單一文章：
export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  // 執行 getPost 的 API，並將 id 帶入
  return getPostAPI(id)
    .then((res) => {
      // 如果有錯
      if (res.ok === 0) {
        dispatch(setIsLoadingPost(false));
        // 回傳錯誤訊息
        // dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
        return dispatch(setErrorMessage(res.message));
      }

      // 否則，更新 post 的 state 為從 getPost API 接收到的資料
      dispatch(setPost(res));
      dispatch(setIsLoadingPost(false));
      // 回傳接收到的資料
      return res;
    })
    .catch((err) => {
      console.log(err);
      dispatch(setIsLoadingPost(false));
    });
};

// 新增文章：
export const newPost = (title, body) => (dispatch) => {
  dispatch(setIsLoadingNewPost(true));
  // 執行 addNewPost 的 API，並將 title、body 帶入
  return addNewPost(title, body).then((res) => {
    // 如果有錯
    if (res.ok === 0) {
      dispatch(setIsLoadingPost(false));
      // 回傳錯誤訊息
      // dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
      return dispatch(setErrorMessage(res.message));
    }

    // 否則，更新 newPostResponse 的 state 為從 addNewPost 接收到的資料
    dispatch(setNewPostResponse(res));
    dispatch(setIsLoadingNewPost(false));
    // 回傳接收到的資料
    return res;
  });
};

// 編輯文章：
export const updatePost = (id, title, body) => (dispatch) => {
  dispatch(setIsUpdatingPost(true));
  // 執行 editPost 的 API，並將 id、 title、body 帶入
  return editPost(id, title, body)
    .then((res) => {
      // 如果有錯
      if (res.ok === 0) {
        dispatch(setIsLoadingPost(false));
        // 回傳錯誤訊息
        // dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
        return dispatch(setErrorMessage(res.message));
      }
      // 否則，更新 newPostResponse 的 state 為從 editPost 接收到的資料
      dispatch(setNewPostResponse(res));
      dispatch(setIsUpdatingPost(false));
      // 回傳接收到的資料
      return res;
    })
    .catch((err) => {
      console.log(err);
      dispatch(setIsLoadingPost(false));
    });
};

// 刪除文章：
export const deletePost = (id) => (dispatch) => {
  // 執行 deletePost 的 API，並將 id 帶入
  // 然後回傳接收到的資料
  return deletePostAPI(id).then((res) => res);
};

export default postReducer.reducer;
