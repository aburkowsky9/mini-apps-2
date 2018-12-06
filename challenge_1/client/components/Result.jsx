import React from 'react';

const Result = ({
  item,
  handleEdit,
  index,
  isEditing,
}) => {
  const renderDefaultView = () => (
    <li>
      <div><strong>Date: </strong>{item.date}</div>
      <div><strong>Description: </strong>{item.description}</div>
      <div><strong>Language: </strong>{item.lang}</div>
      <div><strong>Category1: </strong>{item.category1}</div>
      <div><strong>Category2: </strong>{item.category2}</div>
      <div><strong>Granularity: </strong>{item.granularity}</div>
      <button onClick={() => { handleEdit(index); }}>Edit</button>
      <br/>
    </li>
  );

  const renderEditView = () => (
    <li>
      <form>
        <div><strong>Date: </strong><input type="text" defaultValue={item.date}/></div>
        <div><strong>Description: </strong><input type="text" defaultValue={item.description}/></div>
        <div><strong>Language: </strong><input type="text" defaultValue={item.lang}/></div>
        <div><strong>Category1: </strong><input type="text" defaultValue={item.category1}/></div>
        <div><strong>Category2: </strong><input type="text" defaultValue={item.category2}/></div>
        <div><strong>Granularity: </strong><input type="text" defaultValue={item.granularity}/></div>
        <button onClick={() => { handleEdit(index, true); }}>Save</button>
      </form>
      <br/>
    </li>
  );

  return isEditing ? renderEditView() : renderDefaultView();
};


export default Result;
