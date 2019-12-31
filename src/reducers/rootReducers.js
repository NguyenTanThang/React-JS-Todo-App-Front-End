import {combineReducers} from "redux";
import userReducers from "./userReducers"
import notesReducers from "./notesReducers"
import todoReducers from "./todoReducers"

const rootReducers = combineReducers({
    userReducers,notesReducers,todoReducers
});

export default rootReducers;