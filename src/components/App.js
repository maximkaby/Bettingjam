import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Tab from './Tab';

export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Tab className="tab" />
        <Footer />
      </div>
    );
  }
}
