// Actions
const ASCENDING_NAME = 'ASCENDING_NAME';
const DESCENDING_NAME = 'DESCENDING_NAME';
const ASCENDING_ID = 'ASCENDING_ID';
const DESCENDING_ID = 'DESCENDING_ID';
const ASCENDING_VIEWS = 'ASCENDING_VIEWS';
const DESCENDING_VIEWS = 'DESCENDING_VIEWS';

// Reducer
export default function sortReducer(
  state = { sortBy: 'id', ascending: true },
  action
) {
  switch (action.type) {
    case ASCENDING_NAME:
      return { sortBy: 'name', ascending: true };
    case ASCENDING_ID:
      return { sortBy: 'id', ascending: true };
    case ASCENDING_VIEWS:
      return { sortBy: 'views', ascending: true };
    case DESCENDING_NAME:
      return { sortBy: 'name', ascending: false };
    case DESCENDING_ID:
      return { sortBy: 'id', ascending: false };
    case DESCENDING_VIEWS:
      return { sortBy: 'views', ascending: false };
    default:
      return state;
  }
}

// Action creator
export function fireAction(sortBy = 'id', ascending = true) {
  const payload = { sortBy, ascending };
  switch (sortBy) {
    case 'id':
      return { type: ascending ? ASCENDING_ID : DESCENDING_ID, payload };
    case 'name':
      return { type: ascending ? ASCENDING_NAME : DESCENDING_NAME, payload };
    case 'views':
      return { type: ascending ? ASCENDING_VIEWS : DESCENDING_VIEWS, payload };
    default:
      return;
  }
}
