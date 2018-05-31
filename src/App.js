import React, { Component } from 'react';
import 'babel-polyfill';
import './App.scss';

// import components
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <h1 className="header__title">Google Books</h1>
        </header>
        <Search />
      </div>
    );
  }
}

export default App;
