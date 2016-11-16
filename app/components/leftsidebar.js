import React from 'react';

export default class LeftSideBar extends React.Component{
  render(){
    return(
      <div>
            <div className="row heading">
                <div className="media">
                    <div className="media-left media-top">
                         <span className="glyphicon glyphicon-user"></span>
                    </div>
                    <div className="media-right media-top">
                        <a href="#">
                            Your Profile
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <a href="#">
                        <span className="glyphicon glyphicon-cog"></span>
                        edit
                    </a>
                </div>
            </div>
            <div className="row heading">
                <span className="glyphicon glyphicon-book"></span>
                Personal Information
            </div>
            <div className="row">
                <div className="col-md-12">
                    Tim Richards
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    (413) 867-5309
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    Western Mass
                </div>
            </div>
            <div className="row heading">
                <span className="glyphicon glyphicon-plane"></span>
                Your Recent Trips
            </div>

            <div className="row">
                <div className="col-md-12">
                    <a>
                    To: Boston for 2 days
                    </a>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <a>
                    To: NYC for 4 days
                    </a>
                </div>
            </div>

            <div className="row heading">

                <span className="glyphicon glyphicon-signal"></span>
                Usage Statistics
            </div>

            <div className="row">
                <div className="col-md-10">Trips Taken</div>
                <div className="col-md-2">2</div>
            </div>
            <div className="row">
                <div className="col-md-10">Trips Generated</div>
                <div className="col-md-2">6</div>
            </div>
            <div className="row">
                <div className="col-md-10">Days Travelled</div>
                <div className="col-md-2">7</div>
            </div>
            <div className="row">
                <a href="#" className="pull-right">See More...</a>
            </div>
      </div>
    )
  }
}
