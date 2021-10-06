import { SET_FILTER } from '../actionTypes';

const initialState = {
  filters: 'All',
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      const { filter } = action.payload;
      return {
        ...state,
        filters: filter,
      };
    }
    default: {
      return state;
    }
  }
}
