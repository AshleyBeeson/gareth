import React from 'react';



export default class BugListItem extends React.Component{

  

   render(){
	  
			return(
		
				<div className="BugInformation col-md-8 col-md-offset-2" id="BUG-00001" ref="BUG-00001">
					<div className="panel panel-default container-fluid">
						<div className="panel-heading row">
							<div className="col-md-2" ref="bugID">ID: BUG-00001</div>
							<div className="col-md-2" ref="bugDate">Date: 03/07/2017 11:15</div>
							<div className="col-md-2" ref="bugPriority">Priority: High</div>
							<div className="col-md-2" ref="bugSeverity">Severity: Medium</div>
							<div className="col-md-2" ref="bugReporter">Reporter: QAC</div>
							<div className="col-md-2" ref="bugAssigned">Assigned: Un-assigned</div>
						</div>
						<div className="panel-body">
							<label for="sel1">Summary:</label>
							<span  ref="bugSummary">Search function doesn't like special characters</span>
							<div ref="propTest">{this.props.bugRecordObject.id}</div>
						</div>
					</div>
				</div>
			);
		

    }
	
}