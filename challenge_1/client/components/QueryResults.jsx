import React from 'react';
import Result from './Result.jsx';

const QueryResults = ({ results }) => {
  const resultsList = results.map((event, i) => <Result key={ i } event={ event }/>);
  return (
    <div>
      <ul>
        { resultsList }
      </ul>
    </div>
  );
};

export default QueryResults;
