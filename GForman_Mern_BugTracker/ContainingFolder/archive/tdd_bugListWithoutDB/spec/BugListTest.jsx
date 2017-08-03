import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import BugList from '../src/BugList';

describe('Bug List Item', function(){
	
	var allBugs = [{"id": "1","issueId": "BUG-00001","dateCreated":"03/07/2017 11:15","summary": "Search function doesn't like special characters","description": "When searching for something that contains a special character the search fails","highPriority": "TRUE","severity": "MEDIUM","reporter": "QAC","assignedUser": "Un-assigned","actions": [{"user": "Ashley","dateCreated": "03/07/2017 11:06","action": "Created a git branch called searchBug"},{"user": "Ashley","dateCreated": "03/07/2017 11:07","action": "Updated git branch as work had been started"}],"status": "TO DO"},		{"id": "2","issueId": "ISSUE-00001","dateCreated":"04/05/2017 09:23","summary": "The food in the fridge isn't cold","description": "The food that is being put in the fridge isn't being chilled. Maybe the fridge is broken","highPriority": "TRUE","severity": "MEDIUM","reporter": "QAC","assignedUser": "Un-assigned","actions": [{"user": "Gareth","dateCreated": "03/07/2017 10:00","action": "Told Someone about it"}],"status": "IN PROGRESS"},		{"id": "3","issueId": "ISSUE-00002","dateCreated":"01/06/2017 10:54","summary": "The pool table is slanted","description": "The pool table is slanted and is putting me off from winning all my games","highPriority": "FALSE","severity": "LOW","reporter": "Elliott","assignedUser": "Jake","actions": [{"user": "Dev","dateCreated": "04/07/2017 12:00","action": "Elliott stop complaining"}],"status": "IN REVIEW"},		{"id": "4","issueId": "BUG-00002","dateCreated":"06/06/2017 11:20","summary": "The filter doesn't filter properly","description": "The filter ability is only filtering on issueId and not on anything else","highPriority": "FALSE","severity": "LOW","reporter": "Ashley","assignedUser": "Ashley","actions": [],"status": "IN TEST"},		{"id": "5","issueId": "BUG-00003","dateCreated":"03/07/2017 11:38","summary": "Issues can be duplicated","description": "Some of the issues created are being duplicated","highPriority": "TRUE","severity": "MEDIUM","reporter": "Gareth","assignedUser": "Un-assigned","actions": [],"status": "TO DO"},		{"id": "6","issueId": "BUG-00003","dateCreated":"03/07/2017 11:38","summary": "Issues can be duplicated","description": "Some of the issues created are being duplicated","highPriority": "FAlSE","severity": "MEDIUM","reporter": "Gareth","assignedUser": "Un-assigned","actions": [],"status": "TO DO"}];
	var renderedBugList = TestUtils.renderIntoDocument(
			<BugList bugs={allBugs} />
		);
		
		
	it('\nRenders first bug document to 1st bug list item', function(){

		let componentReference = renderedBugList.refs.bugItemNum0;
		let elementReference = componentReference.refs.bugID;
		
		expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: BUG-00001");
		
	});

	it('\nRenders first bug document to 2nd bug list item', function(){

		let componentReference = renderedBugList.refs.bugItemNum1;
		let elementReference = componentReference.refs.bugID;
		
		expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: ISSUE-00001");
		
	});	

	it('\nRenders first bug document to 3rd bug list item', function(){

		let componentReference = renderedBugList.refs.bugItemNum2;
		let elementReference = componentReference.refs.bugID;
		
		expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: ISSUE-00002");
		
	});	

	it('\nRenders first bug document to 4th bug list item', function(){

		let componentReference = renderedBugList.refs.bugItemNum3;
		let elementReference = componentReference.refs.bugID;
		
		expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: BUG-00002");
		
	});	

	it('\nRenders first bug document to 5th bug list item', function(){

		let componentReference = renderedBugList.refs.bugItemNum4;
		let elementReference = componentReference.refs.bugID;
		
		expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: BUG-00003");
		
	});	

	it('\nRenders first bug document to 6th bug list item', function(){

		let componentReference = renderedBugList.refs.bugItemNum5;
		let elementReference = componentReference.refs.bugID;
		
		expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: BUG-00003");
		
	});		
	
		it('\nDoes not render a 7th item as only 6 documents in collection', function(){

		
		expect(ReactDOM.findDOMNode(renderedBugList.refs.bugItemNum6)).toEqual(null);
		
	});	
	
		
	
});