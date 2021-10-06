import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postReducer';
import userReducer from './reducers/userReducer';

// 將 postReducer、userReducer 合併存在 store 內
const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

export default store;
