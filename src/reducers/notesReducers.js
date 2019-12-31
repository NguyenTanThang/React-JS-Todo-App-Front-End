import {
    FETCH_NOTES,
    ADD_NOTE,
    EDIT_NOTE,
    DELETE_NOTE,
    VIEW_NOTE
} from '../actions/types';

const initialState = {
    notes: [],
    noteItem: {}
}

const noteReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTES:
            return {
                ...state,
                notes: action.payload.notes
            }
            break;

        case VIEW_NOTE:
            return {
                ...state,
                noteItem: action.payload.note
            }
            break;

        case ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload.createdNote]
            }
            break;

        case EDIT_NOTE:
            return {
                ...state,
                notes: state.notes.map(item => {
                    if (item._id === action.payload.updatedNote._id) {
                        return action.payload.updatedNote;
                    }
                    return item;
                })
            }
            break;

        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(item => {
                    return item._id !== action.payload.deletedNote._id
                })
            }
            break;

        default:
            return state;
    }
}

export default noteReducers;