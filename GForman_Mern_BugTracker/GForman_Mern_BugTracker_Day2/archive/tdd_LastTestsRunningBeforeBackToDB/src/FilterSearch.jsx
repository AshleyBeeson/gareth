import React from 'react';



export default class FilterSearch extends React.Component{
	
		constructor(props){
		super(props);
		this.handleBugSearchChange = this.handleBugSearchChange.bind(this);
	}

  	handleBugSearchChange(){
		let searchValues = {bugTextInput: this.bugTextInput.value, userTextInput: this.userTextInput.value, severityHigh: this.highSeverityCheckInput.checked, severityMedium: this.mediumSeverityCheckInput.checked, severityLow: this.lowSeverityCheckInput.checked}
		this.props.onBugSearchInput(searchValues);

	}

   render(){
	  
			return(
				<div className="FilterSearch col-md-10 col-md-offset-1" ref="FilterSearch">
					<div className="panel panel-default ">
						<div className="panel-heading">
							<h3 className="panel-title">Search & Filter</h3>
						</div>
						<div className="panel-body">
							<div className="col-md-6">
								<div className="input-group ">
									<span className="input-group-addon">Find Bug</span>
									

									
									
									<input type="text" className="form-control" placeholder="Search by Issue ID, Summary or Description" value={this.props.searchValues.bugSearchText} ref={(input) => this.bugTextInput = input} onChange = {this.handleBugSearchChange} aria-describedby="basic-addon1" id="bugSearchInput"/>
								</div>
								<br />
								<div className="input-group">
									<span className="input-group-addon">Find User's Reports</span>
									<input type="text" className="form-control" placeholder="Enter a username" value={this.props.searchValues.userSearchText} ref={(input) => this.userTextInput = input} onChange = {this.handleBugSearchChange} aria-describedby="basic-addon1" id="userSearchInput" />
								</div>
							</div>
							<div className="col-md-6">
								
									<div className="panel-heading">
										<h3 className="panel-title">Find bugs between:</h3>
									</div>
									<div className="panel-body">
										<input type="datetime-local" name="startdate"  disabled id="startDateInput"/> - <input type="datetime-local" name="enddate"  disabled id="endDateInput"/>
									</div>						
							</div>
							<div className="col-md-6">
								<div className="col-md-12">
									<label for="sel1">High Priorty:</label>
									<select className="form-control" id="sel1">
										<option>All</option>
										<option>True</option>
										<option>False</option>
									</select>
								</div>
								<div className="col-md-12">
									<label for="sel1">Severity:</label>
									<div className="input-group col-md-12">
										<span className="input-group-addon"><input type="checkbox" aria-label="..."  id="highSeverityInput" ref={(input) => this.highSeverityCheckInput = input} onChange = {this.handleBugSearchChange} checked={this.props.searchValues.severityHigh} /></span>
										<input type="text" className="form-control" placeholder="High" aria-describedby="basic-addon1" disabled id="highText"/>
										<span className="input-group-addon"><input type="checkbox" aria-label="..."  id="mediumSeverityInput" ref={(input) => this.mediumSeverityCheckInput = input} onChange = {this.handleBugSearchChange} checked={this.props.searchValues.severityMedium} /></span>
										<input type="text" className="form-control" placeholder="Medium" aria-describedby="basic-addon1" disabled id="medText"/>
										<span className="input-group-addon"><input type="checkbox" aria-label="..."  id="lowSeverityInput" ref={(input) => this.lowSeverityCheckInput = input} onChange = {this.handleBugSearchChange} checked={this.props.searchValues.severityLow} /></span>
										<input type="text" className="form-control" placeholder="Low" aria-describedby="basic-addon1" disabled id="lowText"/>
										
									</div>


								</div>
							</div>
							<div className="col-md-6">
							<br />
							<br />
								<label for="sel1">Save this search:</label>
								<div className="input-group col-md-12">
									<input type="text" className="form-control" placeholder="Enter a name for the search" aria-describedby="basic-addon1"  id="searchSaveNameInput"/>
									<span className="input-group-btn">
										<button type="button" className="btn btn-default"  disabled >Save</button>
									</span>
								</div>
							</div>
						
						
						</div>
					</div>
				</div>

			);
		

    }
	
}