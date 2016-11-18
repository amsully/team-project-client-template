import React from 'react';

export default class MainPage extends React.Component{
    render(){
      return(
        <div className="panel panel-default trip-gen">
            <div className="panel-body">
                <div className="row">
                    <div className="col-xs-12 trip-gen-header">
                        <div>
                            Generate a Trip!
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="pull-left">
                            Enter your start and end date and we will generate a trip near you!
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-9">
                        <form className="form-inline">
                            <div className="form-group">
                                <label htmlFor="startdate">Start:</label>
                                <input type="date" className="form-control" id="startdate"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="enddate">End:</label>
                                <input type="date" className="form-control" id="enddate"/>
                            </div>
                        </form>
                    </div>
                    <div className="col-xs-3">
                        <div className="pull-right">
                            <button type="button" className="btn btn-primary" data-toggle="modal" href="#generated">
                                Generate
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                        <div className="pull-center">
                            <a href="#">Customize</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
    }
}
