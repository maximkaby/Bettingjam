import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Tab from './Tab';
import Form from './Form';

export default class App extends Component {
  state = {
    toggleForm: true,
    inputValue: ''
  }
  componentWillMount() {
    const promiseIsForm = new Promise((resolve) => {
      chrome.storage.local.get('isFormOpened', (res) => {
        resolve(res.isFormOpened);
      });
    });
    promiseIsForm.then((resolve) => {
      console.log(resolve);
      this.setState({
        toggleForm: Boolean(resolve)
      });
    });
  }

  submitRegistration = () => {
    console.log('submit');
    chrome.storage.local.set({ 'isFormOpened': false });
    this.setState({
      toggleForm: true
    });
    fetch('http://iwd-team.ru/mailchimp/action.php', {
      method: 'POST',
      body: {
        email: 'qwqwewqe123'
      },
      mode: 'no-cors'
    });
  }

  inputOnChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        {this.state.toggleForm ?
          <Tab />
          : <Form
            inputOnChange={this.inputOnChange}
            submitRegistration={this.submitRegistration}
            value={this.state.inputValue}
          />
        }
        <Footer />
      </div>
    );
  }
}