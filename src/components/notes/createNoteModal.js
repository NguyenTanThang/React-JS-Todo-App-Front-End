import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from "react-redux";
import {addNote} from "../../actions/notesActions";

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

  onSubmit = (e) => {
    e.preventDefault();

      const noteItem = {
          title: this.state.title,
          body: this.state.body,
          user_id: localStorage.getItem("user_id")
      }

      this.props.addNote(noteItem);

      this.setState({
        title: "",
        body: ""
      }, () => {
        window.location.reload();
      })

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
          <Button color="primary" onClick={this.toggle}>{buttonLabel}</Button>
          <Modal isOpen={modal} toggle={this.toggle} className={className}>
            <ModalHeader toggle={this.toggle}>Create Note Item</ModalHeader>
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

                <button type="submit" className="btn btn-primary">Create</button>
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
        addNote: (noteItem) => dispatch(addNote(noteItem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteModal);