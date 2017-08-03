import React from 'react';



export default class BugEdited extends React.Component{

  	editAnotherBug(){
		this.props.onBugEdited();
	}
	


   render(){
	   
	  
			return(
		
				<div className="BugConfirm col-md-10 col-md-offset-1">
				
					<div className="panel panel-success">
						<div className="panel-heading">
							<h3 className="panel-title">Bug Has Been Edited</h3>
						</div>
						<div className="panel-body">
							<label></label>
							<button type="button" className="btn btn-default" onClick={this.editAnotherBug.bind(this)}>Click to edited again</button>
						</div>
					</div>
					
				</div>
			);
		

    }
	
}