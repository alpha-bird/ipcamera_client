import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import app from './App'
import store from './store'
import registerServiceWorker from './registerServiceWorker';

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<Provider store = { store }>
		<Router history={ history }>
			<Route path='/' component = { app } />
			<Route path='/embed_player' component = { app }>
				<Route path=':redirectParam' component = { app } />
			</Route>
		</Router>
	</Provider>, document.getElementById('root'));

registerServiceWorker();
