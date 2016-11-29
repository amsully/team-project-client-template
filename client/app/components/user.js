import {getUser} from '../server';

import React from 'react';

export default class User extends React.Component{

  constructor(props) {
    super(props);
      this.state = {
      contents: []
      };
  }

  refresh() {
    getUser(this.props.user, (feedData) => {
    this.setState(feedData);
    });
  }


  componentDidMount() {
    this.refresh();
  }
  render(){
    return(
      <div className="panel panel-default profile">
                  <div className="panel-body">
                    <div className="media">
                      <div className="media-top">
                        <div className="row">
                          <div className="col-md-6">
                            <font size="10"><font face="sarif">Edit Profile</font></font>
                          </div>
                          <div className="col-md-6">
                            <div className="pull-right">
                              <button type="button" className="btn btn-default">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="media">
                      <div className="media-top">
                        <div className="row">
                            <center>First Name</center> <center> <input type="text" className= "general-text"  placeholder="{this.props.author}" /> <br /> </center>
                          <div className="col-md-6">
                            <div className="pull-right">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="media-body">
                        <div className="form-group">
                          <br />
                          <center>Last Name</center> <center> <input type="text" className= "general-text" placeholder= {this.props.author} /> <br /></center>
                        </div>
                      </div>
                    </div>


                    <div className="media-body">
                        <div className="form-group">
                          <br />
                          <center>Username</center><center>  <input type="text" className= "general-text" placeholder="{this.props.Username}" /> <br /></center>
                        </div>
                      </div>
                    </div>

                    <div className="media">
                      <div className="media-top">
                        <div className="row">
                            <center>Password</center><center> <input type="text" className= "general-text" placeholder="*********" /> <br /> </center>
                          <div className="col-md-6">
                            <div className="pull-right">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="media-body">
                        <div className="form-group">
                          <br />
                          <center>Email</center><center>   <input type="text" className= "general-text" placeholder="{this.props.Email}" /> <br /></center>
                        </div>
                      </div>
                    </div>

                    <div className="media">
                      <div className="media-top">
                        <div className="row">
                            <center>Phone Number</center><center>   <input type="text" className= "general-text" placeholder="{this.props.PhoneNumber}" /> <br /> </center>
                          <div className="col-md-6">
                            <div className="pull-right">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="media-body">
                        <div className="form-group">
                          <br />
                          <center>Address</center><center>   <input type="text" className= "general-text" placeholder="{this.props.Address}" /> <br /> </center>
                        </div>
                        <center>Birthday</center><center>  <input type="text" className="birthday-search" placeholder="06" /> <input type="text" className="birthday-search" placeholder="12" /> <input type="text" className="birthday-year" placeholder="1994" /> </center>
                      </div>

                    </div>

                    <div className="media">
                      <div className="media-top">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="pull-right">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                         <center> <button type="button" className="btn btn-default">
                            Save Changes
                          </button> </center>
                      </div>
                      <div className="col-md-5"></div>
                    </div>
                  </div>
                </div>
    )
  }
}
