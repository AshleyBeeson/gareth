import React from 'react';



export default class ColumnSortHeader extends React.Component{

  

   render(){
	  
			return(
				<div className="ColumnSortHeader col-md-10 col-md-offset-1" ref="ColumnHeader">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">Ordering:</h3>
						</div>
						<div className="panel-body row">
							<button type="button" className="btn btn-default col-md-2" >ID</button>
							<button type="button" className="btn btn-default col-md-2" >Date</button>
							<button type="button" className="btn btn-default col-md-2" >Priority</button>
							<button type="button" className="btn btn-default col-md-2" >Severity</button>
							<button type="button" className="btn btn-default col-md-2" >Reporter</button>
							<button type="button" className="btn btn-default col-md-2" >Assigned</button>
						</div>
					</div>
				</div>

			);
		

    }
	
}