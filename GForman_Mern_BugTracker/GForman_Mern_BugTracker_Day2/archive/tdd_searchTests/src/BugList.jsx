import React from 'react';
import FilterSearch from './FilterSearch';
import ColumnSortHeader from './ColumnSortHeader';
import BugListItem from './BugListItem';
import TerrariumStore from './store/TerrariumStore'
import * as TerrariumActions from './actions/TerrariumActions';



export default class BugList extends React.Component{
	constructor(props){
		super(props);
		this.state={
		bugs: TerrariumStore.getBugCollection(),
		bugSearchText:'',
		userSearchText:''
		};
		this.repopulateFromUpdatedStore = this.repopulateFromUpdatedStore.bind(this);
		this.createArrayOfBugListItems = this.createArrayOfBugListItems.bind(this);
		this.handleBugSearchInput = this.handleBugSearchInput.bind(this);
		this.bugsChanged = this.bugsChanged.bind(this);
	}	

  	componentWillMount(){
		TerrariumStore.on('Data_Load_From_DB',this.repopulateFromUpdatedStore);
		TerrariumStore.on('bugs_changed',this.bugsChanged);

	}
	
	componentWillUnmount() {
		TerrariumStore.removeListener('Data_Load_From_DB',this.repopulateFromUpdatedStore);
		TerrariumStore.removeListener('bugs_changed',this.bugsChanged);
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
	
	handleBugSearchInput (bugSearchText){
		this.setState({bugSearchText});
		TerrariumActions.searchBugs(bugSearchText);
	}
	
	bugsChanged() {	
		this.setState({bugs: TerrariumStore.getFilteredBugs()});
	}
	
   render(){
	  let listOfBugs = this.createArrayOfBugListItems();
			return(
			<div>
			<FilterSearch ref="FilterSearchComponent" bugSearchText={this.state.bugSearchText} onBugSearchInput={this.handleBugSearchInput}/>
			<ColumnSortHeader />
			{listOfBugs}
			</div>
			);
		

    }
	
}
