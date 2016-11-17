import {getFullTripData} from '../server';

import React from 'react';
import AccommodationItem from './accommodationitem';
import RestaurantItem from './restaurantitem';
import ActivityItemFull from './activityitemfull';

export default class FullTripPage extends React.Component{

  constructor(props) {
    super(props);
      this.state = {
        accommodations: [],
        author:0,
        restaurants:[],
        activities:[]
      };
  }

  refresh() {
      getFullTripData(this.props.trip, (feedData) => {
        this.setState(feedData);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render(){
    return(

      <div>
      <div className="">

          <div className="panel panel-default">

              <div className="panel-body blue">

                  <div className="row vertical-align">
                      <div className="col-md-8">
                          <ul className="nav nav-pills nav-stacked center">

                              <li role="presentation">
                                  <a href="#">
                                      <h3><strong>Boston, MA</strong></h3>
                                  </a>
                              </li>
                          </ul>
                      </div>
                      <div className="col-md-4">
                          <img className="pull-right" src="/img/Boston.jpg" width="100%"/>
                      </div>
                  </div>

                  <hr/>

                  <div className="media">

                      <div className="media-body">
                          <ul className="nav nav-pills nav-stacked pull-left">

                              <li role="presentation">
                                  <strong>Arrive:</strong> October 7, 2016
                              </li>
                              <li role="presentation">
                                  <strong>Leave:</strong> October 10, 2016
                              </li>
                              <li role="presentation">
                                  <strong>Transportation:</strong> Car
                              </li>
                              <li role="presentation">
                                  <strong><a href="#">Directions</a></strong>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="row">

                      <div className="col-md-6">

                      </div>

                      <div className="col-md-6">

                          <div className="pull-right">
                              <button type="button" className="btn btn-default">
                                <span className="glyphicon glyphicon-share-alt"></span> Share

                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="panel panel-default blue">

              <div className="panel-body">

                  <div className="row">
                      <div className="col-md-10">

                          <div className="media">

                              <div className="media-left media-top">
                                  <h3>Accomodation</h3>
                              </div>
                              <div className="media-body">

                                {this.state.accommodations.map((feedItem) => {
                                  return (
                                    <AccommodationItem key={feedItem._id} data={feedItem} />
                                  )
                                })}

                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="row pull-right">
                      <div className="col-md-12 pull">
                          <ul className="list-inline">
                              <li>
                                  <a href="#"><span className="glyphicon glyphicon-refresh"></span> Regenerate</a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>

          <div className="panel panel-default blue">

              <div className="panel-body">

                  <div className="row">
                      <div className="col-md-10">

                          <div className="media">

                              <div className="media-left media-top">
                                  <h3>Restaurants</h3>
                              </div>

                          </div>
                      </div>
                  </div>

                  <hr/>

                  <div className="row pull-right">
                      <div className="col-md-12 pull">
                        {this.state.restaurants.map((feedItem) => {
                          return (
                            <RestaurantItem key={feedItem._id} data={feedItem} />
                          )
                        })}
                      </div>
                  </div>

                  <hr/>
              </div>
          </div>

          <div className="panel panel-default blue">

              <div className="panel-body">

                  <div className="row">
                      <div className="col-md-10">

                          <div className="media">

                              <div className="media-left media-top">
                                  <h3>Activities</h3>
                              </div>

                          </div>

                          {this.state.activities.map((feedItem) => {
                            return (
                              <ActivityItemFull key={feedItem._id} data={feedItem} />
                            )
                          })}
                      </div>
                  </div>
              </div>
          </div>

      </div>

      </div>
    )
  }
}
