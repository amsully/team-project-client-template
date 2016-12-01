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


          <div className="media">


              <div className="media-body">
                  <strong>{data.contents.name}</strong> - {data.contents.type}
                  <br/>
                  <strong>{data.contents.price}</strong>
                  <br/>
                  {data.contents.rating}
                  <span className="glyphicon glyphicon-star"></span>
              </div>
              <div className="row pull-right">
                  <div className="col-md-12 pull">
                      <ul className="list-inline">
                          <li>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>

          <hr/>
</div>
        )
    }
}
