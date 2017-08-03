import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

import mongoose from '../../node_modules/mongoose';

class TerrariumStore extends EventEmitter {

	constructor() {
		super();

		this.bugCollection = [];
		}

	populateStoreFromDB(){
		let thisStoreInstanceRef = this;
	
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

	handleActions(action) {
		switch(action.type) {
			case "EVENT_NAME":
				//function here
			break;

			default:
			break;
		}
	}	
}

const terrariumStore = new TerrariumStore();
dispatcher.register(terrariumStore.handleActions.bind(terrariumStore));
export default terrariumStore;