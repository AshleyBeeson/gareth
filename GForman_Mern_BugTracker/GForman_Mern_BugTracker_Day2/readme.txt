Gareth Forman's project

Renamed ProjectOverview.txt to ProjectDiary.txt
ProjectDiary.txt contains a more detailed coverage of actions carried out throughout the days when working on the project.

----------------------------------------------------------------------


Built with:
Node - v6.11.1 for Windows x64 (available for download from https://nodejs.org/en/download/ )
MongoDB - 3.2


----------------------------------------------------------------------



MongoDB setup:
Information is being pulled from a MongoDB
Available for download from: https://www.mongodb.com/mongodb-3.2
Once installed on windows, if done to default directory, will need to go to command line and navigate to: c:\Program Files\MongoDB\Server\3.2\bin\
Upon navigating to directory run mongod.exe to launch server.
Default port should be 27017, if your port is different, you will need to edit the port number within "app.js"
Currently line defining port is line 12 -"var mongoDB = 'mongodb://127.0.0.1:27017/terrarium';
The port of 27017 can be changed here.

The name of the DB holding the information is "terrarium"
The collection within which the information is stored is called "bugs"
At present project does not automatically populate DB, so database will need to be created and populated manually.
The test data to so is available in bugs.json

Currently do not have functionality implemented to autocreate DB and load information into Collection on express server being launched/initialised, hopefully included in future.



----------------------------------------------------------------------



To run:
After Node is installed you can run node from a command line.
 - These node commands to be run from within the "terrarium" directory
Node Modules listed within package.json, available to install via "npm install" within Node.
 - NOTE: For my build Karma and Webpack were installed globally
After Node Modules installed may need to run "webpack" within a node command to build project, however a working build of the project should be present at "public\js\index.bundle.js"
After building project through webpack (if required), run "npm start" within Node. This should launch the express server.
Application should now be viewable at http://localhost:12071/


----------------------------------------------------------------------


Current Functionality:
Information is loaded from DB into a Flux store. Whenever new information is added to the database, an action is triggered that causes the flux store to repopulate with the newly updated data.
This store then populates other information.
Open opening website a page is loaded with a list of bugs.
A search function is visible at the top, currently operating search features are "Find Bug", "Find User's Reports", "Severity"
These search features work in conjunction, so you can use a combination of them to narrow the search.
High Priority & Date have not yet been implemented for search.

The column ordering functionality works. You can select any of the available options to switch between Ascending and Descending sorts for the displayed bugs. This order will work for both full and searched/filtered lists.

You can click the View Details button on each bug to be taken to a Bug Details page, this will also display the full bug description and all the actions related to that bug.
On the Bug Details page, there is an input box to allow you to add a new actions to this Bug Report.
Upon submitting a new Action, the add action box will disappear, a summary will display of the action just added, and the option to select to add a new action will appear. 
Clicking to add a new action will remove the summary and load the add action box again.
This list of actions displayed on this page updates dynamically as they are added, and as such should show at the bottom of the list.

There is an Edit Bug button available from the Bug Details page.
Taking this will take you to a bug Edit Page, which will display details of the bug to be edited. Here you can change details, click edit and submit the edit.
Upon clicking to edit, the edit button will disable, and a box will display showing that the submission has been made.
You can then click a new button that has appeared to edit again, to unlock the submission button and remove the box informing that the edit has been made.

There is an Add Bug page, available via a link from the nav bar.
This will take you to an empty form which you can fill in to enter bug details in to the database.
Upon clicking the add bug button, the button will disable, and a box will load stating that the bug has been added.
There will then be a button to add another.
If you click to add another, but submission button will re-enable and the contents of the form will be cleared.


----------------------------------------------------------------------


Testing:
Testing was done using Jasmine Karma.
Test files can be viewed in the spec directory.
To package currently implemented test (just the test for the BugListItem currently running, due to BugList not working due to issues between Karma and database access, see ProjectDiary.txt for further details)
After running webpack as above, the BugListItem test will be output as a js bundle to be tested by Karma.
To run tests in Karma (assuming Karma installed globally) go to the terrarium directory in command line/node and run "karma start terraKarma.config.js"

My test were only used up until a point, for reasons set out in more detail in my reason for using the testing tools below.
The folders starting with tdd in the archive directory are snapshots showing how testing was working at various points. There should be some screenshots available in them.
The last build involving tests is in tdd_LastTestsRunningBeforeBackToDB, and will also include a screenshot of the built tests passing.


----------------------------------------------------------------------


Additional information:
Wireframes are simple screenshots, available in wireframe folder, along with the static page of my BugTest list built from wireframe.
There are other folders in archive. These demonstrate project at a number stages, to show use of TDD. The points of these copies being made can be found in ProjectDiary.txt file.
-Also, the js bundle files output from webpack have been deleted from the archive builds, so as to reduce file size of project, so if you wish to view an archived version running, you will need to rebuild the projec using webpack.



----------------------------------------------------------------------



Reasons for choices of tools & technology:

I chose to implement a Flux Store as it allows for strong control of data within the project, and additionally allows for a single point of contact from which to pull informaiton from the database.
When the database is updated a a request to reload the Flux Store from the DB can be made, thus ensuring the store is up to date.
This ultimately ensures that information being displayed within all views of the project will be consistent.

Testing tools are Jasmine & Karma.
Jasmine is a good tool when testing react, as it can use react's provided Test Utilities. These allow for inspection of the components once loaded in to a DOM.
Due to the component based nature of react, it lends itself well to component testing, as provided you are sure of the inputs/props being passed in, you can be certain of the outputs.
This allows for effective use of Test Driven Developement, as well as automated testing.
Karma was chosen to run the Jasmine tests, as the tests do require components to be loaded in to a DOM to work. Jasmine doesn't natively provided this.
However with Karma being introduced, the components can be loaded in to the DOM of the browser that Karma is set up to run with.
To allow Karma to read tests, they were required to be run through Webpack, so that they are transpiled and bundled to browser readable .js files.
Karma is able to automatically run upon seeing changes to the transpiled & bundled .js files. 
When used in combination with Webpack to automatically build the bundle files when changes are made to the source files, this allows for testing to run automated, in real time, whilst development is taking place. 
This allows for great levels of feedback and can greatly aid developement.

I did encount some issues with testing. Initially there was an issue getting Jasmine to test in an asynchronous manner, however I was able to research this.
After this there was another issue. I was connecting to my Mongo database through mongoose & express, however Karma had issue with the methods of how the results were returned through the api running in express.
The requests are sent to the api as HTML requests. The issue meant that it saw all returns from the database as 404 due to the nature of how mongoose handles the very slight delay present when reading from Mongo.
Unfortunately this meant that my testing was only effective up until a point, as after this all functionality was database dependant. Further details of when this occured and what was covered is available in ProjectDiary.txt.

Webpack is used to build the project. It uses babel to transpile the projects into a form readable by browsers, as well as packing any dependancies for the project into a single bundle file.

Express is being used as a lightweight server, and is allowing for the hosting of the project as well running an API which is used in conjunction with Mongoose to connect to a MongoDB
Mongoose was used as a simplified way to allow access between the react app and the monogDB.


----------------------------------------------------------------------


Things that I wish I would have had time to include:

All of the search functions listed.
There is a lack of validation which I would have liked to include.
The date format on adding things to the DB is different to the one in the test data. I would have liked to have parsed this correctly.
I would also liked to have allowed the saving of  searches. This is fairly easy to implement given my current build.
Searches & sorts are passed to the flux store and handled there. They are passed as one object for searches, and another for sorts.
To enable saving it would have just been a matter of creating a MongoDB collection, with each document just containing a copy of the required objects.
Then they would just need to be read back out and passed back to the flux store through the correct action.

