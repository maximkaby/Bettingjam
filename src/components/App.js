import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Match from './Match';
import Tab from './Tab';

export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Tab />
        <Footer />
      </div>
    );
  }
}
