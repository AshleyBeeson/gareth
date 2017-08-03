import React from 'react';



export default class FilterSearch extends React.Component{

  

   render(){
	  
			return(
				<div className="FilterSearch col-md-8 col-md-offset-2" ref="FilterSearch">
					<div className="panel panel-default ">
						<div className="panel-heading">
							<h3 className="panel-title">Search & Filter</h3>
						</div>
						<div className="panel-body">
							<div className="col-md-6">
								<div className="input-group ">
									<span className="input-group-addon">Find Bug</span>
									<input type="text" className="form-control" placeholder="Search but ID and description" aria-describedby="basic-addon1" />
								</div>
								<br />
								<div className="input-group">
									<span className="input-group-addon">Find User's Reports</span>
									<input type="text" className="form-control" placeholder="Enter a username" aria-describedby="basic-addon1" />
								</div>
							</div>
							<div className="col-md-6">
								
									<div className="panel-heading">
										<h3 className="panel-title">Find bugs between:</h3>
									</div>
									<div className="panel-body">
										<input type="datetime-local" name="startdate" /> - <input type="datetime-local" name="enddate" />
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
										<span className="input-group-addon"><input type="checkbox" aria-label="..." /></span>
										<input type="text" className="form-control" placeholder="High" aria-describedby="basic-addon1" disabled />
										<span className="input-group-addon"><input type="checkbox" aria-label="..." /></span>
										<input type="text" className="form-control" placeholder="Medium" aria-describedby="basic-addon1" disabled />
										<span className="input-group-addon"><input type="checkbox" aria-label="..." /></span>
										<input type="text" className="form-control" placeholder="Low" aria-describedby="basic-addon1" disabled />
										
									</div>


								</div>
							</div>
							<div className="col-md-6">
							<br />
							<br />
								<label for="sel1">Save this search:</label>
								<div className="input-group col-md-12">
									<input type="text" className="form-control" placeholder="Enter a name for the search" aria-describedby="basic-addon1" />
									<span className="input-group-btn">
										<button type="button" className="btn btn-default">Save</button>
									</span>
								</div>
							</div>
						
						
						</div>
					</div>
				</div>

			);
		

    }
	
}