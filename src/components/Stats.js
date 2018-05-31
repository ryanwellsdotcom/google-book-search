import React from 'react';

const Stats = (props) => {
  const totalResults = () => {
    // calculate the results
    if (props.count === 1) {
      return '1 result';
    } else if (props.count > 1) {
      return `${props.count.toLocaleString('en')} results`;
    } else {
      return 'No results found';
    }
  }

  const mostFrequentAuthor = () => {
    const authors = [];
    props.items.map(item => { // find authors in each item obj
      return item.volumeInfo.authors ? item.volumeInfo.authors.map(e => { // loop through authors array
        authors.push(e)
        return e;
      }) : null;
    });

    // calculate the most frequent author
    let result = authors[0];
    let tmp = 0;
    for (let i = 0; i < authors.length; i++) {
      let count = 0;
      for (let j = 0; j < authors.length; j++) {
        if (authors[i] === authors[j]) {
          count++;
        }
      }
      // check to see which author condition applies
      if (count > tmp) {
        tmp = count;
        result = `${authors[i]} is the only author`;
      } else if (count === 1 && count === tmp) {
        result = 'All authors appear equally'
      } else {
        result = `Most frequent author: ${authors[i]}`;
      }
    }
    return result;
  }

  const calcPublicationDates = () => {
    let dates = [];
    props.items.map(item => {
      if (item.volumeInfo.publishedDate) { // check if there's a date

        // some dates are just a year, while others are yyy-mm-dd
        let year = item.volumeInfo.publishedDate.split('-');
        dates.push(year[0]); // push just the year
      }
      return item;
    });

    dates.sort();

    if (dates.length === 1) {
      return `Publication date: ${dates[0]}`;
    } else {
      return `Publication dates: ${dates[0]}-${dates[dates.length - 1]}`;
    }
  }

  return (
    <div className="search__stats">
      {props.items ? <div>
        {totalResults()}</div>
        :
        <div>No results found</div>}
      {props.count > 0 ? <div>
        {mostFrequentAuthor()}
      </div> : null}
      {props.count > 0 ? <div>
        {calcPublicationDates()}
      </div> : null}
      <div>
        {`Response time: ${props.time}ms`}
      </div>
    </div>
  )
}

export default Stats;