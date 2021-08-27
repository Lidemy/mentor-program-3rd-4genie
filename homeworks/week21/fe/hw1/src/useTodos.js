import { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { setTodosToken, getTodosFromToken } from './utils';

export default function useTodos() {
  // 儲存 todos 的狀態，
  const [todos, setTodos] = useState([]);

  // 儲存 input 欄中輸入的值
  const todoCotentRef = useRef();

  // 儲存 filter 的狀態，預設值為 todos
  const [filterValue, setFilterValue] = useState(todos);

  // 初始化 todos：如果 localStorage 有 todos 的值，拿取 localStorage 中的 todos
  useEffect(() => {
    if (getTodosFromToken()) {
      setTodos(getTodosFromToken());
    }
  }, []);

  // todos 的狀態有變化時，儲存到 localStorage，並更新 Filter 的狀態
  useEffect(() => {
    setTodosToken(todos);
    setFilterValue(todos);
  }, [todos]);

  // 新增 todo ：
  function AddTodo() {
    // 拿取 input 的值
    const inputTodo = todoCotentRef.current.value;
    // 如果為空，不進行任何動作
    if (inputTodo === '') return;
    // 若有值，將 input 的值新增成一筆 todo 到 setTodos, 以更新 todos
    setTodos([
      {
        id: uuidv4(),
        content: inputTodo,
        isDone: false,
      },
      ...todos,
    ]);
    // 然後將 input 欄位清空
    todoCotentRef.current.value = null;
  }

  // handleAddTodo: 執行 AddTodo()
  const handleAddTodo = () => {
    AddTodo();
  };

  // 當按下'Enter' 鍵，且 input 欄位中的值不為空時，執行 AddTodo()
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && todoCotentRef.current.value !== '') {
      AddTodo();
    }
  };

  // 編輯 todo:
  const editTodo = useCallback(
    (newTodo) => {
      // 用 map 處理每一個 todo：
      // 新 todo 的 id 與原有的 todo id 相同時，新 todo 取代此 todo， 其餘的 todo 不變  =>
      setTodos(todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)));
    },
    // dependency： 當偵測到 todos 改變時才再重新渲染
    [todos]
  );

  // 刪除 todo：
  const handleDeleteTodo = (id) => {
    // 帶入要刪除的 todo 的 id，
    // 用 filter 留下 todo 的 id 不等於 id 的 todo 們，
    // 用 setTodos 更新 todos 的資料
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 刪除已完成的 todo：
  const handleClearIsDoneTodos = () => {
    // 用 filter 留下 isDone 狀態為 false 的 todo 們，
    // 用 setTodos 更新 todo 的資料
    setTodos(todos.filter((todo) => !todo.isDone));
  };

  // 將 todo 狀態 '未完成' 改為 '已完成'；'已完成' 改為 '未完成'：
  const handleToggleIsDone = (id) => {
    // 帶入要修改的 todo 的 id，並用 setTodos  更新 todos 的資料
    setTodos(
      // 用 map 處理每一個 todo：
      todos.map((todo) => {
        // 若不是要修改 id 的 todo  => 不做任何操作；
        if (todo.id !== id) return todo;
        // 要修改的 todo => 使用 ES6 解構賦值將 todo 的其他資料保持不變， 'isDone' 狀態改為當前相反的狀態
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  // 計算未完成 todo 的數量：
  const handleUnfinishedCount = () =>
    // 用 filter 留下 isDone 狀態為 false 的 todo 們，
    // 用 length 算出未完成 todo 總數
    todos.filter((todo) => !todo.isDone).length;

  // 篩選 todos：
  const handleFilter = useCallback(
    (e) => {
      // 取出篩選 button 的 innerText
      const selectedItem = e.target.innerText;
      // 如果篩選 '全部' => todos
      if (selectedItem === '全部') {
        setFilterValue(todos);
      }
      // 如果篩選 '已完成' => 用 filter 選出 todo 狀態為 isDone 為true 的 todo， 以 setFilterValue 更新 filterValue
      if (selectedItem === '已完成') {
        setFilterValue(todos.filter((todo) => todo.isDone));
      }
      // 如果篩選 '未完成' => 用 filter 選出 todo 狀態為 isDone 為 false 的 todo， 以 setFilterValue 更新
      if (selectedItem === '未完成') {
        setFilterValue(todos.filter((todo) => !todo.isDone));
      }
    },
    // dependency： 當偵測到 todos 改變時才再重新渲染
    [todos]
  );

  return {
    filterValue,
    todoCotentRef,
    AddTodo,
    handleAddTodo,
    handleKeyDown,
    handleDeleteTodo,
    handleToggleIsDone,
    handleClearIsDoneTodos,
    handleFilter,
    editTodo,
    handleUnfinishedCount,
  };
}
