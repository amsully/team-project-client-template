import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/mainpage';
import UserGeneratedPage from './components/usergeneratedpage';
import FullTripPage from './components/fulltrip';
import RightSideBar from './components/rightsidebar'
import Customize from './components/customize'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

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
      <Route path="customize/" component={Customize} />
      <Route path="full-trip/" component={FullTripPage} />
      <Route path="rsb-test/" component={RightSideBar} />
    </Route>
  </Router>
),document.getElementById("center-feed"));
