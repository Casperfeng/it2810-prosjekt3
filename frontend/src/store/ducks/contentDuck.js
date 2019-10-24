// Actions
const SHOW_POKEMON = 'SHOW_POKEMON';
const SHOW_WORD_CLOUD = 'SHOW_WORD_CLOUD';

// Reducer
export default function contentReducer(state = true, action) {
  switch (action.type) {
    case SHOW_POKEMON:
      return true;
    case SHOW_WORD_CLOUD:
      return false;
    default:
      return state;
  }
}

// Action creator
export function selectPokemon(showPokemon = true) {
  return {
    type: SHOW_POKEMON
  };
}

export function selectWordCloud(showPokemon = false) {
  return {
    type: SHOW_WORD_CLOUD
  };
}
