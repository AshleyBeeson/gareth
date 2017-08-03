import React from 'react';
import NavBar from './NavBar';
import FilterSearch from './FilterSearch';
import ColumnSortHeader from './ColumnSortHeader';
import BugListItem from './BugListItem';
import TerrariumStore from './store/TerrariumStore'



export default class BugList extends React.Component{
	constructor(props){
		super(props);
		this.state={

		bugs: this.props.bugs
		};
		this.repopulateFromUpdatedStore = this.repopulateFromUpdatedStore.bind(this);
		this.createArrayOfBugListItems = this.createArrayOfBugListItems.bind(this);
	}	

  	componentWillMount(){
		/*TerrariumStore.on('Data_Load_From_DB',this.repopulateFromUpdatedStore);	*/
		console.log("props test");
		console.log(this.state.bugs);
	}
	
	componentWillUnmount() {
		/*TerrariumStore.removeListener('Data_Load_From_DB',this.repopulateFromUpdatedStore);*/
    }

	repopulateFromUpdatedStore(){
		console.log("loading data after DB load");
		this.setState({bugs: TerrariumStore.getBugCollection()});
		console.log(this.state.bugs);
	}
	
	createArrayOfBugListItems(){
		let bugsList = [];
		this.state.bugs.forEach(function(bug, loopCount){
			let reference = "bugItemNum" + loopCount;
			bugsList.push(<BugListItem bugDocument={bug} ref={reference} />);
		});
		return bugsList;
	}
	
   render(){
	  var listOfBugs = this.createArrayOfBugListItems();
			return(
			<div>
			<NavBar />
			<FilterSearch />
			<ColumnSortHeader />
			{listOfBugs}
			</div>
			);
		

    }
	
}
