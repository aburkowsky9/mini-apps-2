import React from 'react';
import QueryResults from './queryResults.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      results: '',
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
      const response = await fetch(`/events?q=${this.state.keyword}`);
      if (response.ok) {
        const results = await response.json();
        this.setState({
          keyword: '',
          results,
        });
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.log(err);
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
        <QueryResults results={ this.state.results }/>
      </div>
    );
  }
}

export default App;
