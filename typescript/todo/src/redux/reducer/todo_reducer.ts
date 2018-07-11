
import {merge} from 'lodash';
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from '../action/todo_action';
// import todoActions from '../action/todo_action';

interface Todo {
    id: number,
    task: string,
    done: boolean
};

interface Action {
    type: string,
    todos: ReadonlyArray<Todo>|Readonly<Todo>
};

const defaultState = {};

const TodoReducer = (state = {}, action: Action) => {
    Object.freeze(state);

    switch(action.type) {
        // add
        case ADD_TODO:
            break;
        // delete
        case DELETE_TODO:
            break;
        // update
        case UPDATE_TODO:
            break;

        default:
            return state;
    }
};

export default TodoReducer;