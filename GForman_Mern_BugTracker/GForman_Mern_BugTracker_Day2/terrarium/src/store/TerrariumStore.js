import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

import mongoose from '../../node_modules/mongoose';

class TerrariumStore extends EventEmitter {

	constructor() {
		super();
	/* for DB */
		this.bugCollection = [];
		this.filteredBugs = [];
		this.sortedBugs = [];
	
	/* hard-coded data for test 
		this.bugCollection = [{"id": "1","issueId": "BUG-00001","dateCreated":"03/07/2017 11:15","summary": "Search function doesn't like special characters","description": "When searching for something that contains a special character the search fails","highPriority": "TRUE","severity": "MEDIUM","reporter": "QAC","assignedUser": "Un-assigned","actions": [{"user": "Ashley","dateCreated": "03/07/2017 11:06","action": "Created a git branch called searchBug"},{"user": "Ashley","dateCreated": "03/07/2017 11:07","action": "Updated git branch as work had been started"}],"status": "TO DO"},		{"id": "2","issueId": "ISSUE-00001","dateCreated":"04/05/2017 09:23","summary": "The food in the fridge isn't cold","description": "The food that is being put in the fridge isn't being chilled. Maybe the fridge is broken","highPriority": "TRUE","severity": "MEDIUM","reporter": "QAC","assignedUser": "Un-assigned","actions": [{"user": "Gareth","dateCreated": "03/07/2017 10:00","action": "Told Someone about it"}],"status": "IN PROGRESS"},		{"id": "3","issueId": "ISSUE-00002","dateCreated":"01/06/2017 10:54","summary": "The pool table is slanted","description": "The pool table is slanted and is putting me off from winning all my games","highPriority": "FALSE","severity": "LOW","reporter": "Elliott","assignedUser": "Jake","actions": [{"user": "Dev","dateCreated": "04/07/2017 12:00","action": "Elliott stop complaining"}],"status": "IN REVIEW"},		{"id": "4","issueId": "BUG-00002","dateCreated":"06/06/2017 11:20","summary": "The filter doesn't filter properly","description": "The filter ability is only filtering on issueId and not on anything else","highPriority": "FALSE","severity": "LOW","reporter": "Ashley","assignedUser": "Ashley","actions": [],"status": "IN TEST"},		{"id": "5","issueId": "BUG-00003","dateCreated":"03/07/2017 11:38","summary": "Issues can be duplicated","description": "Some of the issues created are being duplicated","highPriority": "TRUE","severity": "MEDIUM","reporter": "Gareth","assignedUser": "Un-assigned","actions": [],"status": "TO DO"},		{"id": "6","issueId": "BUG-00003","dateCreated":"03/07/2017 11:38","summary": "Issues can be duplicated","description": "Some of the issues created are being duplicated","highPriority": "FAlSE","severity": "MEDIUM","reporter": "Gareth","assignedUser": "Un-assigned","actions": [],"status": "TO DO"}];
		this.filteredBugs = this.bugCollection.slice();
		this.sortedBugs = this.bugCollection.slice();
	*/
	}

	populateStoreFromDB(){
		let thisStoreInstanceRef = this;
		console.log("DB ACCESS");
	
		this.bugCollection = [];

		fetch("/api/bugs").then(function(data){
			return data.json()
			}).then( json => {
				json.forEach((bug) =>{
				this.bugCollection.push(bug);				
				});
			this.filteredBugs = this.bugCollection.slice()
			this.sortedBugs = this.bugCollection.slice()
			setTimeout(function(){thisStoreInstanceRef.emit('Data_Load_From_DB');},200);
		});		
	}
	
	getBugCollection(){		
		return this.bugCollection;
	}
	
	getFilteredBugs(){
		return this.filteredBugs;
	}
	
	getSortedBugs(){
		return this.sortedBugs;
	}
	
	getBugById(bugId){
		let selectedBug = [];
		this.bugCollection.forEach(function(bug){
			if(bug.id == bugId){
			selectedBug = bug;	
			}
		});
		return selectedBug;
		
		
	}
	
	searchBugs(bugsValues, sortValues) {
		let tempFilteredBugs = [];
		
		//Initial filter run for bug text search against full bug list, finding matches across issueID, Description & Summary
		let bugsText = bugsValues.bugTextInput;		
		this.filteredBugs = [];
		this.bugCollection.forEach((bug) => {
			if(bug.summary.toUpperCase().indexOf(bugsText.toUpperCase()) !== -1 || bug.issueId.toUpperCase().indexOf(bugsText.toUpperCase()) !== -1 || bug.description.toUpperCase().indexOf(bugsText.toUpperCase()) !== -1 ) {tempFilteredBugs.push(bug);}});
		
		//pass results to filterBugs array of Store
		this.filteredBugs = tempFilteredBugs.slice();
		
		//Run filter of user text input against the filtered results from bug text search, finding matches in reporter and assignedUser
		let userText = bugsValues.userTextInput;
		tempFilteredBugs = [];
		this.filteredBugs.forEach((bug) => {
			if(bug.reporter.toUpperCase().indexOf(userText.toUpperCase()) !== -1 || bug.assignedUser.toUpperCase().indexOf(userText.toUpperCase()) !== -1) {tempFilteredBugs.push(bug);}});
		
		this.filteredBugs = tempFilteredBugs.slice();
		
		//Run filter of severity checkboxes against previous filter results
		let severityHigh = bugsValues.severityHigh;
		let severityMedium = bugsValues.severityMedium;
		let severityLow = bugsValues.severityLow;
		
		
		tempFilteredBugs = [];
		this.filteredBugs.forEach((bug) => {
			
			if((severityHigh == true && bug.severity == "HIGH") 
				|| (severityMedium == true && bug.severity == "MEDIUM") 
				|| (severityLow == true && bug.severity == "LOW")) 
				{
					tempFilteredBugs.push(bug);
				}
			
			});
		this.filteredBugs = tempFilteredBugs.slice();
		
		this.sortBugs(sortValues);	
	}
	
