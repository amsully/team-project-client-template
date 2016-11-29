import React from 'react';
export default
class ActivityItem extends React.Component{
  render(){
    return(
      <div className="media-body">
        <strong>{this.props.name}</strong>
        <br />
        <i>{this.props.location}</i>
        <br />
        {this.props.stars}<span className="glyphicon glyphicon-star"></span>
      </div>
    )
  }
}
