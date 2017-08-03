import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Terrarium from './Terrarium';
import BugList from './BugList';



ReactDOM.render(
	<Router history = {browserHistory}>
		<Route path='/' component={Terrarium}>
			<IndexRoute component={BugList}></IndexRoute>

					
		</Route>	
	</Router>
, document.querySelector('#app'));

