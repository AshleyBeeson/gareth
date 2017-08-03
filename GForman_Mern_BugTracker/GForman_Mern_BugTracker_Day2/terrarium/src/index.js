import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Terrarium from './Terrarium';
import BugList from './BugList';
import BugDetails from './BugDetails';
import AddBug from './AddBug';
import EditBug from './EditBug';



ReactDOM.render(
	<Router history = {browserHistory}>
		<Route path='/' component={Terrarium}>
			<IndexRoute component={BugList}></IndexRoute>
			<Route path = "/BugDetails" component={BugDetails} />
			<Route path = "/BugList" component={BugList} />
			<Route path = "/AddBug" component={AddBug} />
			<Route path = "/EditBug" component={EditBug} />
					
		</Route>	
	</Router>
, document.querySelector('#app'));

