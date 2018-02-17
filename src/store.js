import { createStore, combineReducers, applyMiddleware } from 'redux';

function appReducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
/* eslint-disable*/

const dataLoadMiddleware = store => next => action => {
  // console.log('dispatching', action);
  const result = next(action);
  // console.log('next state', store.getState());
  switch (action.type) {
    case 'LOAD_DATA':
      fetch('/data.json')
        .then((res) => {
        return res.json();

        }).then((res) => {
        console.log(res);
        store.dispatch({ type: 'RECEIVE__DATA', payload: res });
      });
      break;
    default:
  }
  return result;
};


const reducer = combineReducers({
  state: appReducer
});

const store = createStore(
  reducer,
  applyMiddleware(dataLoadMiddleware)
);

export default store;
