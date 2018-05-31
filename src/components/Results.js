import React from 'react';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import './Results.scss';

const Results = (props) => {

  // format the list of authors
  const getAuthors = (book) => {
    let authors = '';
    let count = 0;

    book.volumeInfo.authors.map((item, i) => {
      if (i === 0) { // just one author
        authors += item;
      } else if (i > 0) { // if there's more than one, separate with a bracket and comma
        authors += ` [, ${item} `;
      }
      count++;
      return item;
    });

    // at the end of the list, if multiple authors
    if (count > 1) {
      for (let i = 1; i < count; i++) {
        authors += ']';
      }
    }
    return authors;
  };

  return (
    <Accordion>
      {props.items.map((item, i) => {
        return (
          <AccordionItem key={i}>
            <AccordionItemTitle>
              <h2>
                <span>{item.volumeInfo.authors ? getAuthors(item) : 'No author(s) listed'} &ndash;</span> {item.volumeInfo.title}
              </h2>
            </AccordionItemTitle>
            <AccordionItemBody>
              <p>{item.volumeInfo.description ? item.volumeInfo.description : 'No description available'}</p>
              {item.volumeInfo.previewLink ? <p><a href={item.volumeInfo.previewLink} target="_blank">Preview</a></p> : null}
            </AccordionItemBody>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Results;