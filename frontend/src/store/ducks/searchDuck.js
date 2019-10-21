// Actions
const UPDATE_SEARCH = 'UPDATE_SEARCH';

// Reducer
export default function searchReducer(state = '', action) {
  switch (action.type) {
    case UPDATE_SEARCH:
      let newState = action.payload;
      return newState;
    default:
      return state;
  }
}

// Action creator
export function updateSearch(search = '') {
  return {
    type: UPDATE_SEARCH,
    payload: search
  };
}
