import React from 'react';
import ReactPaginate from 'react-paginate';
import QueryResults from './QueryResults.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      results: [],
      pageCount: 0,
      currPage: 1,
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
      // for json-server pagination: &_page=1&_limit=10
      const response = await fetch(`/events?q=${this.state.keyword}`);
      if (response.ok) {
        const results = await response.json();
        const pageCount = Math.ceil(results.length / 10);
        this.setState({
          keyword: '',
          results,
          pageCount,
        });
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  handlePageClick(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <div>
        <h1>Histoogle!</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>Enter Historical Keyword:</span>
            <input name="keyword" type="text" value={this.state.keyword} onChange={this.handleChange} required/>
          </label>
          <button type="submit">Search</button>
        </form>
        <QueryResults results={this.state.results}/>
        {this.state.pageCount > 0
         && <div className='paginationBox'>
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'paginationBreak'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}/>
            </div>
        }
      </div>
    );
  }
}

export default App;
