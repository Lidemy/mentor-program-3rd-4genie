import { v4 as uuidv4 } from 'uuid';
import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  DELETE_FINISHED_TODO,
  SET_FILTER,
  GETTODOS_FROM_LOCAL_STORAGE,
} from './actionTypes.js';

//  新增 todo：設定 addTodo 這個 action 要帶給 reducer 的 type 以及 payload，
export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: uuidv4(),
    content,
    isDone: false,
  },
});

// 編輯 todo：設定 editTodo 這個 action 要帶給 reducer 的 type 以及 payload
export const editTodo = (id, content) => ({
  type: EDIT_TODO,
  payload: {
    id,
    content,
  },
});

// 刪除 todo：設定 deleteTodo 這個 action 要帶給 reducer 的 type 以及 payload
export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: {
    id,
  },
});

// 是否完成 todo：設定 toggleTodo 這個 action 要帶給 reducer 的 type 以及 payload
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: {
    id,
  },
});

// 刪除已完成 todo：設定 deleteFinishedTodo 這個 action 要帶給 reducer 的 type 以及 payload
export const deleteFinishedTodo = () => ({
  type: DELETE_FINISHED_TODO,
});

// 篩選 todo：設定 setFilter 這個 action 要帶給 reducer 的 type 以及 payload
export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: {
    filter,
  },
});

// 拿 Local Storage 的 todos：設定 addTodosFromLocalStorage 這個 action 要帶給 reducer 的 type 以及 payload
export const addTodosFromLocalStorage = (todos) => ({
  type: GETTODOS_FROM_LOCAL_STORAGE,
  payload: {
    todos,
  },
});
