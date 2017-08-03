import React from 'react';
import NavBar from './NavBar';
import TerrariumStore from './store/TerrariumStore'



export default class Terrarium extends React.Component{

  componentWillMount(){
		TerrariumStore.populateStoreFromDB();
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
