import {
    FETCH_NOTES,
    ADD_NOTE,
    EDIT_NOTE,
    DELETE_NOTE,
    VIEW_NOTE
} from "./types";
import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";

export const viewNote = (note_id) => {
    return (dispatch) => {
        axios.get(`${MAIN_PROXY_URL}/notes/${note_id}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({
                type: VIEW_NOTE,
                payload: {
                    note: response.data
                }
            })
        })
    }  
}

export const fetchNotes = (user_id) => {
    return (dispatch) => {
        axios.get(`${MAIN_PROXY_URL}/notes?user_id=${user_id}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({
                type: FETCH_NOTES,
                payload: {
                    notes: response.data
                }
            })
        })
    }    
}

export const addNote = (noteItem) => {
    return (dispatch) => {
        axios.post(`${MAIN_PROXY_URL}/notes/add`, noteItem, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({
                type: ADD_NOTE,
                payload: {
                    createdNote: response.data.createdNote
                }
            })
        })
    }   
}

export const editNote = (updatedNoteItem) => {
    return (dispatch) => {
        axios.put(`${MAIN_PROXY_URL}/notes/edit/${updatedNoteItem._id}`, updatedNoteItem, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({
                type: EDIT_NOTE,
                payload: {
                    updatedNote: response.data.updatedNote
                }
            })
        })
    } 
}

export const deleteNote = (deletedID) => {
    return (dispatch) => {
        axios.delete(`${MAIN_PROXY_URL}/notes/delete/${deletedID}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({
                type: DELETE_NOTE,
                payload: {
                    deletedNote: response.data.deletedNote
                }
            })
        })
    } 
}

