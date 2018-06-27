import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './redux/reducers'
import rootSagas from './redux/sagas'
import createSagaMiddleware from 'redux-saga'
import loggerMiddleware from 'redux-logger'

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
	sagaMiddleware,
	loggerMiddleware
];
const enhancers = [
	applyMiddleware(...middleWares),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// recall that all actions will flow through each middleware until it reaches the end to be passed to Redux reducers
// applyMiddleware() is used to combine various middlewares
const store = createStore(
	reducers,
	composeEnhancers(...enhancers)
)

rootSagas.forEach(saga => sagaMiddleware.run(saga));

// and finally export the store for external use
export default store;
