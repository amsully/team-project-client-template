import React from 'react';
import ReactDOM from 'react-dom';
import MainFeed from './components/mainfeed'
import RightSideBar from './components/rightsidebar'
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
      <IndexRoute component={Test} />
      <Route path="profile/" component={ProfilePage} />
      <Route path="trip/1/" component={FullTripPage} />
      <Route path="user-generated/" component={CustomizationPage} />
      <Route path="customize/" component={Test} />

    </Route>
  </Router>
),document.getElementById("center-feed"));
