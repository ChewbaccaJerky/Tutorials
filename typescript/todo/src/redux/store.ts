
import { createStore, applyMiddleware } from 'redux';
import RootReducer from './reducer/root_reducer';
import thunk from 'redux-thunk';

const configureStore = function(preloadedState={}) {
    return createStore(RootReducer, preloadedState, applyMiddleware(thunk));
};