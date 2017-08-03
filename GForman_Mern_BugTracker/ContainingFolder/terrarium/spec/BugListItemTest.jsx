import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import BugListItem from '../src/BugListItem';

describe('Bug List Item', function(){
	
	var bugObject = {"id": "1","issueId": "BUG-00001","dateCreated":"03/07/2017 11:15","summary": "Search function doesn't like special characters","description": "When searching for something that contains a special character the search fails","highPriority": "TRUE","severity": "MEDIUM","reporter": "QAC","assignedUser": "Un-assigned","actions": [{"user": "Ashley","dateCreated": "03/07/2017 11:06","action": "Created a git branch called searchBug"},{"user": "Ashley","dateCreated": "03/07/2017 11:07","action": "Updated git branch as work had been started"}],"status": "TO DO"};
	var renderedBugListItem = TestUtils.renderIntoDocument(
			<BugListItem bugDocument={bugObject} />
		);
		

		
	it('\nRenders bug ID in correct element', function(){

		let reference = renderedBugListItem.refs.bugID;
		
		expect(ReactDOM.findDOMNode(reference).textContent).toEqual("ID: BUG-00001");
		
	});	
	
		it('\nRenders bug date in correct element', function(){

		let reference = renderedBugListItem.refs.bugDate;
		
		expect(ReactDOM.findDOMNode(reference).textContent).toEqual("Date: 03/07/2017 11:15");
		
	});	
	
		it('\nRenders bug Priority in correct element', function(){

		let reference = renderedBugListItem.refs.bugPriority;
		
		expect(ReactDOM.findDOMNode(reference).textContent).toEqual("Priority: High");
		
	});	
	
		it('\nRenders bug Severity in correct element', function(){

		let reference = renderedBugListItem.refs.bugSeverity;
		
		expect(ReactDOM.findDOMNode(reference).textContent).toEqual("Severity: Medium");
		
	});	
	
		it('\nRenders bug Reporter in correct element', function(){

		let reference = renderedBugListItem.refs.bugReporter;
		
		expect(ReactDOM.findDOMNode(reference).textContent).toEqual("Reporter: QAC");
		
	});	
	
		it('\nRenders bug Assignee in correct element', function(){

		let reference = renderedBugListItem.refs.bugAssigned;
		
		expect(ReactDOM.findDOMNode(reference).textContent).toEqual("Assigned: Un-assigned");
		
	});	
	
		it('\nRenders bug Summary in correct element', function(){

		let reference = renderedBugListItem.refs.bugSummary;
		
		expect(ReactDOM.findDOMNode(reference).textContent).toEqual("Search function doesn't like special characters");
		
	});	
	

	
});