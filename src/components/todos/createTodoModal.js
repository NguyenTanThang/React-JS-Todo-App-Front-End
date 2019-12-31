import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from "react-redux";
import {addTodo} from "../../actions/todosActions";

class AddTodoModal extends Component {

    constructor(props){
        super(props);

        this.state = {
            modal: false,
            title: ""
        }
    }

  toggle = () => {
      this.setState({
         modal: !this.state.modal
      })
  }

  onSubmit = (e) => {
    e.preventDefault();

      const todoItem = {
          title: this.state.title,
          user_id: localStorage.getItem("user_id")
      }

      this.props.addTodo(todoItem);

      this.setState({
        title: ""
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
            <ModalHeader toggle={this.toggle}>Create Todo Item</ModalHeader>
            <ModalBody>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Todo title" id="title" className="form-control" onChange={this.onChange} value={this.state.title} />
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
        addTodo: (todoItem) => dispatch(addTodo(todoItem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoModal);