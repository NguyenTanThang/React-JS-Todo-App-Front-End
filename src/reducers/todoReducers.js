import {
    FETCH_TODOS,
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO
} from '../actions/types';

const initialState = {
    todos: [],
    todoItem: {}
}

const todoReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS:
            return {
                ...state,
                todos: action.payload.todos
            }
            break;

        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload.createdTodo]
            }
            break;

        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(item => {
                    if (item._id === action.payload.updatedTodo._id) {
                        return action.payload.updatedTodo;
                    }
                    return item;
                })
            }
            break;

        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(item => {
                    return item._id !== action.payload.deletedID
                })
            }
            break;

        default:
            return state;
    }
}

export default todoReducers;