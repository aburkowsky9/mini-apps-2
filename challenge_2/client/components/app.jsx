import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'hello world',
      cryptoPriceData: {},
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('/btc');
      if (response.ok) {
        const cryptoPriceData = await response.json();
        this.setState({
          cryptoPriceData,
        });
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.hello}</p>
      </div>
    );
  }
}

export default App;
