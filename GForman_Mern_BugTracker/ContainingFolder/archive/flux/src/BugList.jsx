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
		bugs: TerrariumStore.getBugCollection()
		};
		this.repopulateFromUpdatedStore = this.repopulateFromUpdatedStore.bind(this);
	}	

  	componentWillMount(){
		TerrariumStore.on('Data_Load_From_DB',this.repopulateFromUpdatedStore);	
	}
	
	componentWillUnmount() {
		TerrariumStore.removeListener('Data_Load_From_DB',this.repopulateFromUpdatedStore);
    }

	repopulateFromUpdatedStore(){
		console.log("loading data after DB load");
		this.setState({bugs: TerrariumStore.getBugCollection()});
		console.log(this.state.bugs);
	}
	
   render(){
	  var bugObject = {"id": "1","issueId": "BUG-00001","dateCreated":"03/07/2017 11:15","summary": "Search function doesn't like special characters","description": "When searching for something that contains a special character the search fails","highPriority": "TRUE","severity": "MEDIUM","reporter": "QAC","assignedUser": "Un-assigned","actions": [{"user": "Ashley","dateCreated": "03/07/2017 11:06","action": "Created a git branch called searchBug"},{"user": "Ashley","dateCreated": "03/07/2017 11:07","action": "Updated git branch as work had been started"}],"status": "TO DO"};
			return(
			<div>
			<NavBar />
			<FilterSearch />
			<ColumnSortHeader />
			<BugListItem bugDocument={bugObject}/>
			</div>
			);
		

    }
	
}
