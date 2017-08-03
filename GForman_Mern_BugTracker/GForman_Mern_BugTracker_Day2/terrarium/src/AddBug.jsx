import React from 'react';
import TerrariumStore from './store/TerrariumStore';
import ActionDetails from './ActionDetails';
import * as TerrariumActions from './actions/TerrariumActions';
import BugAdded from './BugAdded';

export default class AddBug extends React.Component{


	constructor(props){
		super(props);
		this.state={
		bugValues:{
							
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
		bugAdded: false
		};
		this.repopulateFromUpdatedStore = this.repopulateFromUpdatedStore.bind(this);
		this.insertBugToDB = this.insertBugToDB.bind(this);
		this.handleBugSearchChange = this.handleBugSearchChange.bind(this);
		this.showAddedBug = this.showAddedBug.bind(this);
		this.showAddedBugToggle = this.showAddedBugToggle.bind(this);
		this.showAddAnotherBugToggle = this.showAddAnotherBugToggle.bind(this);
	}	
	
	handleBugSearchChange(){
		let bugValues = {
							
							id: this.idInput.value,
							issueId: this.issueIdInput.value,
							dateCreated: '',
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
		console.log(this.state.bugValues);
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
	 
	insertBugToDB(){
		/*let testInsertBug = {id: 7, issueId: "TEST-00001", dateCreated:"03/07/2017 11:38", 
							summary: "Issues can be duplicated", description: "Some of the issues created are being duplicated", highPriority : "FAlSE", severity: "MEDIUM", 
							reporter : "GarethF", assignedUser: "Un-assigned", actions: [], status: "TO DO"};
		*/

		let currentDate = new Date();
		let jsonDate = currentDate.toJSON();
        fetch("/api/bugs",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
					id: this.state.bugValues.id,
					issueId: this.state.bugValues.issueId,
					dateCreated: jsonDate,
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
			this.showAddedBugToggle();
			document.getElementById("addBugButton").disabled = true;
        });
	}
	

	showAddAnotherBugToggle(){
		console.log("TOGGLING!");
		let changeTo = !this.state.bugAdded;
						 let bugValues = {
							
							id: '',
							issueId: '',
							dateCreated: '',
							summary: '',
							description: '',
							highPiority: '',
							severity: '',
							reporter: '',
							assignedUser:'',
							status: '',
							actions: []
							}
		this.setState({bugAdded: changeTo,
						bugValues: bugValues});
		document.getElementById("addBugButton").disabled = false;
	 }
	
	showAddedBug(){

		let componentToShow = [];
		 if(this.state.bugAdded){
			componentToShow.push(<BugAdded bugDetails={this.state.bug} onBugAdded={this.showAddAnotherBugToggle} />);

		 }		 
		return componentToShow;
	 }
	 
	showAddedBugToggle(){

		let changeTo = !this.state.bugAdded;
		this.setState({bugAdded: changeTo});
	 }


   render(){
	   
	   let bugAdder = this.showAddedBug();

			return(
			<div className="BugDetails">
				<div className="BugInformation col-md-10 col-md-offset-1">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">Add A New Bug</h3>
						</div>
						<div className="panel-body">
							
							
							<div className="col-md-6">
								<div className="input-group ">
									<span className="input-group-addon">Bug ID</span>
									<input type="text" className="form-control" placeholder="enter number" value={this.state.bugValues.id} ref={(input) => this.idInput = input} onChange = {this.handleBugSearchChange} aria-describedby="basic-addon1" id="bugSearchInput"/>
								</div>
								<br />
								<div className="input-group">
									<span className="input-group-addon">Issue ID</span>
									<input type="text" className="form-control" placeholder="e.g. BUG-XXXXX" value={this.state.bugValues.issueId} ref={(input) => this.issueIdInput = input} onChange = {this.handleBugSearchChange} aria-describedby="basic-addon1" id="userSearchInput" />
								</div>
								<br />
							</div>
							<div className="col-md-6">
																<div className="input-group ">
									<span className="input-group-addon">Reporter</span>
									<input type="text" className="form-control" placeholder="Your Name" value={this.state.bugValues.reporter} ref={(input) => this.reporterInput = input} onChange = {this.handleBugSearchChange} aria-describedby="basic-addon1" id="bugSearchInput"/>
								</div>
								<br />
								<div className="input-group">
									<span className="input-group-addon">Assigned</span>
									<input type="text" className="form-control" placeholder="Name of person assigned" value={this.state.bugValues.assignedUser} ref={(input) => this.assignedUserInput = input} onChange = {this.handleBugSearchChange} aria-describedby="basic-addon1" id="userSearchInput" />
								</div>
					
							</div>
							<div className="col-md-6">
								<div className="col-md-4">
									<div className="input-group col-md-12">
									<label>High Priorty:</label>
									<select className="form-control" id="highPriority" value={this.state.bugValues.highPriority} ref={(input) => this.highPriorityInput = input} onChange = {this.handleBugSearchChange}>
										<option value="TRUE">True</option>
										<option value="FALSE">False</option>
									</select>
									</div>
								</div>
								<div className="col-md-4">
									<div className="input-group col-md-12">
									<label>Severity:</label>
									<select className="form-control" id="severity" value={this.state.bugValues.severity} ref={(input) => this.severityInput = input} onChange = {this.handleBugSearchChange}>
										<option value="HIGH">High</option>
										<option value="MEDIUM">Medium</option>
										<option value="LOW">Low</option>
									</select>
										
									</div>
								</div>
								<div className="col-md-4">
									<div className="input-group col-md-12">
									<label>Status:</label>
									<select className="form-control" id="status" value={this.state.bugValues.status} ref={(input) => this.statusInput = input} onChange = {this.handleBugSearchChange}>
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
									<input type="text" className="form-control" placeholder="Enter Text" value={this.state.bugValues.summary} ref={(input) => this.summaryInput = input} onChange = {this.handleBugSearchChange} aria-describedby="basic-addon1" id="bugSearchInput"/>
								</div>
								<br />
								<div className="input-group">
									<span className="input-group-addon">Description</span>
									<input type="text" className="form-control" placeholder="Enter text" value={this.state.bugValues.description} ref={(input) => this.descriptionInput = input} onChange = {this.handleBugSearchChange} aria-describedby="basic-addon1" id="userSearchInput" />
								</div>
							</div>
							<div className="col-md-6">
							<br />
							<br />
								<label>Save this bug:</label>
								<div className="input-group col-md-12">
										<button type="button" className="btn btn-default" onClick={this.insertBugToDB} id="addBugButton">Add Bug</button>
								</div>
							</div>
						
						
						

						</div>
					</div>
				</div>
				{bugAdder}				
			</div>
			
			);
		

    }
	
}