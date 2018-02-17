import React, { Component } from 'react';

export default class Match extends Component {
  render() {
    return (
      <div className="match">
        <div className="match__team">
          <div className="team__name">
            <img src="./src/images/mu.jpg" alt="logo" />
            <div>Man United</div>
          </div>
          <div className="team__score">
            2
          </div>
        </div>
        <div className="match__team">
          <div className="team__name">
            <img src="./src/images/mu.jpg" alt="logo" />
            <div>Man United</div>
          </div>
          <div className="team__score">
            3
          </div>
        </div>
        <div className="match__date">
          Yesterday: FT
        </div>
      </div>
    );
  }
}
