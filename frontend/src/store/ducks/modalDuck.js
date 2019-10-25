import axios from 'axios';

// Actions
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

// Reducer
export default function modalReducer(state = {}, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...action.payload, show: true };
    case CLOSE_MODAL:
      return { ...action.payload, show: false };
    default:
      return state;
  }
}

// Action creator
export function openModal(
  pokemon = {
    id: 0,
    types: [],
    stats: [],
    name: '',
    views: 0
  }
) {
  return dispatch =>
    axios
      .put(`http://it2810-03.idi.ntnu.no:5000/pokemon/${pokemon.id}`)
      .then(() =>
        dispatch({
          type: OPEN_MODAL,
          payload: pokemon
        })
      )
      .catch(err => console.log(err));
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
