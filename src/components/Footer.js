import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__title">
          <span className="title__powered">Powered by</span>
          <a href="https://www.bettingjam.co.uk/" target="_blank" rel="noopener noreferrer">
            <span className="title__betting">betting</span>
            <span className="title__jam">jam</span>
          </a>
        </div>
      </div>
    );
  }
}
