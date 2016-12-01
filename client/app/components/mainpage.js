import React from 'react';
import TripSummary from './tripsummary';
import Modal from './modal'
import SimpleGenerate from './simplegenerate'
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
      getRecentTrips((trips) => {
        this.setState({trips: Object.keys(trips).map(k => trips[k])});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render(){
    return(
          <div className="center-bar">
                <SimpleGenerate />

                <div className="row rec-gen-title">
                    <div className="col-xs-6">
                        Recently generated near you!
                    </div>
                    <div className="col-xs-6">
                        <Link to={"/user-generated/"}>Recently generate by you!</Link>
                    </div>
                </div>

                {this.state.trips.map((trip) => {
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

                <div className="row">
                  <Link to={"/full-trip/"}>
                    <button type="button" className="btn btn-default" >
                     <span className="glyphicon glyphicon-search"></span>
                     Dummy Button to get to full trip.
                   </button>
                  </Link>
                </div>
            </div>
    )
  }
}
