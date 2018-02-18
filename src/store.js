import { createStore, combineReducers, applyMiddleware } from 'redux';

function appReducer(state = {}, action) {
  switch (action.type) {
    case 'SHOW_MATCHES':
      return 0;
    default:
      return state;
  }
}

function UEFAReducer(state = [], action) {
  switch (action.type) {
    case 'SHOW_UEFA_MATCHES':
      return action.payload.fixtures;
    default:
      return state;
  }
}
/* eslint-disable*/
const headers = {
  'X-AUTH-TOKEN': 'dda7045969724a30a0abf9a98b5201a6'
}

const UEFALoadMiddleware = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case 'LOAD_DATA': 
      fetch('//api.football-data.org/v1/competitions/464', {
        headers
      })
      .then((res) => {
        console.log(12);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        store.dispatch({ type: 'GET_CURRENT_MATCHDAY', payload: { matchday: res.currentMatchday, id: res.id }});
    });
    break;

    case 'GET_CURRENT_MATCHDAY':
      console.log(action);
      fetch(`//api.football-data.org/v1/competitions/${action.payload.id}/fixtures?matchday=${action.payload.matchday}`,{
        headers
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        store.dispatch({ type:'GET_TEAM_LOGOS', payload: res })
      });
      break;
    case 'GET_TEAM_LOGOS':
      console.log(action.payload.fixtures);
      let promises = action.payload.fixtures.map((value) => {             
        return fetch(value._links.homeTeam.href, {
          headers
        })
        .then(res => res.json())   
      });  
      Promise.all(promises)
        .then((res) => {
       // store.dispatch({ type: 'GET_CURRENT_MATCHDAY', payload: { matchday: res.currentMatchday, id: res.id }});
      });
      break;
    default:
      return store;
  }
  return result;
}

const dataLoadMiddleware = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case 'LOAD_DATA': 
      fetch('//api.football-data.org/v1/competitions/445', {
        headers
      })
        .then((res) => {
          console.log(12);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          store.dispatch({ type: 'GET_CURRENT_MATCHDAY', payload: { matchday: res.currentMatchday, id: res.id }});
      });

      fetch('//api.football-data.org/v1/competitions/446', {
        headers
      })
        .then((res) => {
          console.log(123)
          return res.json();
        })
        .then((res) => {
          console.log(res);
          store.dispatch({ type: 'GET_CURRENT_MATCHDAY', payload: { matchday: res.currentMatchday, id: res.id }});
      });

      fetch('//api.football-data.org/v1/competitions/464', {
        headers
      })
        .then((res) => {
          console.log(123)
          return res.json();
        })
        .then((res) => {
          console.log(res);
          store.dispatch({ type: 'GET_CURRENT_MATCHDAY', payload: { matchday: res.currentMatchday, id: res.id }});
      });
      break;
    case 'GET_CURRENT_MATCHDAY':
      fetch(`http://api.football-data.org/v1/competitions/${action.payload.id}/fixtures?matchday=${action.payload.matchday}`,{
        headers
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        store.dispatch({ type:'SHOW_MATCHES' })
      });
      break;
    default:
      return store;
  }
  return result;
};


const reducer = combineReducers({
  UEFA: UEFAReducer
});

const store = createStore(
  reducer,
  applyMiddleware(UEFALoadMiddleware)
);

export default store;
