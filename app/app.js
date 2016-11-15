import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/mainpage';
import UserGeneratedPage from './components/usergeneratedpage';
import FullTripPage from './components/fulltrip';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

class Test extends React.Component {
  render() {
    return (
      <div>
        <h1>This is a test of the router</h1>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={MainPage} />

      <Route path="user-generated/" component={UserGeneratedPage} />
      <Route path="customize/" component={Test} />
      <Route path="full-trip/" component={FullTripPage} />
    </Route>
  </Router>
),document.getElementById("center-feed"));
