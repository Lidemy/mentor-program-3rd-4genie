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

// const Todolist = styled.div.attrs(() => ({
//   className: 'todos list-group',
// }))``;

const Todolist = styled.div.attrs({
  className: 'todos list-group',
})``;
const Filters = styled.div.attrs({
  className: 'info mt-1 d-flex justify-content-between align-items-center',
})``;
const InputContainer = styled.div.attrs({
  className: 'input-group mb-3',
})``;
const Input = styled.input.attrs({
  className: 'input-todo form-control',
})``;
const Button = styled.button.attrs({
  className: 'btn btn-add btn-outline-secondary',
})``;

export default function App() {
  //從 useTodos.js 傳入 props
  const {
    todos,
    todoCotentRef,
    //filterValue,
    handleAddTodo,
    handleKeyDown,
    handleDeleteTodo,
    handleToggleIsDone,
    handleClearIsDoneTodos,
    updateFilter,
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
            <InputContainer>
              <Input
                ref={todoCotentRef}
                type="text"
                placeholder="todo"
                //輸入後按下 'Enter'，新增 input 中的 todo
                onKeyDown={handleKeyDown}
              />
              <div className="input-group-append">
                <Button
                  // 點擊按鈕後， 新增 input 中的 todo
                  onClick={handleAddTodo}
                >
                  新增
                </Button>
              </div>
            </InputContainer>

            {/* 顯示 Todos 的內容  */}
            <Todolist>
              {todos.map((todo) => (
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
            <Filters>
              <div>
                <span className="uncomplete-count">
                  {handleUnfinishedCount()}
                </span>
                個未完成
              </div>
              <div className="options d-flex">
                <div className="active" onClick={() => updateFilter('all')}>
                  全部
                </div>
                <div className="ml-2" onClick={() => updateFilter('undone')}>
                  未完成
                </div>
                <div className="ml-2" onClick={() => updateFilter('done')}>
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
