import React, { Component } from 'react';

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
          {date}
        </div>
      </div>
    );
  }
}
