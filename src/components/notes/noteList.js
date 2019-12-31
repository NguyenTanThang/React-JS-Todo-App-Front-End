import React, { Component  } from 'react';
import {connect} from "react-redux";
import {fetchNotes} from "../../actions/notesActions";
import CreateNoteModal from "./createNoteModal";
import NoteItem from "./noteItem";
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
        
        this.props.fetchNotes(localStorage.getItem("user_id"));
    }

    render() {
        let notes = [];
        notes = this.props.notes || [];
        let noteItems = "";

        if (notes !== []){
            noteItems = this.props.notes.filter(noteItem => {
                return noteItem !== undefined
            }).map(noteItem => {
                return <NoteItem noteItem={noteItem}/>
            })
        }
        
        return (
            <section>
                <Navbar/>
                <div className="container mt-4">
                
                    <CreateNoteModal buttonLabel={"Add Note"} />
                    <div className="mt-4 row">
                            {noteItems}
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notesReducers.notes
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotes: (user_id) => dispatch(fetchNotes(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
