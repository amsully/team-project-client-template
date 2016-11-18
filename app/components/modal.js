import React from 'react';
import TripSummary from './tripsumdb';
import {Link} from 'react-router';
import {getModalTripSums} from '../server';

export default class Modal extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        tripSums: []
      };
  }

  refresh() {
      getModalTripSums(1,(feedData) => {
        this.setState(feedData);
    });
  }

  componentDidMount() {
    this.refresh();
  }
  render(){
    return(
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h1 className="modal-title">Generated Vacations</h1>
            </div>
            <div className="modal-body">
              <ul className="media-list">
                {this.state.tripSums.map((feedItem) => {
                  return (
                    <li>
                      <TripSummary key={feedItem._id} data="feedItem" />
                    </li>);
                  })}
              </ul>
            </div>
            <div className="modal-footer">
              <div className="text-center">
                  <h2>Don't like any of these?</h2>
                  <ul className="list-inline">
                    <li>
                      <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" href="#generated">
                        Generate Again
                      </button>
                    </li>
                    <li> or </li>
                    <li>
                      <Link to={"/customize/"}>
                      <button data-toggle="modal" href="#generated" type="button" className="btn btn-primary btn-lg">
                        Customize Preferences
                      </button>
                      </Link>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
    )
  }
}
