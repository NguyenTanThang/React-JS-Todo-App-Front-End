import {
    FETCH_TODOS,
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO
} from "./types";
import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";

export const fetchTodos = (user_id) => {
    return (dispatch) => {
        axios.get(`${MAIN_PROXY_URL}/todos?user_id=${user_id}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({
                type: FETCH_TODOS,
                payload: {
                    todos: response.data
                }
            })
        })
    }    
}

export const addTodo = (todoItem) => {
    return (dispatch) => {
        axios.post(`${MAIN_PROXY_URL}/todos/add`, todoItem, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({
                type: ADD_TODO,
                payload: {
                    createdTodo: response.data.createdTodo
                }
            })
        })
    }   
}

export const editTodo = (updatedTodoItem) => {
    return (dispatch) => {
        axios.put(`${MAIN_PROXY_URL}/todos/edit/${updatedTodoItem._id}`, updatedTodoItem, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({
                type: EDIT_TODO,
                payload: {
                    updatedTodo: response.data.updatedTodo
                }
            })
        })
    } 
}

export const deleteTodo = (deletedID) => {
    return (dispatch) => {
        axios.delete(`${MAIN_PROXY_URL}/todos/delete/${deletedID}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({
                type: DELETE_TODO,
                payload: {
                    deletedID
                }
            })
        })
    } 
}

