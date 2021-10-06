import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 創建一個 provider
// (相當於 global 的區域，底下的 components 都可以拿到 Provider 內提供的 prop，是大家共用的)
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  // 將 store 放在 Provider 內，讓底下的 components 都可以拿取的到
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
