import React from 'react';
import {Link} from 'react-router';



export default class BugListItem extends React.Component{

 parseSeverity(severity){
	let formattedSeverity = "Null";
			switch(severity) {
			case "HIGH":
				formattedSeverity = "High";
			break;
			case "MEDIUM":
				formattedSeverity = "Medium";
			break;
			case "LOW":
				formattedSeverity = "Low";
			break;
			default:
			break;
		}
	return formattedSeverity;
	 
 };
 
checkPriority(){
	let priorityOutput = "default";
	if(this.props.bugDocument.highPriority == "TRUE"){
		priorityOutput = "High"
	}else{
		priorityOutput = "Normal"
	}
	return priorityOutput;
}

   render(){
	  
			return(
		
				<div className="BugInformation col-md-10 col-md-offset-1" id={this.props.bugDocument.issueId} ref={this.props.bugDocument.issueId}>
					<div className="panel panel-default container-fluid">
						<div className="panel-heading row">
							<div className="col-md-2" ref="bugID">ID: {this.props.bugDocument.issueId}</div>
							<div className="col-md-2" ref="bugDate">Date: {this.props.bugDocument.dateCreated}</div>
							<div className="col-md-2" ref="bugPriority">Priority: {this.checkPriority()}</div> 
							<div className="col-md-2" ref="bugSeverity">Severity: {this.parseSeverity(this.props.bugDocument.severity)}</div>
							<div className="col-md-2" ref="bugReporter">Reporter: {this.props.bugDocument.reporter}</div>
							<div className="col-md-2" ref="bugAssigned">Assigned: {this.props.bugDocument.assignedUser}</div>
						</div>
						<div className="panel-body">
							<label>Summary:</label>
							<span  ref="bugSummary">{this.props.bugDocument.summary}</span>
							<Link to={{ pathname: "BugDetails", query: { Id:this.props.bugDocument.id }}}><button type="button" className="btn btn-default col-md-offset-10">View Details</button></Link>
						</div>
					</div>
				</div>
			);
		

    }
	
}