ProjectOverview.txt contains a more detailed coverage of actions carried out throughout the days when working on the project.

Built with:
Node - v6.11.1 for Windows x64
MongoDB - 3.2

MongoDB setup:
Information is being pulled from a MongoDB
The name of the DB holding the information is "terrarium"
The collection within which the information is stored is called "bugs"
Currently do not have functionality implemented to autocreate DB and load information into Collection on express server being launched/initialised, hopefully included in future.

To run:
 - These node commands to be run from within the terrarium directory
Node Modules listed within package.json, available to install via "npm install" within Node.
 - NOTE: For my build Karma and Webpack were installed globally
After Node Modules installed may need to run "webpack" within node to build project, however a working build of the project should be present at "public\js\index.bundle.js"
After building project through webpack (if required), run "npm start" within Node. This should launch the express server.
Application should now be viewable at http://localhost:12071/


Current Functionality:
Information is loaded from DB into a Flux store.
This store then populates other information.
Open opening website a page is loaded with a list of bugs.
A search function is visible at the top, currently only the bug search function is operational. Other inputs should currently be disabled to represent this.
The column ordering function is also currently not funcational. Buttons should be disabled in submitted build.
You can click the View Details button on each bug to be taken to a Bug Details page, that will also display the full bug description and all the actions related to that bug.

Testing:
To package currently implemented test (just the test for the BugListItem currently running, due to BugList not working due to issues between Karma and database access, see ProjectOverview.txt for further details)
After running webpack as above, the BugListItem test will be output as a js bundle to be tested by Karma.
To run tests in Karma (assuming Karma installed globally) go to the terrarium directory in node and run "karma start terraKarma.config.js"


Additional information:
Wireframes are simple screenshots, available in wireframe folder, along with the static page of my BugTest list built from wireframe.
There are other folders in archive. These demonstrate project at a number stages, to show use of TDD. The points of these copies being made can be found in ProjectOverview.txt file.
-Also, the js bundle files output from webpack have been deleted from the archive builds, so as to reduce file sizes
