// Actions
const SUBMIT_SEARCH = 'SUBMIT_SEARCH';

// Reducer
export default function searchReducer(state = '', action) {
  switch (action.type) {
    case SUBMIT_SEARCH:
      return action.payload;
    default:
      return state;
  }
}

// Action creator
export function makeSearch(search = '') {
  return {
    type: SUBMIT_SEARCH,
    payload: search
  };
}
