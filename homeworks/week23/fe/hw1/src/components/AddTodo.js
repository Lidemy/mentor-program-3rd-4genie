import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addTodo } from '../redux/actions';

const Input = styled.input.attrs({
  className: 'input-todo form-control',
})``;
const Button = styled.button.attrs({
  className: 'btn btn-add btn-outline-secondary',
})``;

export default function AddTodo() {
  // 使用 dispatch 傳遞待會要帶入的 action
  const dispatch = useDispatch();

  // 設定 input 欄位的值的狀態
  const [value, setValue] = useState('');

  // 設定按下 'Enter' 鍵後，執行新增 todo
  const handleKeyDown = (e) => {
    // 如果按下的為 'Enter' 鍵，且輸入的值不為空
    if (e.key === 'Enter' && value !== '') {
      // dispatch  'addTodo()' 這個的 action，並將 input 輸入的值帶入
      dispatch(addTodo(value));
      // 清空 input 欄位
      setValue('');
    }
  };

  return (
    <>
      {/* 輸入 input 的欄位，並且旁邊有'新增' 的按鈕 */}
      <div className="input-group mb-3">
        <Input
          type="text"
          placeholder="todo"
          value={value}
          //輸入後按下 'Enter'，新增 input 中的 todo
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="input-group-append">
          <Button
            // 點擊 '新增' 的按鈕後，dispatch 'addTodo()' 這個的 action，並將 input 輸入的值帶入
            onClick={() => {
              dispatch(addTodo(value));
              // 清空 input 欄位
              setValue('');
            }}
          >
            新增
          </Button>
        </div>
      </div>
    </>
  );
}
