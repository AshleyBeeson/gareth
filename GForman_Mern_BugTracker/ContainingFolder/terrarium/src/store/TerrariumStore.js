import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

import mongoose from '../../node_modules/mongoose';

class TerrariumStore extends EventEmitter {

	constructor() {
		super();

		this.bugCollection = [];
		this.filteredBugs = [];
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
			setTimeout(function(){thisStoreInstanceRef.emit('Data_Load_From_DB');},200);
		});		
	}
	
	getBugCollection(){		
		return this.bugCollection;
	}
	
	getFilteredBugs(){
		return this.filteredBugs;
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
	
	searchBugsByBug(bugsText) {
		this.filteredBugs = [];
		this.bugCollection.forEach((bug) => {
			if(bug.summary.toUpperCase().indexOf(bugsText.toUpperCase()) !== -1 || bug.issueId.toUpperCase().indexOf(bugsText.toUpperCase()) !== -1 || bug.description.toUpperCase().indexOf(bugsText.toUpperCase()) !== -1 ) {this.filteredBugs.push(bug);}});
		this.emit('bugs_changed');
		
	}

	handleActions(action) {
		switch(action.type) {
			case "BUGS_SEARCH":
				this.searchBugsByBug(action.bugsText);
			break;

			default:
			break;
		}
	}	
}

const terrariumStore = new TerrariumStore();
dispatcher.register(terrariumStore.handleActions.bind(terrariumStore));
export default terrariumStore;