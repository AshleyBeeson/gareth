import React from 'react';



export default class BugAdded extends React.Component{

  	addAnotherBug(){
		this.props.onBugAdded();
	}
	


   render(){
	   
	  
			return(
		
				<div className="BugConfirm col-md-10 col-md-offset-1">
				
					<div className="panel panel-success">
						<div className="panel-heading">
							<h3 className="panel-title">Bug Has Been Added</h3>
						</div>
						<div className="panel-body">
							<label></label>
							<button type="button" className="btn btn-default" onClick={this.addAnotherBug.bind(this)}>Click to add another</button>
						</div>
					</div>
					
				</div>
			);
		

    }
	
}