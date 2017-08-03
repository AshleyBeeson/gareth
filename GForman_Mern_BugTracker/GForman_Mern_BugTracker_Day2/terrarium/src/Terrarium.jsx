import React from 'react';
import NavBar from './NavBar';
import TerrariumStore from './store/TerrariumStore'
import * as TerrariumActions from './actions/TerrariumActions';


export default class Terrarium extends React.Component{

  componentWillMount(){
		TerrariumActions.pullFromDB();
	}
	

   render(){
	  
			return(
				<div>
					<NavBar />
					<div id="domMain">
						<main>{this.props.children}</main>
					</div>

				</div>
			);
		

    }
	
}
