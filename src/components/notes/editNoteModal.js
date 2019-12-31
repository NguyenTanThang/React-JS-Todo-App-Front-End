import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from "react-redux";
import {editNote} from "../../actions/notesActions";
import axios from "axios";
import {MAIN_PROXY_URL} from "../../config/config";

class AddNoteModal extends Component {

    constructor(props){
        super(props);

        this.state = {
            modal: false,
            title: "",
            body: ""
        }
    }

  toggle = () => {
      this.setState({
         modal: !this.state.modal
      })
  }

  componentWillMount(){
    axios.get(`${MAIN_PROXY_URL}/notes/${this.props.note_id}`, {
      headers: {
          "auth-token": localStorage.getItem("token")
      }
  })
    .then(response => {
        this.setState({
            title: response.data.title,
            body: response.data.body
        })
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

      const noteItem = {
          _id: this.props.note_id,
          title: this.state.title,
          body: this.state.body
      }

      this.props.editNote(noteItem);
      window.location.reload();
  }

  onChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
  }

  render() {
    const {modal} = this.state;
    const {buttonLabel, className} = this.props;

    return (

        <div>
          <Button color="warning" onClick={this.toggle}>{buttonLabel}</Button>
          <Modal isOpen={modal} toggle={this.toggle} className={className}>
            <ModalHeader toggle={this.toggle}>Edit Note</ModalHeader>
            <ModalBody>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Note title" id="title" className="form-control" onChange={this.onChange} value={this.state.title} />
                </div>

                <div className="form-group">
                    <label>Body</label>
                    <textarea type="text" placeholder="Note body" id="body" className="form-control" onChange={this.onChange} value={this.state.body}></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
  }
  
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editNote: (noteItem) => dispatch(editNote(noteItem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteModal);