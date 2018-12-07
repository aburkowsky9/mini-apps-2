import React from 'react';
import Chart from 'chart.js';
import UserOptions from './UserOptions.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoPriceData: {},
      errorFetching: false,
      graphType: 'line',
    };
    this.fetchCryptoData = this.fetchCryptoData.bind(this);
    this.handleGraphTypeChange = this.handleGraphTypeChange.bind(this);
  }

  handleGraphTypeChange({ target: { value } }) {
    this.setState({ graphType: value }, () => {
      this.renderChart();
    });
  }

  renderChart() {
    const { node } = this;
    const dates = Object.keys(this.state.cryptoPriceData);
    const values = Object.values(this.state.cryptoPriceData);
    if (window.chart) {
      window.chart.destroy();
    }
    window.chart = new Chart(node, {
      type: this.state.graphType,
      data: {
        labels: dates,
        datasets: [
          {
            label: 'BTC',
            data: values,
          },
        ],
      },
    });
  }

  async fetchCryptoData() {
    try {
      const response = await fetch('/btc');
      if (response.ok) {
        const cryptoPriceData = await response.json();
        this.setState({
          cryptoPriceData,
          errorFetching: false,
        }, () => {
          this.renderChart();
        });
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log(err);
      this.setState({ errorFetching: true });
    }
  }

  componentDidMount() {
    this.fetchCryptoData();
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Cryptocurrency Charting Tool</h1>
        <div className="chart">
        {this.state.errorFetching
          ? <p> Sorry! There was an error processing your request. Please try again. </p>
          : <canvas
              ref={(node) => { this.node = node; }}
              />
        }
        </div>
        <UserOptions handleGraphTypeChange={this.handleGraphTypeChange}/>
      </div>
    );
  }
}
// style={{ width: 500, height: 300 }}
export default App;
