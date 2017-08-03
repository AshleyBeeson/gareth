import React from 'react';
import TerrariumStore from './store/TerrariumStore';
import ActionDetails from './ActionDetails';
import AddAction from './AddAction';
import ActionAdded from './ActionAdded';
import {Link} from 'react-router';

export default class BugDetails extends React.Component{


	constructor(props){
		super(props);
		this.state={
		bug: TerrariumStore.getBugById(this.props.location.query.Id),
		actionAdded: false
		};
		this.repopulateFromUpdatedStore = this.repopulateFromUpdatedStore.bind(this);
		this.createArrayOfActions = this.createArrayOfActions.bind(this);
		this.showAddedAction = this.showAddedAction.bind(this);
		this.showAddedActionToggle = this.showAddedActionToggle.bind(this);
		
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
	 
	 showAddedAction(){
		console.log("TEST1");
		let componentToShow = [];
		 if(this.state.actionAdded){
			componentToShow.push(<ActionAdded bugDetails={this.state.bug} onActionAdded={this.showAddedActionToggle} />);
			 console.log("TEST2");
		 }else if(!this.state.actionAdded){
			 componentToShow.push(<AddAction bugDetails={this.state.bug} onActionAdded={this.showAddedActionToggle} />);
			 console.log("TEST3");
		 }
		return componentToShow;
	 }
	 
	 showAddedActionToggle(){
		console.log("TOGGLING!");
		let changeTo = !this.state.actionAdded;
		this.setState({actionAdded: changeTo});
	 }
	 


   render(){
		let listOfActions = this.createArrayOfActions();
		let actionAdder = this.showAddedAction();
			return(
			<div className="BugDetails">
				<div className="BugInformation col-md-10 col-md-offset-1" id={this.state.bug.issueId} ref={this.state.bug.issueId}>
					<div className="panel panel-default container-fluid">
						<div className="panel-heading row">
							<div className="col-md-2" ref="bugID">ID: {this.state.bug.issueId}</div>
							<div className="col-md-2" ref="bugDate">Date: {this.state.bug.dateCreated}</div>
							<div className="col-md-1" ref="bugPriority">Priority: {this.state.bug.highPriority ? "High" : "Normal"}</div> 
							<div className="col-md-1" ref="bugSeverity">Severity: {this.parseSeverity(this.state.bug.severity)}</div>
							<div className="col-md-2" ref="bugReporter">Reporter: {this.state.bug.reporter}</div>
							<div className="col-md-2" ref="bugAssigned">Assigned: {this.state.bug.assignedUser}</div>
							<div className="col-md-2" ref="bugStatus">Status: {this.state.bug.status}</div>
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
							<Link to={{ pathname: "EditBug", query: { Id:this.props.location.query.Id}}}><button type="button" className="btn btn-default col-md-offset-10">Edit Bug</button></Link>
						</div>
					</div>
				</div>
				{actionAdder}
				{listOfActions}
				
			</div>	
			);
		

    }
	
}