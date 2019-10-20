export const makeFilterChoice = (type = '') => {
  dispatch({ type: 'FILTER_TYPE', payload: type });
};
