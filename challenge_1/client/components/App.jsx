import React from 'react';
import ReactPaginate from 'react-paginate';
import QueryResults from './QueryResults.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      currentKeyword: '',
      results: [],
      pageCount: 0,
      offset: 0,
      isCurrentlyEditing: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const newState = {};
    newState[name] = value;

    this.setState(newState);
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`/events?_start=0&_limit=10&q=${this.state.keyword}`);
      // copy of keyword used for pagination and not linked to searchbar value
      const currentKeyword = this.state.keyword;
      if (response.ok) {
        const results = await response.json();
        const totalResultsLength = response.headers.get('X-Total-Count');
        const pageCount = Math.ceil(totalResultsLength / 10);
        this.setState({
          keyword: '',
          currentKeyword,
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

  async handlePageChange() {
    const { currentKeyword, offset } = this.state;
    try {
      const response = await fetch(`/events?_page=${offset}&_limit=10&q=${currentKeyword}`);
      if (response.ok) {
        const results = await response.json();
        this.setState({
          results,
        });
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  handlePageClick(page) {
    // page index starts at 0
    const offset = page.selected + 1;
    this.setState({ offset }, () => {
      this.handlePageChange();
    });
  }

  handleEdit(index) {
    this.setState({
      itemCurrentlyEditing: index,
    });
  }

  handleEditSave(index) {
    const data = this.state.results;
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
        <QueryResults results={this.state.results}
          handleEdit={this.handleEdit}
          itemCurrentlyEditing={this.state.itemCurrentlyEditing}/>
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
