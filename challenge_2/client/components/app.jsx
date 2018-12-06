import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'hello world',
    };
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
