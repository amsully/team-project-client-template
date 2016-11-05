import React from 'react';
export default
class Modal extends React.Component{
  render(){
    return(
      <div className="modal fade" id="choose-city">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h1 className="modal-title">Generated Vacations</h1>
            </div>
            <div className="modal-body">
//Trip summary items will go here
            </div>
            <div className="modal-footer">
              <div className="text-center">
                  <h2>Don't like any of these?</h2>
                  <ul className="list-inline">
                    <li>
                      <button type="button" className="btn btn-primary btn-lg">
                        Generate Again
                      </button>
                    </li>
                    <li> or </li>
                    <li>
                      <button type="button" className="btn btn-primary btn-lg">
                        Customize Preferences
                      </button>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
