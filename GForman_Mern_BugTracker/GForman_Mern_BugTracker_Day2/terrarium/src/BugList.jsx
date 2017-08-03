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
		bugSearchValues:{
							bugTextInput: '', 
							userTextInput: '', 
							priority: '', 
							severityHigh: true, 
							severityMedium: true, 
							severityLow: true, 
							startDate: '', 
							endDate: ''
						},
		currentSort:{
						sortType: 'issueId',
						sortOrder: 'ASCENDING'
					}						
		};
		this.repopulateFromUpdatedStore = this.repopulateFromUpdatedStore.bind(this);
		this.createArrayOfBugListItems = this.createArrayOfBugListItems.bind(this);
		this.handleBugSearchInput = this.handleBugSearchInput.bind(this);
		this.handleSortSelection = this.handleSortSelection.bind(this);
		this.bugsChanged = this.bugsChanged.bind(this);
		this.bugsSorted = this.bugsSorted.bind(this);
	}	

  	componentWillMount(){
		TerrariumStore.on('Data_Load_From_DB',this.repopulateFromUpdatedStore);
		TerrariumStore.on('bugs_changed',this.bugsChanged);
		TerrariumStore.on('bugs_sorted',this.bugsSorted);

	}
	
	componentWillUnmount() {
		TerrariumStore.removeListener('Data_Load_From_DB',this.repopulateFromUpdatedStore);
		TerrariumStore.removeListener('bugs_changed',this.bugsChanged);
		TerrariumStore.on('bugs_sorted',this.bugsSorted);
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
	
	handleBugSearchInput (bugSearchValues){
		this.setState({bugSearchValues: bugSearchValues});
		TerrariumActions.searchBugs(bugSearchValues, this.state.currentSort);
	}
	
	handleSortSelection (sortType){
		

		let sortObject = {sortType: 'default',	sortOrder: 'default'};
		let sortOrder = this.state.currentSort.sortOrder;

		
		if(this.state.currentSort.sortType == sortType){
			if (sortOrder == "ASCENDING")
				{
					sortOrder = "DESCENDING";
				}else
				{
					sortOrder = "ASCENDING";
				}
		}else{
			sortOrder = "ASCENDING";
		}
			sortObject = {sortType: sortType,	sortOrder: sortOrder};

		
		this.setState({currentSort: sortObject});
		TerrariumActions.sortBugs(sortObject);
	}
	
	bugsChanged() {	
		this.setState({bugs: TerrariumStore.getFilteredBugs()});
	}
	
	bugsSorted() {	
		this.setState({bugs: TerrariumStore.getSortedBugs()});
	}
	
   render(){
	  let listOfBugs = this.createArrayOfBugListItems();
			return(
			<div>
			<FilterSearch ref="FilterSearchComponent" searchValues={this.state.bugSearchValues} onBugSearchInput={this.handleBugSearchInput}/>
			
			<ColumnSortHeader ref="ColumnSortHeaderComponent" currentSort={this.state.currentSort} onSortSelection={this.handleSortSelection}/>
			{listOfBugs}
			</div>
			);
		

    }
	
}
