import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  DELETE_FINISHED_TODO,
  GETTODOS_FROM_LOCAL_STORAGE,
} from '../actionTypes';

// 設定 state 的初始值
const initialState = {
  todos: [],
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content, isDone } = action.payload;
      return {
        ...state,
        todos: [...state.todos, { id, content, isDone }],
      };
    }
    case EDIT_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            content,
          };
        }),
      };
    }

    case DELETE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      };
    }

    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    }

    case DELETE_FINISHED_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.isDone),
      };
    }

    case GETTODOS_FROM_LOCAL_STORAGE: {
      const { todos } = action.payload;
      return {
        ...state,
        todos: todos,
      };
    }

    default: {
      return state;
    }
  }
}
