import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/mainpage';
import UserGeneratedPage from './components/usergeneratedpage';
import FullTripPage from './components/fulltrip';
import RightSideBar from './components/rightsidebar'
import Customize from './components/customize'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

class FullPage extends React.Component {
  render() {
    return (
      <div>
        <nav>

        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <h1>Left Side Bar</h1>
            </div>
            <div className="col-md-7">
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
            </div>
            <div className="col-md-3">
              <h1>Right Side Bar</h1>
            </div>
          </div>
        </div>
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

ReactDOM.render(<FullPage />,document.getElementById("full-page"));
