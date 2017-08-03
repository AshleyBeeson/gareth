var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bugSchema = new Schema({
	id:{
		type: String,
	},
	issueId: {
		type: String,
	},
	dateCreated:{
		type: String,
	},
	summary:{
		type: String,
	},
	description:{
		type: String,
	},
	highPriority:{
		type: String,
	},
	severity:{
		type: String,
	},
	reporter:{
		type: String,
	},
	assignedUser:{
		type: String,
	},
	actions:[{user: String, dateCreated: String, action: String}],
	status:{
		type: String,
	},
	
});

const bugModel = mongoose.model("bug", bugSchema);
module.exports = bugModel;