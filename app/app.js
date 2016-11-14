import React from 'react';
import ReactDOM from 'react-dom';
import MainFeed from './components/mainfeed'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

class MainPage extends React.Component {
  render() {
    return <MainFeed/>;
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
    </Route>
  </Router>
),document.getElementById('center-feed'));
