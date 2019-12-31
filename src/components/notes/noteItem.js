import React, { Component } from 'react';
import {getReadableDate} from "../../config/additional-functions";
import {Link} from "react-router-dom";
import {deleteNote} from "../../actions/notesActions";
import {connect} from "react-redux";
import EditNoteModal from "./editNoteModal";

class NoteItem extends Component {

    onDelete = (deletedID) => {
        this.props.deleteNote(deletedID);
    }

    render() {
        const {_id, title, body, created_date} = this.props.noteItem;

        return (
            <div className="col-lg-3 col-md-4 col-sm-12 note-item">
            <div className="card">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">
                {body.substring(0, 20).trim()+"..."}
              </p>
              <h6>{getReadableDate(created_date)}</h6>
              <ul>
                <li>
                    <Link to={`/notes/${_id}`} className="btn btn-primary">
                        <i className="fas fa-eye"></i>
                    </Link>
                </li>
                <li>
                    <button onClick={() => this.onDelete(_id)} className="btn btn-danger">
                        <i className="fas fa-times-circle"></i>
                    </button>
                </li>
                <li>
                    <EditNoteModal buttonLabel={<i className="fas fa-edit"></i>} note_id={_id}/>
                </li>
              </ul>
              
            </div>
          </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNote: (deletedID) => dispatch(deleteNote(deletedID))
    }
}

export default connect(null, mapDispatchToProps)(NoteItem);
