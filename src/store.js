import promiseMiddleware from 'redux-promise-middleware';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './Ducks/userReducer';
import messagesReducer from './Ducks/messagesReducer';
import listingsReducer from './Ducks/listingsReducer';

const rootReducer = combineReducers({ user: userReducer, messages: messagesReducer, listings: listingsReducer})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));