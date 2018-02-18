import React, { Component } from 'react';

export default class Match extends Component {
  render() {
    const {
      homeTeamName,
      awayTeamName = '',
      result: { goalsHomeTeam, goalsAwayTeam },
      date,
      homeTeamLogo = '',
      awayTeamLogo = ''
    } = this.props;
    console.log(this.props);
    return (
      <div className="match">
        <div className="match__team">
          <div className="team__name">
            <img src={homeTeamLogo} alt="logo" />
            <div>{homeTeamName}</div>
          </div>
          <div className="team__score">
            {goalsHomeTeam}
          </div>
        </div>
        <div className="match__team">
          <div className="team__name">
            <img src={awayTeamLogo} alt="logo" />
            <div>{awayTeamName}</div>
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
