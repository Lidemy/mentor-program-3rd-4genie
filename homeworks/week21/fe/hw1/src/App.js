import React from 'react';
import styled from 'styled-components';
import useTodos from './useTodos';
import Todo from './Todo';
import PropTypes from 'prop-types';
import './App.css';

const Title = styled.h1`
  margin-top: 10px;
  text-align: center;
`;
const Todolist = styled.div``;
const Filters = styled.div``;
const InputContainer = styled.div``;
const Input = styled.input``;
const Button = styled.button``;

export default function App() {
  //從 useTodos.js 傳入 props
  const {
    filterValue,
    todoCotentRef,
    handleAddTodo,
    handleKeyDown,
    handleDeleteTodo,
    handleToggleIsDone,
    handleClearIsDoneTodos,
    handleFilter,
    editTodo,
    handleUnfinishedCount,
  } = useTodos();

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <Title>Todo List</Title>

            {/* 輸入 input 的欄位，並且旁邊有'新增' 的按鈕 */}
            <InputContainer className="input-group mb-3">
              <Input
                ref={todoCotentRef}
                type="text"
                className="input-todo form-control"
                placeholder="todo"
                //輸入後按下 'Enter'，新增 input 中的 todo
                onKeyDown={handleKeyDown}
              />
              <div className="input-group-append">
                <Button
                  // 點擊按鈕後， 新增 input 中的 todo
                  onClick={handleAddTodo}
                  className="btn btn-add btn-outline-secondary"
                >
                  新增
                </Button>
              </div>
            </InputContainer>

            {/* 顯示 Todos 的內容  */}
            <Todolist className="todos list-group">
              {filterValue.map((todo) => (
                // 顯示每一個 todo
                <Todo
                  key={todo.id}
                  todo={todo}
                  handleDeleteTodo={handleDeleteTodo}
                  handleToggleIsDone={handleToggleIsDone}
                  editTodo={editTodo}
                />
              ))}
            </Todolist>

            {/* todos 的篩選功能 */}
            <Filters className="info mt-1 d-flex justify-content-between align-items-center">
              <div>
                <span className="uncomplete-count">
                  {handleUnfinishedCount()}
                </span>
                個未完成
              </div>
              <div className="options d-flex">
                <div className="active" onClick={handleFilter} selected>
                  全部
                </div>
                <div className="ml-2" onClick={handleFilter}>
                  未完成
                </div>
                <div className="ml-2" onClick={handleFilter}>
                  已完成
                </div>
              </div>
              <div onClick={handleClearIsDoneTodos} className="clear-all">
                移除已完成待辦事項
              </div>
            </Filters>
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
