import { createStore, combineReducers, applyMiddleware } from 'redux';
import UEFAteams from './data/UEFALeague.js';
import championshipTeams from './data/championshipLeague.js';
import primierLeague from './data/premierLeague.js';

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

const leagues = {
  UEFA: {
    id: 464,
    data: UEFAteams
  },
  Premier: {
    id: 445,
    data: primierLeague
  },
  Championship: {
    id: 446,
    data: championshipTeams
  }
}

const UEFALoadMiddleware = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case 'LOAD_DATA': 
      fetch(`//api.football-data.org/v1/competitions/${leagues[action.league].id}`, {
        headers
      })
      .then((res) => {
        console.log(12);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        store.dispatch({ 
          type: 'GET_CURRENT_MATCHDAY',
          payload: { 
            matchday: res.currentMatchday,
            id: res.id, 
            league: action.league 
          }
        });
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
        store.dispatch({ type:'GET_TEAM_LOGOS', payload: res, league: action.payload.league })
      });
      break;
    case 'GET_TEAM_LOGOS':
      store.dispatch({ 
        type: 'SHOW_UEFA_MATCHES', 
        payload: insertLogosHref(action.payload.fixtures, leagues[action.league].data) 
      });
      // });
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
  console.log(matches, teams);
  return matches.map((value) => {
    let awayTeam = teams.get(value.awayTeamName);
    let homeTeam = teams.get(value.homeTeamName);
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
