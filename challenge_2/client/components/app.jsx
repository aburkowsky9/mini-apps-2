import React from 'react';
import Chart from 'chart.js';
import UserOptions from './UserOptions.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoPriceData: {},
      errorFetching: false,
    };
    this.fetchCryptoData = this.fetchCryptoData.bind(this);
  }

  renderChart() {
    const { node } = this;
    const dates = Object.keys(this.state.cryptoPriceData);
    const values = Object.values(this.state.cryptoPriceData);
    window.chart = new Chart(node, {
      type: 'line',
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
      <div>
        <h1>Cryptocurrency Charting Tool</h1>
        {this.state.errorFetching
          ? <p>Sorry! There was an error processing your request. Please try again. </p>
          : <canvas
              style={{ width: 800, height: 300 }}
              ref={(node) => { this.node = node; }}
              />
        }
        <UserOptions />
      </div>
    );
  }
}

export default App;
