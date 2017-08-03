import React from 'react';
import TerrariumStore from './store/TerrariumStore'



export default class Terrarium extends React.Component{

  componentWillMount(){
		TerrariumStore.populateStoreFromDB();
	}
	

   render(){
	  
			return(
				<div>
					<div id="domMain">
						<main>{this.props.children}</main>
					</div>

				</div>
			);
		

    }
	
}
