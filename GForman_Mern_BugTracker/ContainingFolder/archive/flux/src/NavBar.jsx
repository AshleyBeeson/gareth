import React from 'react';



export default class NavBar extends React.Component{

  

   render(){
	  
			return(
				<div className="Navigation" ref="Naviation">
				
					<nav className="navbar navbar-default">
						<div className="container-fluid">
							<div className="navbar-header">
								<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								 </button>
								 <a className="navbar-brand" href="#">Terrarium React</a>
							</div>

								
								<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
								  <ul className="nav navbar-nav">
									<li><a href="#">Bug List</a></li>
									<li><a href="#">Saved Filters</a></li>
									<li><a href="#">Add Bug</a></li>
								  </ul>
								</div>
							  </div>
							</nav>

					
				</div>

			);
		

    }
	
}