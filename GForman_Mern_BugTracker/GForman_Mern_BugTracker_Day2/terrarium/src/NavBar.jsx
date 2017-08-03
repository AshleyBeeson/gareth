import React from 'react';
import {Link} from 'react-router';


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
								 <Link to="/"><span className="navbar-brand">Terrarium React</span></Link>
							</div>

								
								<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
								  <ul className="nav navbar-nav">
									<li><Link to="/BugList">Bug List</Link></li>
									<li><Link to="/">Saved Filters</Link></li>
									<li><Link to="/AddBug">Add Bug</Link></li>
								  </ul>
								  <ul className="nav navbar-nav navbar-right">
									<li><p className="navbar-text">Gareth Forman's Mern Assessment</p></li>
								  </ul>
								</div>
							
						</div>
					</nav>

					
				</div>

			);
		

    }
	
}