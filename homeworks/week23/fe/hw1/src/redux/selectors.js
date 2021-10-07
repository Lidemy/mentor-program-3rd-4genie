// 把 store 的 state 儲存在指定的容器中
export const selectTodos = (store) => store.todos.todos;
export const filterTodos = (store) => store.filters.filters;
