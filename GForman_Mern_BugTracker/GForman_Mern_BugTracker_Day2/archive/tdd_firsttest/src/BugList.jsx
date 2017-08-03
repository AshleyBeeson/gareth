import React from 'react';
import NavBar from './NavBar';
import FilterSearch from './FilterSearch';
import ColumnSortHeader from './ColumnSortHeader';
import BugListItem from './BugListItem';



export default class BugList extends React.Component{

  

   render(){
	  
			return(
			<div>
			<NavBar />
			<FilterSearch />
			<ColumnSortHeader />
			<BugListItem />
			</div>
			);
		

    }
	
}
