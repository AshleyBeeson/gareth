import React from 'react';
import * as TerrariumActions from './actions/TerrariumActions';



export default class AddAction extends React.Component{
	
	constructor(props){
		super(props);
		this.state={
		actionValues:{
							user: '',
							action: '',
						},
		};
		this.insertActionToDB = this.insertActionToDB.bind(this);
		this.handleActionDetailsChange = this.handleActionDetailsChange.bind(this);
	}

	handleActionDetailsChange(){
		let actionValues = {							
							user: this.userInput.value,
							action: this.actionInput.value,
							}
		this.setState({actionValues: actionValues});
		console.log(this.state.actionValues);
	}
	
	insertActionToDB(){
		
		let currentDate = new Date();
		let jsonDate = currentDate.toJSON();
		let apiPath = "/api/bugs/" + this.props.bugDetails._id;
		let newAction ={
					user: this.state.actionValues.user,
					dateCreated: jsonDate,
					action: this.state.actionValues.action,
		}
		let allActions = this.props.bugDetails.actions;
		allActions.push(newAction);
        fetch(apiPath,{
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
					actions : allActions,
            })
        }).then( (res) => {

            console.log("Req success: ", res);
			TerrariumActions.pullFromDB();
			this.props.onActionAdded();
        });
	}

   render(){
	  
			return(
		
				<div className="ActionInformation col-md-10 col-md-offset-1" >
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">Add A New Action</h3>
						</div>
						<div className="panel-body">
							
								<div className="input-group ">
									<span className="input-group-addon">User:</span>
									<input type="text" className="form-control" placeholder="Your Name" value={this.state.actionValues.user} ref={(input) => this.userInput = input} onChange = {this.handleActionDetailsChange} aria-describedby="basic-addon1" id="bugSearchInput"/>
								</div>
								<br />
								<div className="input-group">
									<span className="input-group-addon">Action:</span>
									<input type="text" className="form-control" placeholder="Describe Action Taken" value={this.state.actionValues.action} ref={(input) => this.actionInput = input} onChange = {this.handleActionDetailsChange} aria-describedby="basic-addon1" id="userSearchInput" />
								</div>
								<br />
								<button type="button" className="btn btn-default" onClick={this.insertActionToDB.bind(this)}>Add Action</button>
							
						</div>
					</div>
				</div>
			);
		

    }
	
}