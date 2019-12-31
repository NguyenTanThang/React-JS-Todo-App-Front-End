import React, { Component  } from 'react';
import {connect} from "react-redux";
import {fetchTodos} from "../../actions/todosActions";
import CreateTodoModal from "./createTodoModal";
import TodoItem from "./todoItem";
import Navbar from "../navbar";
import {isAnyNull} from "../../config/additional-functions";

class TodoList extends Component {

    componentWillMount(){
        if (isAnyNull(
            localStorage.getItem("user_id"),
            localStorage.getItem("token")
            ))
        {
            this.props.history.push("/");
        }
    }

    componentDidMount(){
        this.props.fetchTodos(localStorage.getItem("user_id"));
    }

    render() {
        let todos = [];
        todos = this.props.todos || [];
        let todoItems = "";

        if (todos !== []){
            todoItems = todos.filter(todoItem => {
                return todoItem !== undefined
            }).map(todoItem => {
                return <TodoItem todoItem={todoItem}/>
            })
        }
        
        return (
            <section>
                <Navbar/>
                <div className="container mt-4">
                
                    <CreateTodoModal buttonLabel={"Add Item"} />
                    <ul className="mt-4 list-group">
                            {todoItems}
                    </ul>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todoReducers.todos
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodos: (user_id) => dispatch(fetchTodos(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
