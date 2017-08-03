import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Terrarium from './Terrarium';
import BugList from './BugList';
import BugDetails from './BugDetails';



ReactDOM.render(
	<Router history = {browserHistory}>
		<Route path='/' component={Terrarium}>
			<IndexRoute component={BugList}></IndexRoute>
			<Route path = "/BugDetails" component={BugDetails} />
					
		</Route>	
	</Router>
, document.querySelector('#app'));

