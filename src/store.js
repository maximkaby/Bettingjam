import { createStore, combineReducers } from 'redux';

function appReducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const reducer = combineReducers({
  state: appReducer
});

const store = createStore(reducer);

export default store;
