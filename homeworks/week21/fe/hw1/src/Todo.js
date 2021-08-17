import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const EditInput = styled.input`
  font-size: 14px;
  padding: 1px;
  border: solid 0.2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: none;
`;

const Button = styled.button``;

export default function Todo({
  //從 App.js 傳入 props
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
  editTodo,
}) {
  // 儲存是否正在 edit 的狀態
  const [isUpdating, setIsUpdating] = useState(false);
  // // 儲存 input 欄中輸入的值
  const inputRef = useRef();

  // 點擊 '刪除' 後:
  const handleDeleteClick = () => {
    // 執行 handleDeleteTodo(), 並帶入參數:todo 的 id
    handleDeleteTodo(todo.id);
  };

  // 點擊 'check box' 按鈕後，執行 handleToggleIsDone(), 並帶入參數:todo 的 id
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id);
  };

  // 點擊 '編輯' 後，更新 isUpdating 的編輯狀態為 true
  const handleEditClick = () => {
    setIsUpdating(true);
  };

  // 編輯 todo：
  const EditTodo = () => {
    // 如果編輯的 input 欄位沒有值 => isUpdating 狀態更新為 false
    if (!inputRef.current.value) {
      return setIsUpdating(false);
    }
    // 有值時，執行 editTodo()，利用 ES6 解構賦值將 todo 的其他資料保持不變， 'content' 狀態改為編輯的 input 欄位輸入的值
    editTodo({
      ...todo,
      content: inputRef.current.value,
    });

    //  將 isUpdating 狀態更新為 false
    setIsUpdating(false);
  };

  // 點擊 '修改完成' 後，執行 EditTodo()
  const handleFinishedEditClick = () => {
    EditTodo();
  };

  // 編輯欄按下 'Enter' 鍵後，執行 EditTodo()
  const handleKeyDown = (e) => {
    // 若按下的鍵非 'Enter'=> return
    if (e.key !== 'Enter') return;
    // 若為'Enter',執行 EditTodo()
    EditTodo();
  };

  return (
    <div
      key={todo.id}
      className="todo list-group-item list-group-item-action d-flex justify-content-between align-items-center"
    >
      <div className="todo__content-wrapper custom-control custom-checkbox">
        {/* 正在 edit 的狀態為 true 時，顯示編輯的 input 欄位 */}
        {/* 否則，顯示 todo */}
        {isUpdating ? (
          <EditInput ref={inputRef} onKeyDown={handleKeyDown}></EditInput>
        ) : (
          <>
            <input
              type="checkbox"
              className="custom-control-input"
              id={todo.id}
              // 點擊時，執行 handleToggleClick
              onClick={handleToggleClick}
              defaultChecked={todo.isDone ? 'checked' : ''}
            />
            <label
              className="todo__content custom-control-label"
              htmlFor={todo.id}
            >
              {todo.content}
            </label>
          </>
        )}
      </div>

      {/* edit 的狀態為 false 時，顯示'編輯' 按鈕}
      {/* 否則，顯示 '修改完成' 按鈕 */}
      {!isUpdating ? (
        // 點擊按鈕時，執行 handleEditClick
        <Button onClick={handleEditClick} className="todo-btns btn btn-info">
          編輯
        </Button>
      ) : (
        <Button
          // 點擊按鈕時，執行 handleFinishedEditClick
          onClick={handleFinishedEditClick}
          className="todo-btns btn btn-info"
        >
          修改完成
        </Button>
      )}

      <Button
        // 點擊按鈕時，執行 handleDeleteClick
        onClick={handleDeleteClick}
        className="todo-btns btn btn-danger"
      >
        刪除
      </Button>
    </div>
  );
}

Todo.propTypes = {
  todo: PropTypes.object,
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
  editTodo: PropTypes.func,
};
