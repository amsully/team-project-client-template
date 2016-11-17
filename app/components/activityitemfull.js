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
                              <a href="#"><span className="glyphicon glyphicon-refresh"></span> Regenerate</a>
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
