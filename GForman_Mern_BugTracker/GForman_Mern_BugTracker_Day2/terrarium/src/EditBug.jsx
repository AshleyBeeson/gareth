import React from 'react';
import TerrariumStore from './store/TerrariumStore';
import ActionDetails from './ActionDetails';
import * as TerrariumActions from './actions/TerrariumActions';
import BugEdited from './BugEdited';


export default class EditBug extends React.Component{


	constructor(props){
		super(props);
		this.state={
		bug: TerrariumStore.getBugById(this.props.location.query.Id),
		bugValues:{
							_id: '',
							id: '',
							issueId: '',
							dateCreated: '',
							summary: '',
							description: '',
							highPiority: '',
							severity: '',
							reporter: '',
							assignedUser: '',
							status: '',
							actions: []
						},
		bugEdited: false
		};
		this.repopulateFromUpdatedStore = this.repopulateFromUpdatedStore.bind(this);
		this.createArrayOfActions = this.createArrayOfActions.bind(this);
		this.editBugToDB = this.editBugToDB.bind(this);
		this.handleBugDetailsChange = this.handleBugDetailsChange.bind(this);

		this.showEditedBug = this.showEditedBug.bind(this);
		this.showEditedBugToggle = this.showEditedBugToggle.bind(this);
		this.showEditAnotherBugToggle = this.showEditAnotherBugToggle.bind(this);

	}	
	
	handleBugDetailsChange(){
		let bugValues = {		
							_id: this.state.bug._id,
							id: this.idInput.value,
							issueId: this.issueIdInput.value,
							dateCreated: this.state.bug.dateCreated,
							summary: this.summaryInput.value,
							description: this.descriptionInput.value,
							highPiority: this.highPriorityInput.value,
							severity: this.severityInput.value,
							reporter: this.reporterInput.value,
							assignedUser:this.assignedUserInput.value,
							status: this.statusInput.value,
							actions: []
							}
		this.setState({bugValues: bugValues});
	}

  	componentWillMount(){
		TerrariumStore.on('Data_Load_From_DB',this.repopulateFromUpdatedStore);
		let bugDetails = this.state.bug;
		console.log("one");
		console.log(bugDetails);		
		let currentDetails = {	
							_id: bugDetails._id,
							id: bugDetails.id,
							issueId: bugDetails.issueId,
							dateCreated: bugDetails.dateCreated,
							summary: bugDetails.summary,
							description: bugDetails.description,
							highPiority: bugDetails.highPiority,
							severity: bugDetails.severity,
							reporter: bugDetails.reporter,
							assignedUser: bugDetails.assignedUser,
							status: bugDetails.status,
							actions: bugDetails.actions
		};
		console.log("two");
		console.log(currentDetails);
				this.setState({bugValues: currentDetails});
		console.log(this.state.bugValues);
	}
	
	componentWillUnmount() {
		TerrariumStore.removeListener('Data_Load_From_DB',this.repopulateFromUpdatedStore);
    }

