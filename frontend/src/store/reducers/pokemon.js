export const pokemonReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_POKEMON:
      const newState = action.payload;
      return [...state, ...newState];
  }
};
