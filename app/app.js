import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/mainpage';
import Navbar from './components/navbar';
import UserGeneratedPage from './components/usergeneratedpage';
import FullTripPage from './components/fulltrip';
import RightSideBar from './components/rightsidebar';
import LeftSideBar from './components/leftsidebar';
import Customize from './components/customize';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

class FullPage extends React.Component {
  render() {
    return (
      <div>
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="col-md-2">

              <LeftSideBar />

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

              <RightSideBar />

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

ReactDOM.render(<FullPage user={1}/>,document.getElementById("full-page"));
