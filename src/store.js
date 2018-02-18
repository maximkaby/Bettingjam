import { createStore, combineReducers, applyMiddleware } from 'redux';

// function appReducer(state = {}, action) {
//   switch (action.type) {
//     case 'SHOW_MATCHES':
//       return 0;
//     default:
//       return state;
//   }
// }

function UEFAReducer(state = [], action) {
  switch (action.type) {
    case 'SHOW_UEFA_MATCHES':
      return action.payload;
    default:
      return state;
  }
}
/* eslint-disable*/
const headers = {
  'X-AUTH-TOKEN': '03c2904a3f2f4bfcad3ce71c790b1043'
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
      let promLogo = new Promise((resolve) => {
        resolve('wefewf')
      });
      chrome.storage.sync.get('srcLogo', res => {
        console.log(res)
      })
      console.log('not synchron')
      
      // promLogo.then()
      action.payload.fixtures.length = 0;
      let promises = action.payload.fixtures.map((value) => {             
        return fetch(value._links.homeTeam.href, {
          headers
        })
        .then(res => res.json())   
      });  
      Promise.all(promises)
        .then((res) => {
        store.dispatch({ 
          type: 'SHOW_UEFA_MATCHES', 
          payload: insertLogosHref(action.payload.fixtures, res) 
        });
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

function insertLogosHref(matches, teams){
  const myMap = new Map();
  teams.reduce((myMap, value, index, array) => {
    myMap.set(value.name, value)
    return myMap;
  },myMap);

  return matches.map((value) => {
    let awayTeam = myMap.get(value.awayTeamName);
    let homeTeam = myMap.get(value.homeTeamName);
    return {
      ...value,
      awayTeamLogo: awayTeam.crestUrl,
      awayTeamShortName: awayTeam.shortName,
      homeTeamLogo: homeTeam.crestUrl,
      homeTeamShortName: homeTeam.shortName
    }
  })
}

const reducer = combineReducers({
  UEFA: UEFAReducer
});

const store = createStore(
  reducer,
  applyMiddleware(UEFALoadMiddleware)
);

export default store;
