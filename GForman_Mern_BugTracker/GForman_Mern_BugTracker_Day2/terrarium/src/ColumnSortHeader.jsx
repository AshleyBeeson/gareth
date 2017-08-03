import React from 'react';



export default class ColumnSortHeader extends React.Component{

		constructor(props){
		super(props);
		this.handleBugSort = this.handleBugSort.bind(this);
        
	}
  
  	handleBugSort(e){
		this.props.onSortSelection(e.target.value);
	}
	
	outputSortTypeAndOrder(){
		let outputString = "Currrently sorted by ";
			switch(this.props.currentSort.sortType) {

			case "issueId":
				outputString += "the logged Issue ID ";
			break;
			
			case "reporter":
				outputString += "the user who reported ";
			break;
			
			case "assignedUser":
				outputString += "the Assigned User ";
			break;
			
			case "highPriority":
				outputString += "Priority ";
			break;
			
			case "severity":
				outputString += "Severity ";
			break;
			
			case "dateCreated":
				outputString += "the Date Created ";
			default:
				outputString += "no category ";
			break;
		}
		
		if(this.props.currentSort.sortOrder == "ASCENDING"){
			outputString += "in Ascending order.";
		}else if(this.props.currentSort.sortOrder == "ASCENDING"){
			outputString += "in Descending order.";
		}else{
			outputString += "in no order.";
		}
		
		return 	outputString;
		
	}

   render(){
	  let orderingDetails = this.outputSortTypeAndOrder()
			return(
				<div className="ColumnSortHeader col-md-10 col-md-offset-1" ref="ColumnHeader">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">Ordering: {orderingDetails}</h3>
						</div>
						<div className="panel-body row">
							<button type="button" className="btn btn-default col-md-2" ref="buttonID" onClick={this.handleBugSort.bind(this)} value="issueId">ID</button>
							<button type="button" className="btn btn-default col-md-2" ref="buttonDate"  onClick={this.handleBugSort.bind(this)} value="dateCreated">Date</button>
							<button type="button" className="btn btn-default col-md-2" ref="buttonPriority" onClick={this.handleBugSort.bind(this)} value="highPriority">Priority</button>
							<button type="button" className="btn btn-default col-md-2" ref="buttonSeverity" onClick={this.handleBugSort.bind(this)} value="severity">Severity</button>
							<button type="button" className="btn btn-default col-md-2" ref="buttonReporter" onClick={this.handleBugSort.bind(this)} value="reporter">Reporter</button>
							<button type="button" className="btn btn-default col-md-2" ref="buttonAssigned" onClick={this.handleBugSort.bind(this)} value="assignedUser">Assigned</button>
						</div>
					</div>
				</div>

			);
		

    }
	
}