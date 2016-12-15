import React from 'react';
import ReactDOM from 'react-dom';
import User from './components/user';
import MainPage from './components/mainpage'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import Navbar from './components/navbar';
import UserGeneratedPage from './components/usergeneratedpage';
import FullTripPage from './components/fulltrip';
import RightSideBar from './components/rightsidebar';
import LeftSideBar from './components/leftsidebar';
import Customize from './components/customize';
import ErrorBanner from './components/errorbanner'
class FullTripPageSet extends React.Component {
    render() {
        return <FullTripPage trip={1}/>;
    }
}

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
                  <Route path="full-trip/" component={FullTripPageSet} />
                  <Route path="profile/" component={User} />
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
      <div>
        <div className="row">
          <div className="col-md-12">
            <ErrorBanner />
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(<FullPage user={1}/>,document.getElementById("full-page"));
