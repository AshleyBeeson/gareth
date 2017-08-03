import React from 'react';



export default class ActionDetails extends React.Component{




   render(){
	  
			return(
		
				<div className="ActionInformation col-md-10 col-md-offset-1" id={this.props.actionID} ref={this.props.actionID}>
					<div className="panel panel-default container-fluid">
						<div className="panel-heading row">
							<div className="col-md-2" ref="actionID">ID: {this.props.actionID}</div>
							<div className="col-md-2" ref="actioneDate">Date: {this.props.actionDetails.dateCreated}</div>
							<div className="col-md-2" ref="actionedBy">User: {this.props.actionDetails.user}</div> 
						</div>
						<div className="panel-body">
							<label for="sel1">Action:</label>
							<span  ref="bugSummary">{this.props.actionDetails.action}</span>
						</div>
					</div>
				</div>
			);
		

    }
	
}