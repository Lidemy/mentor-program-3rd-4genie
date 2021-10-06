import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editTodo, deleteTodo, toggleTodo } from '../redux/actions';

const EditInput = styled.input`
  font-size: 14px;
  padding: 1px;
  border: solid 0.2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: none;
`;

const EditButton = styled.button.attrs({
  className: 'todo-btns btn btn-info',
})``;
const DeleteButton = styled.button.attrs({
  className: 'todo-btns btn btn-danger',
})``;

//從 App.js 傳入 props
export default function Todo({ todo }) {
  // 儲存是否正在 edit 的狀態
  const [isUpdating, setIsUpdating] = useState(false);

  // 使用 dispatch  待會可傳遞要帶入的 action
  const dispatch = useDispatch();

  // 儲存編輯欄 input 中輸入的值
  const inputRef = useRef();

  // 點擊 '編輯' 後，更新 isUpdating 的編輯狀態為 true
  const handleEditClick = () => {
    setIsUpdating(true);
  };

  // 編輯 todo：
  const EditTodo = (id) => {
    // 設變數 content 取得編輯的 input 欄位的值
    const content = inputRef.current.value;

    // 如果編輯的 input 欄位沒有值 => isUpdating 狀態更新為 false
    if (!content) {
      return setIsUpdating(false);
    }

    // 有值時，dispatch 一個名為 "editTodo()" 的 action，並帶入 'id' 與'content'，其中，'content' 為編輯的 input 欄位輸入的值
    dispatch(editTodo(id, content));

    //  將 isUpdating 狀態更新為 false
    setIsUpdating(false);
  };

  // 點擊 '修改完成' 後，執行 EditTodo()
  const handleFinishedEditClick = (id) => {
    EditTodo(id);
  };

  // 編輯欄按下 'Enter' 鍵後，執行 EditTodo()
  const handleKeyDown = (e, id) => {
    // 若按下的鍵非 'Enter'=> return
    if (e.key !== 'Enter') return;
    // 若為'Enter',執行 EditTodo()
    EditTodo(id);
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
          <EditInput
            ref={inputRef}
            onKeyDown={() => {
              handleKeyDown(todo.id);
            }}
          ></EditInput>
        ) : (
          <>
            <input
              type="checkbox"
              className="custom-control-input"
              id={todo.id}
              onClick={() => {
                // 點擊時，dispatch 傳遞 toggleTodo() 這個 action，並帶入 todo 的 id
                dispatch(toggleTodo(todo.id));
              }}
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
        <EditButton onClick={handleEditClick}>編輯</EditButton>
      ) : (
        <EditButton
          // 點擊按鈕時，執行 handleFinishedEditClick
          onClick={() => {
            handleFinishedEditClick(todo.id);
          }}
        >
          修改完成
        </EditButton>
      )}

      <DeleteButton
        className="todo-btns btn btn-danger"
        // 點擊時，dispatch 傳遞 deleteTodo() 這個 action，並帶入 todo 的 id
        onClick={() => {
          dispatch(deleteTodo(todo.id));
        }}
      >
        刪除
      </DeleteButton>
    </div>
  );
}

Todo.propTypes = {
  todo: PropTypes.object,
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
  editTodo: PropTypes.func,
};