	sortBugs(sortValues){
		
		this.sortedBugs = this.filteredBugs.slice();
		
		switch(sortValues.sortType) {
		//Three searches based on comparing strings
		//All convert text to uppercase and then does a comparison, to ensure that capitalisations don't throw off results
			case "issueId":
				this.sortedBugs.sort(function(a,b){
					let bugIssueIdA = a.issueId.toUpperCase();
					let bugIssueIdB = b.issueId.toUpperCase();
					
					if(sortValues.sortOrder == "ASCENDING"){
						
						if (bugIssueIdA < bugIssueIdB) {
							return -1;
						}
						if (bugIssueIdA > bugIssueIdB) {
							return 1;
						}
						return 0;

					}else{
						
						if (bugIssueIdA > bugIssueIdB) {
							return -1;
						}
						if (bugIssueIdA < bugIssueIdB) {
							return 1;
						}
						return 0;
					}
				})
			break;
			
			case "reporter":
				this.sortedBugs.sort(function(a,b){
					let bugReporterA = a.reporter.toUpperCase();
					let bugReporterB = b.reporter.toUpperCase();
					
					if(sortValues.sortOrder == "ASCENDING"){
						
						if (bugReporterA < bugReporterB) {
							return -1;
						}
						if (bugReporterA > bugReporterB) {
							return 1;
						}
						return 0;

					}else{
						
						if (bugReporterA > bugReporterB) {
							return -1;
						}
						if (bugReporterA < bugReporterB) {
							return 1;
						}
						return 0;
					}
				})
			break;
			
			case "assignedUser":
				this.sortedBugs.sort(function(a,b){
					let bugAssignedUserA = a.assignedUser.toUpperCase();
					let bugAssignedUserB = b.assignedUser.toUpperCase();
					
					if(sortValues.sortOrder == "ASCENDING"){
						
						if (bugAssignedUserA < bugAssignedUserB) {
							return -1;
						}
						if (bugAssignedUserA > bugAssignedUserB) {
							return 1;
						}
						return 0;

					}else{
						
						if (bugAssignedUserA > bugAssignedUserB) {
							return -1;
						}
						if (bugAssignedUserA < bugAssignedUserB) {
							return 1;
						}
						return 0;
					}
				})
			break;
			
			//sorting a boolean value, as values are currently coming through as strings, manually assigning value 1 to true/high priority, and 0 to not false/not high
			//use values to perform comparison within the array sort menthod
			case "highPriority":
				this.sortedBugs.sort(function(a,b){
					let bugHighPriorityA = 0;
					let bugHighPriorityB = 0;
					
					if(a.highPriority == "TRUE"){
						bugHighPriorityA = 1;
					}
					if(b.highPriority == "TRUE"){
						bugHighPriorityB = 1;
					}
					
					
					
					if(sortValues.sortOrder == "ASCENDING"){
						
						if (bugHighPriorityA < bugHighPriorityB) {
							return -1;
						}
						if (bugHighPriorityA > bugHighPriorityB) {
							return 1;
						}
						return 0;

					}else{
						
						if (bugHighPriorityA > bugHighPriorityB) {
							return -1;
						}
						if (bugHighPriorityA < bugHighPriorityB) {
							return 1;
						}
						return 0;
					}
				})
			break;
			
			//similar to the priority true/false search, assigned values of 0 for low severity, 1 for medium severity, and 2 for high severity
			case "severity":
				this.sortedBugs.sort(function(a,b){
					let bugSeverityA = 0;
					let bugSeverityB = 0;
					
					if(a.severity == "HIGH"){
						bugSeverityA = 2;
					} else if(a.severity == "MEDIUM"){
						bugSeverityA = 1;
					}
					
					if(b.severity == "HIGH"){
						bugSeverityB = 2;
					} else if(b.severity == "MEDIUM"){
						bugSeverityB = 1;
					}
		
					
					
					
					if(sortValues.sortOrder == "ASCENDING"){
						
						if (bugSeverityA < bugSeverityB) {
							return -1;
						}
						if (bugSeverityA > bugSeverityB) {
							return 1;
						}
						return 0;

					}else{
						
						if (bugSeverityA > bugSeverityB) {
							return -1;
						}
						if (bugSeverityA < bugSeverityB) {
							return 1;
						}
						return 0;
					}
				})
			break;
			
			//sorting by date, converting date string to millisecond since 1970 value and doing a comparison on the two
			case "dateCreated":
				this.sortedBugs.sort(function(a,b){
					let bugDateAsMilliSecsA = Date.parse(a.dateCreated);
					let bugDateAsMilliSecsB = Date.parse(b.dateCreated);
					
					if(sortValues.sortOrder == "ASCENDING"){
						return bugDateAsMilliSecsA - bugDateAsMilliSecsB;
					}else{
						return bugDateAsMilliSecsB - bugDateAsMilliSecsA;
					}
				})
			break;
			
			
			default:
			break;
		}
		
		this.emit('bugs_sorted');		
	}

	handleActions(action) {
		switch(action.type) {
			case "BUGS_SEARCH":
				this.searchBugs(action.bugsValues, action.sortValues);
			break;
			case "BUGS_SORT":
				this.sortBugs(action.sortValues);
			break;
			case "DB_PULL":
				this.populateStoreFromDB();
			break;

			default:
			break;
		}
	}	
}

const terrariumStore = new TerrariumStore();
dispatcher.register(terrariumStore.handleActions.bind(terrariumStore));
export default terrariumStore;