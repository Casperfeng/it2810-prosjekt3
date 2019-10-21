// Actions
const UPDATE_TYPE = 'UPDATE_TYPE';

// Reducer
export default function typesReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_TYPE:
      if (state.includes(action.payload)) {
        const newState = state.filter(value => value !== action.payload);
        return newState;
      }
      const newState = [...state, action.payload];
      return newState;
    default:
      return state;
  }
}

// Action creator
export function updateType(type = '') {
  return {
    type: UPDATE_TYPE,
    payload: type
  };
}
