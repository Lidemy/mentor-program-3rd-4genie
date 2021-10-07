import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './App.css';
import { selectTodos, filterTodos } from './redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { setTodosToken, getTodosFromToken } from './utils';
import { addTodosFromLocalStorage } from './redux/actions';
import AddTodo from './Components/AddTodo';
import Filters from './Components/Filters';
import Todo from './Components/Todo';

const Title = styled.h1`
  margin-top: 10px;
  text-align: center;
`;

const Todolist = styled.div.attrs({
  className: 'todos list-group',
})``;

export default function App() {
  // 變數 todos 為拿取 selectTodos 中的 state 狀態
  const todos = useSelector(selectTodos);

  // 變數 todosfilter 為拿取 filterTodos 中的 state 狀態
  const todosfilter = useSelector(filterTodos);

  // 使用 dispatch 傳遞待會要帶入的 action
  const dispatch = useDispatch();

  // 拿取 Local Storage 中的 todos
  useEffect(() => {
    // 如果 token 中有儲存 todos 的話
    if (getTodosFromToken()) {
      // 使用 dispatch 傳遞 "addTodosFromLocalStorage" 這個 action，並帶入 token 中的 todos
      dispatch(addTodosFromLocalStorage(getTodosFromToken()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // dependency： 為空值時，即表示要在一開始渲染時執行一次
  }, []);

  // todos 的狀態有變化時，儲存到 localStorage
  useEffect(() => {
    setTodosToken(todos);
    // dependency： 當偵測到 todos 改變時要重新渲染
  }, [todos]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <Title>Todo List</Title>

            {/* 輸入 input 的欄位，並且旁邊有'新增' 的按鈕 */}
            <AddTodo />

            {/* 顯示 Todos 的內容  */}
            <Todolist>
              {todos
                .filter((todo) => {
                  if (todosfilter === 'All') return todo;
                  return todosfilter === 'Done' ? todo.isDone : !todo.isDone;
                })
                .map((todo) => (
                  <Todo key={todo.id} todo={todo} />
                ))}
            </Todolist>

            {/* todos 的篩選功能 */}
            <Filters />
          </div>
        </div>
      </div>
    </>
  );
}

App.propTypes = {
  filterValue: PropTypes.array,
  handleAddTodo: PropTypes.func,
  handleKeyDown: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
  handleClearIsDoneTodos: PropTypes.func,
  handleFilter: PropTypes.func,
  editTodo: PropTypes.func,
  handleUnfinishedCount: PropTypes.func,
};