	repopulateFromUpdatedStore(){
		console.log("loading data after DB load");
		let bugDetails = TerrariumStore.getBugById(this.props.location.query.Id);
		this.setState({bug: bugDetails});
		console.log(this.state.bug);
		bugDetails = this.state.bug;
		console.log("one");
		console.log(bugDetails);		
		let currentDetails = {		
							_id: bugDetails._id,
							id: bugDetails.id,
							issueId: bugDetails.issueId,
							dateCreated: bugDetails.dateCreated,
							summary: bugDetails.summary,
							description: bugDetails.description,
							highPiority: bugDetails.highPiority,
							severity: bugDetails.severity,
							reporter: bugDetails.reporter,
							assignedUser: bugDetails.assignedUser,
							status: bugDetails.status,
							actions: bugDetails.actions
		};
		console.log("two");
		console.log(currentDetails);
				this.setState({bugValues: currentDetails});
		console.log(this.state.bugValues);
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
	 
	editBugToDB(){
		/*let testInsertBug = {id: 7, issueId: "TEST-00001", dateCreated:"03/07/2017 11:38", 
							summary: "Issues can be duplicated", description: "Some of the issues created are being duplicated", highPriority : "FAlSE", severity: "MEDIUM", 
							reporter : "GarethF", assignedUser: "Un-assigned", actions: [], status: "TO DO"};
		*/


		let apiPath = "/api/bugs/" + this.state.bugValues._id;
		console.log(apiPath);
        fetch(apiPath,{
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
					id: this.state.bugValues.id,
					issueId: this.state.bugValues.issueId,
					dateCreated: this.state.bugValues.dateCreated,
					summary: this.state.bugValues.summary,
					description: this.state.bugValues.description,
					highPriority: this.state.bugValues.highPriority,
					severity: this.state.bugValues.severity,
					reporter: this.state.bugValues.reporter,
					assignedUser: this.state.bugValues.assignedUser,
					actions: this.state.bugValues.actions,
					status: this.state.bugValues.status,
            })
        }).then( (res) => {
            console.log("Req success: ", res);
			TerrariumActions.pullFromDB();

			this.showEditedBugToggle();
			document.getElementById("editBugButton").disabled = true;

           
        });
	}

	showEditAnotherBugToggle(){

		console.log("TOGGLING!");
		console.log("change1" + this.state.bugEdited);
		let changeTo = !this.state.bugEdited;
		console.log("change1" + changeTo);
		this.setState({bugEdited: changeTo});
		document.getElementById("editBugButton").disabled = false;

	 }
	
	showEditedBug(){

		console.log("TEST1");
		let componentToShow = [];
		console.log("CHANGEER" + this.state.bugEdited);
		 if(this.state.bugEdited){
			componentToShow.push(<BugEdited bugDetails={this.state.bug} onBugEdited={this.showEditAnotherBugToggle} />);
			 console.log("TEST2");
		 }else if(!this.state.bugEdited){
			 			 
			 console.log("TEST3");
		 }
		 
		return componentToShow;

	 }
	 
	showEditedBugToggle(){

		console.log("TOGGLING!");
		let changeTo = !this.state.bugEdited;
		this.setState({bugEdited: changeTo});

	 }

   render(){
	   let bugEditer = this.showEditedBug();
			return(
			<div className="BugDetails">
				<div className="BugInformation col-md-10 col-md-offset-1" id={this.state.bug.issueId} ref={this.state.bug.issueId}>
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">Search & Filter</h3>
						</div>
						<div className="panel-body">
							
							
							<div className="col-md-6">
								<div className="input-group ">
									<span className="input-group-addon">Bug ID</span>
									<input type="text" className="form-control" placeholder="enter number" value={this.state.bugValues.id} ref={(input) => this.idInput = input} onChange = {this.handleBugDetailsChange} aria-describedby="basic-addon1" id="bugSearchInput" disabled/>
								</div>
								<br />
								<div className="input-group">
									<span className="input-group-addon">Issue ID</span>
									<input type="text" className="form-control" placeholder="e.g. BUG-XXXXX" value={this.state.bugValues.issueId} ref={(input) => this.issueIdInput = input} onChange = {this.handleBugDetailsChange} aria-describedby="basic-addon1" id="userSearchInput" />
								</div>
								<br />
							</div>
							<div className="col-md-6">
																<div className="input-group ">
									<span className="input-group-addon">Reporter</span>
									<input type="text" className="form-control" placeholder="Your Name" value={this.state.bugValues.reporter} ref={(input) => this.reporterInput = input} onChange = {this.handleBugDetailsChange} aria-describedby="basic-addon1" id="bugSearchInput"/>
								</div>
								<br />
								<div className="input-group">
									<span className="input-group-addon">Assigned</span>
									<input type="text" className="form-control" placeholder="Name of person assigned" value={this.state.bugValues.assignedUser} ref={(input) => this.assignedUserInput = input} onChange = {this.handleBugDetailsChange} aria-describedby="basic-addon1" id="userSearchInput" />
								</div>
					
							</div>
							<div className="col-md-6">
								<div className="col-md-4">
									<div className="input-group col-md-12">
									<label>High Priorty:</label>
									<select className="form-control" id="highPriority" value={this.state.bugValues.highPriority} ref={(input) => this.highPriorityInput = input} onChange = {this.handleBugDetailsChange}>
										<option value="TRUE">True</option>
										<option value="FALSE">False</option>
									</select>
									</div>
								</div>
								<div className="col-md-4">
									<div className="input-group col-md-12">
									<label>Severity:</label>
									<select className="form-control" id="severity" value={this.state.bugValues.severity} ref={(input) => this.severityInput = input} onChange = {this.handleBugDetailsChange}>
										<option value="HIGH">High</option>
										<option value="MEDIUM">Medium</option>
										<option value="LOW">Low</option>
									</select>
										
									</div>
								</div>
								<div className="col-md-4">
									<div className="input-group col-md-12">
									<label>Status:</label>
									<select className="form-control" id="status" value={this.state.bugValues.status} ref={(input) => this.statusInput = input} onChange = {this.handleBugDetailsChange}>
										<option value="TO DO">To Do</option>
										<option value="IN PROGRESS">In Progress</option>
										<option value="IN REVIEW">In Review</option>
										<option value="IN TEST">In Test</option>
										<option value="IN DEMO">In Demo</option>
										<option value="DONE">Done</option>
									</select>
										
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="input-group ">
									<span className="input-group-addon">Summary</span>
									<input type="text" className="form-control" placeholder="Enter Text" value={this.state.bugValues.summary} ref={(input) => this.summaryInput = input} onChange = {this.handleBugDetailsChange} aria-describedby="basic-addon1" id="bugSearchInput"/>
								</div>
								<br />
								<div className="input-group">
									<span className="input-group-addon">Description</span>
									<input type="text" className="form-control" placeholder="Enter text" value={this.state.bugValues.description} ref={(input) => this.descriptionInput = input} onChange = {this.handleBugDetailsChange} aria-describedby="basic-addon1" id="userSearchInput" />
								</div>
							</div>
							<div className="col-md-6">
							<br />
							<br />
								<label>Save this bug:</label>
								<div className="input-group col-md-12">
										<button type="button" className="btn btn-default" onClick={this.editBugToDB} id="editBugButton">Edit Bug</button>
								</div>
							</div>
						
						
						

						</div>
					</div>
				</div>
				{bugEditer}
			</div>	
			);
		

    }
	
}