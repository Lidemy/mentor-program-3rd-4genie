// 設定儲存到 localStorage 的 key 的名稱
const LOCAL_STORAGE_TODOS_KEY = 'todos';

// 將 todos  儲存在 localStorage
export const setTodosToken = (todos) => {
  localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todos));
};
// 從 localStorage 中拿取 todos
export const getTodosFromToken = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY));
};
