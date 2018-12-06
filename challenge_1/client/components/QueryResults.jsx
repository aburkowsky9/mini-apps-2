import React from 'react';
import Result from './Result.jsx';

const QueryResults = ({ results, handleEdit, itemCurrentlyEditing }) => {
  const isEditing = i => i === itemCurrentlyEditing;
  const resultsList = results.map((item, i) => <Result key={i}
    index={i} item={item} handleEdit={handleEdit} isEditing={isEditing(i)}/>);
  return (
    <div>
      <ol>
        {resultsList}
      </ol>
    </div>
  );
};

export default QueryResults;
