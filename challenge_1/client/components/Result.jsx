import React from 'react';

const Result = ({ event }) => (
  <li>
    <div><strong>{ `Date: ${event.date}` }</strong></div>
    <div>{ `Description: ${event.description}` }</div>
  </li>
);

export default Result;
