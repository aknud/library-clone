import React, { Component } from 'react';
import Auth from './components/Auth';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Auth />
        {routes}
      </div>
    );
  }
}

export default App;