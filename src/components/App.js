import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Footer />
      </div>
    );
  }
}
