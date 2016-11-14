import React from 'react';
import ReactDOM from 'react-dom';
import MainFeed from './components/mainfeed'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

class MainPage extends React.Component {
  render() {
    return(
      <MainFeed />
    );
  }
}

class EmptyPage extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={MainPage} />
      <Route path="" component={EmptyPage} />
    </Route>
  </Router>
),document.getElementById("center-feed"));
