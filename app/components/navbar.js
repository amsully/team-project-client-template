import React from 'react';

export default class Navbar extends React.Component {
  render(){
      return (
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">
                            <span className="glyphicon glyphicon-home"></span>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <div className="nav navbar-nav navbar-right">
                            <div className="btn-toolbar pull-right" role="toolbar">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default navbar-btn">
                                    John
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default navbar-btn">
                                      Home
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default navbar-btn">
                                      <span className="glyphicon glyphicon-lock"></span>
                                    </button>
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-default dropdown-toggle navbar-btn" data-toggle="dropdown">
                                          <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">Log out...</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      )
  }
}
