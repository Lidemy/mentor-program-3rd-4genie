import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, deleteFinishedTodo } from '../redux/actions';

export default function Filters() {
  // 使用 dispatch 傳遞待會要帶入的 action
  const dispatch = useDispatch();
  // filter 的三種狀態的陣列
  const Filtername = ['All', 'Undone', 'Done'];
  return (
    <>
      <div className="info mt-1 d-flex justify-content-between align-items-center">
        <div className="options d-flex mt-3">
          <div
            className="active"
            onClick={() => {
              // 點擊時，dispatch 傳遞 setFilter() 這個 action，並帶入 filter 的狀態
              dispatch(setFilter(Filtername[0]));
            }}
          >
            全部
          </div>
          <div
            className="ml-2"
            onClick={() => {
              // 點擊時，dispatch 傳遞 setFilter() 這個 action，並帶入 filter 的狀態
              dispatch(setFilter(Filtername[1]));
            }}
          >
            未完成
          </div>
          <div
            className="ml-2"
            onClick={() => {
              // 點擊時，dispatch 傳遞 setFilter() 這個 action，並帶入 filter 的狀態
              dispatch(setFilter(Filtername[2]));
            }}
          >
            已完成
          </div>
        </div>

        <div
          onClick={() => {
            // 點擊時，dispatch 傳遞 deleteFinishedTodo() 這個 action
            dispatch(deleteFinishedTodo());
          }}
          className="clear-all"
        >
          移除已完成待辦事項
        </div>
      </div>
    </>
  );
}
