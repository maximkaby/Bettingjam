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

function PremierLeagueReducer(state = [], action) {
  switch (action.type) {
    case 'SHOW_PREMIER_MATCHES':
      return action.payload;
    default:
      return state;
  }
}

function ChampionshipReducer(state = [], action) {
  switch (action.type) {
    case 'SHOW_CHAMPIONSHIP_MATCHES':
      return action.payload;
    default:
      return state;
  }
}

const headers = {
  'X-AUTH-TOKEN': '03c2904a3f2f4bfcad3ce71c790b1043'
};

const leagues = {
  UEFA: {
    id: 464,
    teamsList: UEFAteams,
  },
  Premier: {
    id: 445,
    teamsList: primierLeague,
  },
  Championship: {
    id: 446,
    teamsList: championshipTeams,
  }
};

/* eslint-disable*/
const UEFALoadMiddleware = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case 'LOAD_DATA': 
      if(leagues[action.league].isDownloaded) {
        store.dispatch({
          type:'GET_TEAM_LOGOS', 
          payload: leagues[action.league].matches, league: action.league 
        });
      }
      fetch(`http://api.football-data.org/v1/competitions/${leagues[action.league].id}`, {
        headers
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        leagues[action.league].isDownloaded = true;
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
      fetch(`http://api.football-data.org/v1/competitions/${action.payload.id}/fixtures?matchday=${action.payload.matchday}`,{
        headers
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        leagues[action.payload.league].matches = res;
        store.dispatch({ type:'GET_TEAM_LOGOS', payload: res, league: action.payload.league })
      });
      break;

    case 'GET_TEAM_LOGOS':
      action.league === 'UEFA' ? 
      store.dispatch({ 
        type: 'SHOW_UEFA_MATCHES', 
        payload: insertLogosHref(action.payload.fixtures, leagues[action.league].teamsList) 
      }) : (action.league === 'Premier' ? 
      store.dispatch({ 
        type: 'SHOW_PREMIER_MATCHES', 
        payload: insertLogosHref(action.payload.fixtures, leagues[action.league].teamsList) 
      }) :
      store.dispatch({ 
        type: 'SHOW_CHAMPIONSHIP_MATCHES', 
        payload: insertLogosHref(action.payload.fixtures, leagues[action.league].teamsList) 
      }));
      break;

    default:
      return store;
  }
  return result;
}

function insertLogosHref(matches, teams){
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
  UEFA: UEFAReducer,
  Premier: PremierLeagueReducer,
  Championship: ChampionshipReducer
});

const store = createStore(
  reducer,
  applyMiddleware(UEFALoadMiddleware)
);

export default store;
