import React from 'react';
import {Link} from 'react-router';

export default class TripSummary extends React.Component{
  constructor(props) {
  super(props);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state = props.data;
  }
  render(){
    var data = this.state;
    return(
      <div className="panel panel-default user-generated">
        <div className="panel-body">
          <div className="media">
            <div className="media-top">
              <div className="row">
                <div className="col-md-6">
                  Generated By: {data.contents.author}<br />
                  Start: {data.contents.start}<br />
                  Destination: {data.contents.destination}<br />
                  {data.contents.dates}
                </div>
                <div className="col-md-6">
                  <div className="pull-right">
                    <Link to={"/full-trip/"}>
                      <button data-toggle="modal" href="#generated" type="button" className="btn btn-primary btn-lg">
                       <span className="glyphicon glyphicon-search"> </span>
                        More Info
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="media-left"></div>
            <div className="media-body">
              <div className="form-group">
                <br />
                {data.contents.summary}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
