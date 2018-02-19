import React, { Component } from 'react';

function getCorrectDate(date, goals) {
  const dayTime = date.split('T');
  dayTime[1] = dayTime[1].substr(0, 5);
  if (goals) {
    dayTime[2] = 'FT';
  }
  return dayTime.join(' ');
}


export default class Match extends Component {
  render() {
    const {
      homeTeamName = '',
      awayTeamName = '',
      result: { goalsHomeTeam, goalsAwayTeam },
      date,
      homeTeamLogo = '',
      awayTeamLogo = '',
      awayTeamShortName = '../src/images/default-team-logo.png',
      homeTeamShortName = '../src/images/default-team-logo.png'
    } = this.props;
    console.log(this.props);

    return (
      <div className="match">
        <div className="match__team">
          <div className="team__name">
            <img src={homeTeamLogo} alt="logo" />
            <div>{homeTeamShortName}</div>
          </div>
          <div className="team__score">
            {goalsHomeTeam}
          </div>
        </div>
        <div className="match__team">
          <div className="team__name">
            <img src={awayTeamLogo} alt="logo" />
            <div>{awayTeamShortName}</div>
          </div>
          <div className="team__score">
            {goalsAwayTeam}
          </div>
        </div>
        <div className="match__date">
          {getCorrectDate(date, goalsAwayTeam)}
        </div>
      </div>
    );
  }
}
