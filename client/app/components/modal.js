import React from 'react';
import TripSummary from './tripsumdb';
import {Link} from 'react-router';
import {getModalTrips} from '../server';

export default class Modal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      trip1: {
        _id: 0,
        type: "TripSummaryItem",
        trip_id: 0,
        contents: {
          author: "",
          trip: 0,
          start: "",
          destination: "",
          dates: "",
          summary: ""
        }
      },
      trip2: {
        _id: 0,
        type: "TripSummaryItem",
        trip_id: 0,
        contents: {
          author: "",
          trip: 0,
          start: "",
          destination: "",
          dates: "",
          summary: ""
        }
      },
      trip3: {
        _id: 0,
        type: "TripSummaryItem",
        trip_id: 0,
        contents: {
          author: "",
          trip: 0,
          start: "",
          destination: "",
          dates: "",
          summary: ""
        }
      }
    }
  }

  refresh() {
    getModalTrips((feedData) => {
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
                <li>
                  <TripSummary key={this.state.trip1._id} data={this.state.trip1} />
                </li>
                <li>
                  <TripSummary key={this.state.trip2._id} data={this.state.trip2} />
                </li>
                <li>
                  <TripSummary key={this.state.trip3._id} data={this.state.trip3} />
                </li>
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
