import React from 'react';
import TripSummary from './tripsummary';
import Modal from './modal'
import {Link} from 'react-router';
import {getRecentTrips} from '../server';

export default class MainPage extends React.Component{

  constructor(props) {
    super(props);
      this.state = {
        trips: []
      };
  }

  refresh() {
      getRecentTrips(() => {
        this.setState(trips);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render(){
    return(
          <div className="center-bar">
                <div className="panel panel-default trip-gen">
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-xs-12 trip-gen-header">
                                <div>
                                    Generate a Trip!
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="pull-left">
                                    Enter your start and end date and we will generate a trip near you!
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-9">
                                <form className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="startdate">Start:</label>
                                        <input type="date" className="form-control" id="startdate"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="enddate">End:</label>
                                        <input type="date" className="form-control" id="enddate"/>
                                    </div>
                                </form>
                            </div>
                            <div className="col-xs-3">
                                <div className="pull-right">
                                    <button type="button" className="btn btn-primary" data-toggle="modal" href="#generated">
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-10"></div>
                            <div className="col-md-2">
                                <div className="pull-center">
                                    <a href="#">Customize</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row rec-gen-title">
                    <div className="col-xs-6">
                        Recently generated near you!
                    </div>
                    <div className="col-xs-6">
                        <Link to={"/user-generated/"}>Recently generate by you!</Link>
                    </div>
                </div>

                {this.state.map((trip) => {
                  return (
                    <TripSummary key={trip._id}
                              author={trip.author}
                              trip={trip._id}
                              start={"Boston, MA"}
                              destination={"Washington DC"}
                              dates={"2/4/2014 - 2/10/2014"}
                              summary={"A 7 day trip to Washington DC by airplane for under $9000. Destinations include the Museum of Natural History and the National Air and Space Museum. Planned restaurants include We the Pizza and GrillFish."}>
                    </TripSummary>
                  )
                })}

                <div className="modal fade" id="generated">
                  <Modal />
                </div>
            </div>
    )
  }
}
