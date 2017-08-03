import React from 'react';



export default class Terrarium extends React.Component{

  

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
