import { createSlice } from '@reduxjs/toolkit';
import {
  register as registerAPI,
  login as loginAPI,
  getMe,
} from '../../WebAPI';
import { setAuthToken } from '../../utils';

export const userReducer = createSlice({
  // 設定 name 以及初始的 state
  name: 'users',
  initialState: {
    isLoadingLogin: false,
    user: null,
    response: null,
    errorMessage: null,
  },
  // 設定接收到不同的 action 後，reducer 會對 state 做的處理
  reducers: {
    setIsLoadingLogin: (state, action) => {
      state.isLoadingLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setUserLogout: (state) => {
      state.user = null;
    },
  },
});

export const {
  setIsLoadingLogin,
  setUser,
  setResponse,
  setErrorMessage,
  setUserLogout,
} = userReducer.actions;

// 註冊
export const register = (username, nickname, password) => (dispatch) => {
  dispatch(setIsLoadingLogin(true));
  // 執行 register 的 API，並將 username, nickname, password 帶入
  registerAPI(username, nickname, password)
    .then((data) => {
      // 如果有錯
      if (data.ok === 0) {
        dispatch(setIsLoadingLogin(false));
        // 回傳錯誤訊息
        // dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
        return dispatch(setErrorMessage(data.message));
      }
      // 否則將回傳的 token 存到 localStorage
      setAuthToken(data.token);
      // 將 token 帶回 API，以進行身份驗證
      getMe().then((response) => {
        dispatch(setIsLoadingLogin(true));
        // 如果身份驗證有誤
        if (response.ok !== 1) {
          // token 清空
          setAuthToken(null);
          dispatch(setIsLoadingLogin(false));
          // 如果有錯，回傳錯誤訊息
          // dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
          return dispatch(setErrorMessage(response.toString()));
        }
        // 身份驗證通過：更新 user 的 state
        dispatch(setUser(response.data));
        dispatch(setIsLoadingLogin(false));
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(setIsLoadingLogin(false));
    });
};

// 登入
export const login = (username, password) => (dispatch) => {
  dispatch(setIsLoadingLogin(true));
  // 執行 loginAPI 的 API，並將 username, password 帶入
  loginAPI(username, password)
    .then((data) => {
      // 如果有錯
      if (data.ok === 0) {
        dispatch(setIsLoadingLogin(false));
        // 回傳錯誤訊息
        // dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
        return dispatch(setErrorMessage(data.message));
      }
      // 否則將回傳的 token 存到 localStorage
      setAuthToken(data.token);
      // 將 token 帶回 API，以進行身份驗證
      getMe().then((response) => {
        dispatch(setIsLoadingLogin(true));
        // 如果身份驗證有誤
        if (response.ok !== 1) {
          setAuthToken(null);
          dispatch(setIsLoadingLogin(false));
          // 回傳錯誤訊息
          // dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
          return dispatch(setErrorMessage(response.toString()));
        }
        // 身份驗證通過：更新 user 的 state
        dispatch(setUser(response.data));
        dispatch(setIsLoadingLogin(false));
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(setIsLoadingLogin(false));
    });
};

// set token
export const getToken = () => (dispatch) => {
  // 執行 getMe 的 API
  getMe().then((response) => {
    dispatch(setIsLoadingLogin(true));
    // 如果身份驗證有誤
    if (response.ok !== 1) {
      // token 清空
      setAuthToken(null);
      dispatch(setIsLoadingLogin(false));
      // 回傳錯誤訊息
      // dispatch 一個名為 'setErrorMessage' 的 action 到 postReducer，讓 errorMessage 的狀態為 null
      return dispatch(setErrorMessage(response.toString()));
    }

    // 身份驗證通過：更新 user 的 state
    dispatch(setUser(response.data));
    dispatch(setIsLoadingLogin(false));
  });
};

export default userReducer.reducer;
