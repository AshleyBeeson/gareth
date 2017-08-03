import React from 'react';
import TerrariumStore from './store/TerrariumStore';
import ActionDetails from './ActionDetails';


export default class BugDetails extends React.Component{


	constructor(props){
		super(props);
		this.state={
		bug: TerrariumStore.getBugById(this.props.location.query.Id)
		};
		this.repopulateFromUpdatedStore = this.repopulateFromUpdatedStore.bind(this);
		this.createArrayOfActions = this.createArrayOfActions.bind(this);
	}	

  	componentWillMount(){
		TerrariumStore.on('Data_Load_From_DB',this.repopulateFromUpdatedStore);
	}
	
	componentWillUnmount() {
		TerrariumStore.removeListener('Data_Load_From_DB',this.repopulateFromUpdatedStore);
    }

	repopulateFromUpdatedStore(){
		console.log("loading data after DB load");
		this.setState({bug: TerrariumStore.getBugById(this.props.location.query.Id)});
		console.log(this.state.bug);
	}
	
	createArrayOfActions(){
		let actionsList = [];
		if (this.state.bug.actions != null)
		{
			this.state.bug.actions.forEach(function(action, loopCount){
				let reference = "actionNum" + loopCount;
				actionsList.push(<ActionDetails actionDetails={action} actionID={loopCount} ref={reference} />);
			});
		}
		return actionsList;
	}

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
		let listOfActions = this.createArrayOfActions();
			return(
			<div className="BugDetails">
				<div className="BugInformation col-md-10 col-md-offset-1" id={this.state.bug.issueId} ref={this.state.bug.issueId}>
					<div className="panel panel-default container-fluid">
						<div className="panel-heading row">
							<div className="col-md-2" ref="bugID">ID: {this.state.bug.issueId}</div>
							<div className="col-md-2" ref="bugDate">Date: {this.state.bug.dateCreated}</div>
							<div className="col-md-2" ref="bugPriority">Priority: {this.state.bug.highPriority ? "High" : "Normal"}</div> 
							<div className="col-md-2" ref="bugSeverity">Severity: {this.parseSeverity(this.state.bug.severity)}</div>
							<div className="col-md-2" ref="bugReporter">Reporter: {this.state.bug.reporter}</div>
							<div className="col-md-2" ref="bugAssigned">Assigned: {this.state.bug.assignedUser}</div>
						</div>
						<div className="panel-body">
							<p>
								<label for="sel1">Summary:</label>
								<span  ref="bugSummary">{this.state.bug.summary}</span>
							</p>
														<p>
								<label for="sel1">Description:</label>
								<span  ref="bugDescription">{this.state.bug.description}</span>
							</p>

						</div>
					</div>
				</div>
				{listOfActions}
				
			</div>	
			);
		

    }
	
}