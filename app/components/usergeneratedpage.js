import React from 'react';
import TripSummary from './tripsummary';

export default class UserGeneratedPage extends React.Component{
  render(){
    return (
      <div>
        <TripSummary key={4}
                  author={"You"}
                  trip={4}
                  start={"Amherst, MA"}
                  destination={"Boston, MA"}
                  dates={"6/24/2011 - 6/24/2011"}
                  summary={"A day trip to Boston by car for under $300. Destinations include the Boston Aquarium and Franklin Park Zoo. Planned restaurants include Italian Express Pizzeria and The Capital Grille."}>
        </TripSummary>
        <TripSummary key={5}
                  author={"You"}
                  trip={5}
                  start={"Boston, MA"}
                  destination={"Washington DC"}
                  dates={"2/4/2014 - 2/10/2014"}
                  summary={"A 7 day trip to Washington DC by airplane for under $9000. Destinations include the Museum of Natural History and the National Air and Space Museum. Planned restaurants include We the Pizza and GrillFish."}>
        </TripSummary>
        <TripSummary key={6}
                  author={"You"}
                  trip={6}
                  start={"Worcester, MA"}
                  destination={"Chatham, MA"}
                  dates={"3/29/2016 - 3/29/2016"}
                  summary={"A day trip to Cape Cod by car for under $500. Destinations include Nauset Beach and Chatham Lighthouse. Planned restaurants include Arnold's Restaurant and Longshore Restaurant."}>
        </TripSummary>
      </div>);
  }
}
