import React, { Component } from 'react';
import Navbar from "../navbar";
import {getReadableDate} from "../../config/additional-functions";
import axios from "axios";
import {MAIN_PROXY_URL} from "../../config/config";
import {Link} from "react-router-dom";
import {isAnyNull} from "../../config/additional-functions";

class ViewNote extends Component {

    state = {
        title: "",
        body: "",
        created_date: ""
    }

    componentWillMount(){
        if (isAnyNull(
            localStorage.getItem("user_id"),
            localStorage.getItem("token")
            ))
        {
            this.props.history.push("/");
        }

        axios.get(`${MAIN_PROXY_URL}/notes/${this.props.match.params.id}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then(response => {
            this.setState({
                title: response.data.title,
                body: response.data.body,
                created_date: getReadableDate(response.data.created_date)
            })
        })
    }

    render() {
        const {title, body, created_date} = this.state;

        return (
            <section>
                <Navbar/>
                <div className="container mt-4">
                    <h1>{title}</h1>
                    <h6>{created_date}</h6>
                    <Link to="/notes" className="btn btn-light">Back</Link>
                    <hr/>
                    <p>{body}</p>
                </div>
            </section>
        )
    }
}

export default ViewNote;
