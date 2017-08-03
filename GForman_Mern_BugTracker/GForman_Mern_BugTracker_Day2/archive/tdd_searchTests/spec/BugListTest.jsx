import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import BugList from '../src/BugList';



describe('Bug List Items', function(){
	
	
	var renderedBugList = TestUtils.renderIntoDocument(
			<BugList />	
		);
	
		

		
			it('\nRenders first bug document to 1st bug list item', function(){

				let componentReference = renderedBugList.refs.bugItemNum0;
				let elementReference = componentReference.refs.bugID;
				
				//First item in list should be first item in test data
				expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: BUG-00001");
				
			});

			it('\nRenders first bug document to 2nd bug list item', function(){

				let componentReference = renderedBugList.refs.bugItemNum1;
				let elementReference = componentReference.refs.bugID;
				
				//Second item in list should be second item in test data
				expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: ISSUE-00001");
				
			});	

			it('\nRenders first bug document to 3rd bug list item', function(){

				let componentReference = renderedBugList.refs.bugItemNum2;
				let elementReference = componentReference.refs.bugID;
				
				//Third item in list should be third item in test data
				expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: ISSUE-00002");
				
			});	

			it('\nRenders first bug document to 4th bug list item', function(){

				let componentReference = renderedBugList.refs.bugItemNum3;
				let elementReference = componentReference.refs.bugID;
				
				//Fourth item in list should be fourth item in test data
				expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: BUG-00002");
				
			});	

			it('\nRenders first bug document to 5th bug list item', function(){

				let componentReference = renderedBugList.refs.bugItemNum4;
				let elementReference = componentReference.refs.bugID;
				
				//Fifth item in list should be fifth item in test data
				expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: BUG-00003");
				
			});	

			it('\nRenders first bug document to 6th bug list item', function(){

				let componentReference = renderedBugList.refs.bugItemNum5;
				let elementReference = componentReference.refs.bugID;

				//Sixth item in list should be sixth item in test data
				expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: BUG-00003");

			});		
			
			it('\nDoes not render a 7th item as only 6 documents in collection', function(){

				//There should not be a 7th item in list as only 6 items of data
				expect(ReactDOM.findDOMNode(renderedBugList.refs.bugItemNum6)).toEqual(null);
				
			});	
	
	
});


describe('Testing search functions', function(){
	
	
	var renderedBugList;
	var inputsArray;	
	
			//create fresh instance of buglist, as filter options should stack, so searches are run from default/blank state
			beforeEach(function() {
				
				renderedBugList = TestUtils.renderIntoDocument(
					<BugList />
				);
				inputsArray = TestUtils.scryRenderedDOMComponentsWithTag(renderedBugList, 'input');
			});
		
			//clear instances of buglist and inputs to ensure integrity of following tests
			afterEach(function() {
				renderedBugList = null;
				inputsArray = null;
			});	

			it('\nSimulate input of test into bug search: "POOL"', function(){

				//find input box via it's ID and place reference to it in inputElement
				let inputElement = null;
				let inputToFind = "bugSearchInput";
				inputsArray.forEach((input) => {if(input.id == inputToFind){inputElement = input;} });

				//Send search term to text input
				inputElement.value = "POOL";
				TestUtils.Simulate.change(inputElement);
				
				let componentReference = renderedBugList.refs.bugItemNum0;
				let elementReference = componentReference.refs.bugID;

				//check first result in list shows correct search result
				expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: ISSUE-00002");
	
			});
		
			it('\nSimulate input of test into bug search: "Duplicated"', function(){

				//find input box via it's ID and place reference to it in inputElement
				let inputElement = null;
				let inputToFind = "bugSearchInput";
				inputsArray.forEach((input) => {if(input.id == inputToFind){inputElement = input;} });

				//Send search term to text input
				inputElement.value = "Duplicated";
				TestUtils.Simulate.change(inputElement);
				
				let componentReference = renderedBugList.refs.bugItemNum0;
				let elementReference1 = componentReference.refs.bugID;
				
				componentReference = renderedBugList.refs.bugItemNum1;
				let elementReference2 = componentReference.refs.bugID;
				
				//check first & second results in list shows correct search results
				expect(ReactDOM.findDOMNode(elementReference1).textContent).toEqual("ID: BUG-00003");
				expect(ReactDOM.findDOMNode(elementReference2).textContent).toEqual("ID: BUG-00003");
			});
			
			it('\nSimulate input of test into user search: "Ashley"', function(){

				//find input box via it's ID and place reference to it in inputElement
				let inputElement = null;
				let inputToFind = "userSearchInput";
				inputsArray.forEach((input) => {if(input.id == inputToFind){inputElement = input;} });

				//Send search term to text input
				inputElement.value = "Ashley";
				TestUtils.Simulate.change(inputElement);
				
				let componentReference = renderedBugList.refs.bugItemNum0;
				let elementReference = componentReference.refs.bugID;

				//Check first result matches the expected data
				expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: BUG-00002");
	
			});
			
			it('\nSimulate input of test into user search: "QAC"', function(){

				//find input box via it's ID and place reference to it in inputElement
				let inputElement = null;
				let inputToFind = "userSearchInput";
				inputsArray.forEach((input) => {if(input.id == inputToFind){inputElement = input;} });

				//Send search term to text input
				inputElement.value = "QAC";
				TestUtils.Simulate.change(inputElement);
				
				let componentReference = renderedBugList.refs.bugItemNum1;
				let elementReference = componentReference.refs.bugID;

				//Check second result matches expected data.
				//Also, as this would be the same data for a blank search, check there is no 3rd result as there should not be one from the search
				expect(ReactDOM.findDOMNode(elementReference).textContent).toEqual("ID: ISSUE-00001");
				expect(ReactDOM.findDOMNode(renderedBugList.refs.bugItemNum2)).toEqual(null);
	
			});

			
	
	
});