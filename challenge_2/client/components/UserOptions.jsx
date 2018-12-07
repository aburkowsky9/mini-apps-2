import React from 'react';

const UserOptions = ({ handleGraphTypeChange }) => (
  <div>
    <label>
      Graph Type:&nbsp;
      <select defaultValue="line" onChange={handleGraphTypeChange}>
        <option value="line">Line</option>
        <option value="bar">Bar</option>
      </select>
    </label>
  </div>
);

export default UserOptions;
