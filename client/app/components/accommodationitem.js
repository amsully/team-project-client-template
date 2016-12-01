import React from 'react';
import {hideElement} from '../util';

export default class FeedItem extends React.Component {
  constructor(props) {
  super(props);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state = props.data;
  }

  onDelete(e) {
    e.preventDefault();
    this.props.onDelete();
  }

    render() {
        // var data = this.props.data;
        var data = this.state;

        return (

          <div>
            <div className="row">
              <div className="col-md-10">
              </div>
              <div className="col-md-2">
                <div className={"dropdown"}>
                  <span className="caret pull-right dropdown-toggle" data-toggle="dropdown"></span>
                  <ul className="pull-right dropdown-menu">
                    <li className={hideElement(false)}><a onClick={(e) => this.onDelete(e)}>Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>
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
