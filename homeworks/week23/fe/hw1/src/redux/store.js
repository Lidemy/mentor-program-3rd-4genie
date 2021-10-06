// 創建一個 store
import { createStore } from 'redux';
import rootReducer from './reducers';

// 把 reducers 儲存在這個 store 裡
export default createStore(
  rootReducer,
  // 讓瀏覽器的 redux devtool 可以 debug
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
