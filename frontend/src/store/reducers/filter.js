import * as actionTypes from '../actions/actions';

export const filterReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FILTER_TYPE:
      const newState = [...state, action.payload];
      return newState;
  }
};
