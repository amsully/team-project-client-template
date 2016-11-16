import React from 'react';

export default class Customize extends React.Component{
  render(){
    return(
      <div>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="col-md-9">
                <font size="10" color = "#00688B"><font face="san-sarif">Customizations</font></font> <br />
                Location (if you dont want us to use your current location)
                Kinds of activities (if you would rather restaurants over museums)
                If you would rather to only fly
                or only drive (default is automatically determine which makes sense)
            </div>
              <div className="col-md-3">
                <button type="button" className="btn btn-default">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-md-1">
                    <a href="#"><span className="glyphicon glyphicon-globe"></span>
                    </a>
                </div>
                <div className="col-md-5">
                  <font size="4"><font face="sarif">Where are you starting from?</font></font>
                  <br /><font size="3" color = "gray"><font face="sarif">If not from your current location.</font></font>
                </div>
                <div className="col-md-6">
                  <input type="text" className= "general-text" placeholder="Boston, MA" />
                </div>
              </div>
            </div>
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="col-md-1">
                      <a href="#"><span className="glyphicon glyphicon-star"></span>
                      </a>
                  </div>
                  <div className="col-md-5">
                    <font size="4"><font face="sarif">What are you interested in?</font></font>
                    <br /><font size="3" color = "gray"><font face="sarif">Mark all that apply.</font></font>
                  </div>
                  <div className="col-md-3">
                  <ul className="nav nav-pills">
                    <li className="active"><a href="#">Restaurants</a></li>
                      <li><a href="#">Museums</a></li>
                        <li><a href="#">Natural Wonders</a></li>
                      </ul>
                      </div>
                      <div className="col-md-3">
                      <ul className="nav nav-pills">
                          <li><a href="#">Historical Landmarks</a></li>
                            <li><a href="#">Natural Wonders</a></li>
                              <li><a href="#">Natural Wonders</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-md-1">
                    <a href="#"><span className="glyphicon glyphicon-plane"></span>
                    </a>
                </div>
                <div className="col-md-5">
                  <font size="4"><font face="sans-sarif">How do you want to travel?</font></font>
                </div>
                <div className="col-md-6">
                <ul className="nav nav-pills">
                  <li className="active"><a href="#">By Plane</a></li>
                    <li><a href="#">By Bus</a></li>
                      <li><a href="#">By Car</a></li>
                </ul>
              </div>
            </div>
            </div>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="col-md-1">
                  <a href="#"><span className="glyphicon glyphicon-bed"></span>
                  </a>
              </div>
              <div className="col-md-5">
                <font size="4"><font face="sans-sarif">What is your preferred accomodation?</font></font>
              </div>
              <div className="col-md-6">
              <ul className="nav nav-pills">
                <li className="active"><a href="#">AirBnB</a></li>
                  <li><a href="#">Hotel</a></li>
                    <li><a href="#">Hostel</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
}
