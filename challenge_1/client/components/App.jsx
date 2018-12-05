import React from 'react';
import Results from './Results.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      searchResults: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const newState = {};
    newState[name] = value;

    this.setState(newState);
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const results = await fetch(`/events?q=${this.state.keyword}`);
      if (results.ok) {
        const data = await results.json();
        this.setState({
          keyword: '',
          searchResults: data,
        });
      } else {
        throw new Error(results);
      }
    } catch(err) {

    }

  }

  render() {
    return (
      <div>
        <h1>Histoogle!</h1>
        <form onSubmit={ this.handleSubmit }>
          <label>
            <span>Enter Historical Keyword:</span>
            <input name="keyword" type="text" value={ this.state.keyword } onChange={ this.handleChange } required/>
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default App;
