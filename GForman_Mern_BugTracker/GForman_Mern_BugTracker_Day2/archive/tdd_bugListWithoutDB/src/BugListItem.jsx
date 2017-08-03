import React from 'react';



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
 


   render(){
	  
			return(
		
				<div className="BugInformation col-md-8 col-md-offset-2" id={this.props.bugDocument.issueId} ref={this.props.bugDocument.issueId}>
					<div className="panel panel-default container-fluid">
						<div className="panel-heading row">
							<div className="col-md-2" ref="bugID">ID: {this.props.bugDocument.issueId}</div>
							<div className="col-md-2" ref="bugDate">Date: {this.props.bugDocument.dateCreated}</div>
							<div className="col-md-2" ref="bugPriority">Priority: {this.props.bugDocument.highPriority ? "High" : "Normal"}</div> 
							<div className="col-md-2" ref="bugSeverity">Severity: {this.parseSeverity(this.props.bugDocument.severity)}</div>
							<div className="col-md-2" ref="bugReporter">Reporter: {this.props.bugDocument.reporter}</div>
							<div className="col-md-2" ref="bugAssigned">Assigned: {this.props.bugDocument.assignedUser}</div>
						</div>
						<div className="panel-body">
							<label for="sel1">Summary:</label>
							<span  ref="bugSummary">{this.props.bugDocument.summary}</span>
						</div>
					</div>
				</div>
			);
		

    }
	
}