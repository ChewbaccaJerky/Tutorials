import { combineReducers } from 'redux';

import todoReducer from './todo_reducer';

// Todo reducer
const RootReducer = combineReducers({
    todos: todoReducer
});

export default RootReducer;