// 從 redux 引入 combineReducers 這個方法
import { combineReducers } from 'redux';
// 引入 名為 'todo' 的 reducer
import todos from './todos';
// 引入 名為 'filters' 的 reducer
import filters from './filters';

// 合併 todos 以及 filters 兩個 reducer
export default combineReducers({
  todos,
  filters,
});
