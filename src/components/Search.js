import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import { API_KEY } from '../config';
import './Search.scss';

// import components
import Stats from './Stats';
import Results from './Results';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      maxResults: 20,
      startIndex: 0,
      totalItems: null,
      items: [],
      currentQuery: '',
      savedQuery: '',
      responseTime: null,
      activePage: 1
    };
  }

  request = (query, pageNumber) => {
    // calculate starting index
    let startIndex = Math.floor(this.state.maxResults) * pageNumber;

    let sendDate = (new Date()).getTime();
    axios.get(`https://www.googleapis.com/books/v1/volumes?key=${API_KEY}&q=${query}&maxResults=${this.state.maxResults}&startIndex=${startIndex}`)
      .then(response => {
        let receiveDate = (new Date()).getTime();

        // calculate server response time
        let responseTimeMs = receiveDate - sendDate;
        this.setState({
          totalItems: response.data.totalItems,
          items: response.data.items,
          responseTime: responseTimeMs
        });
      })
      .catch(error => {
        console.log('There was a problem with submitting your request');
      });
  }

  handleInputChange = (event) => {
    let input = event.target.value;
    // convert string into usable query string
    let str = input.split('.').join('').replace(/\s+/g, '+');
    this.setState({
      currentQuery: event.target.value !== '' ? str : '',
    });
  }

  handleFormSubmit = (event) => {
    // if the input field is not empty 
    if (this.state.currentQuery) {

      // send api request 
      this.request(this.state.currentQuery, 1);

      // save query for use in paginating  
      this.setState({
        savedQuery: this.state.currentQuery
      });
    }
    event.preventDefault();
  }

  handlePaginationChange = (pageNumber) => {
    // save page number and send another api request for next page
    this.setState({
      activePage: pageNumber
    }, this.request(this.state.savedQuery, pageNumber));
  }

  renderPagination = () => {
    // check for results and if they're large enough to be paginated
    if (this.state.totalItems !== null && this.state.totalItems > this.state.maxResults) {
      return (
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.maxResults}
          totalItemsCount={this.state.totalItems}
          pageRangeDisplayed={5}
          onChange={this.handlePaginationChange}
        />
      );
    }
  }

  render() {
    return (
      <div className="search">
        <header>
          <label className="search__label"><span className="show-for-sr">Search for books</span>
            <form className="search__form" onSubmit={this.handleFormSubmit}>
              <input type="text" className="search__input" onChange={this.handleInputChange} role="search" />
              <button type="submit" className="search__btn">Search</button>
            </form>
          </label>
        </header>
        <div className="search__results" aria-live="polite" aria-atomic="true">
          {this.state.totalItems !== null ? <Stats items={this.state.items} count={this.state.totalItems} time={this.state.responseTime} /> : null}
          {(this.state.totalItems !== null && this.state.totalItems > 0) ? <Results items={this.state.items} count={this.state.totalItems} /> : null}
          {this.renderPagination()}
        </div>
      </div >
    );
  }
}

export default Search; 