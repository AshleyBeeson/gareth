import React from 'react';



export default class ActionAdded extends React.Component{

  	addAnotherAction(){
		this.props.onActionAdded();
	}
	
	findLastAction(){
	let allActions = this.props.bugDetails.actions;
	allActions.reverse();
	return allActions[0];
	}


   render(){
	   
	   let mostRecentAction = this.findLastAction();
	  
			return(
		
				<div className="ActionInformation col-md-10 col-md-offset-1" id={mostRecentAction.actionID} ref={mostRecentAction.actionID}>
				
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">Action Has Been Added</h3>
						</div>
						<div className="panel-body">
							<label></label>
							<button type="button" className="btn btn-default" onClick={this.addAnotherAction.bind(this)}>Click to add another</button>
						</div>
					</div>
					
					<div className="panel panel-success container-fluid">
						<div className="panel-heading row">
							<div className="col-md-2" ref="actionID">ID: {this.props.bugDetails.actions.length - 1}</div>
							<div className="col-md-2" ref="actioneDate">Date: {mostRecentAction.dateCreated}</div>
							<div className="col-md-2" ref="actionedBy">User: {mostRecentAction.user}</div> 
						</div>
						<div className="panel-body">
							<label>Action:</label>
							<span  ref="bugSummary">{mostRecentAction.action}</span>
						</div>
					</div>
				</div>
			);
		

    }
	
}