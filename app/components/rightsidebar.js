import React from 'react';
import ActivityItem from './activityitem';
export default
class RightSideBar extends React.Component{
  render(){
    return(
      <div>
        <div className="row">
          <div className="col-md-12">
            <h3>Attractions Near You:</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="media-list">
              <li className="media">
                <ActivityItem name="Local Burger"
                              location="North Hampton, MA"
                              stars="4" />
              </li>
              <li className="media">
                <ActivityItem name="Antonio's Pizza"
                              location="Amherst, MA"
                              stars="4.3" />
              </li>
              <li className="media">
                <ActivityItem name="Glazed"
                              location="Amherst, MA"
                              stars="5" />
              </li>
              <li className="media">
                <ActivityItem name="Mead Art Museum"
                              location="Amherst, MA"
                              stars="3.7" />
              </li>
              <li role="presentation" id="fb-db-reset"></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
