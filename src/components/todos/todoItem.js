import React, {Component} from "react";
import {getReadableDate} from "../../config/additional-functions";
import {deleteTodo} from "../../actions/todosActions";
import {connect} from "react-redux";

class TodoItem extends Component {

    onDelete = (deletedID) => {
        this.props.deleteTodo(deletedID);
    }

    render() {
        const {_id, title, created_date} = this.props.todoItem;

        return (
                <li key={_id} className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <p>{title}</p>
                            <p>{getReadableDate(created_date)}</p>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 text-right">
                            <button onClick={() => this.onDelete(_id)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </li>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodo: (deleteID) => dispatch(deleteTodo(deleteID)) 
    }
}

export default connect(null, mapDispatchToProps)(TodoItem);