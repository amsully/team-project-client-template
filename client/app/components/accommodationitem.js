import React from 'react';
export default class FeedItem extends React.Component {
  constructor(props) {
  super(props);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state = props.data;
  }

    render() {
        // var data = this.props.data;
        var data = this.state;

        return (

          <div>
              <strong>Type:</strong> {data.contents.type}
              <br/>
              <strong>Name:</strong><a href="#"> {data.contents.name}</a>
              <br/>
              <strong>Est. Price:</strong> {data.contents.price}
              <span className="glyphicon glyphicon-user"></span> {data.contents.people} Person
              <hr/>
          </div>

        )
    }
}
