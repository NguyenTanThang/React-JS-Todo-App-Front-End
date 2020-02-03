import React, {Component} from "react";
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {userLogin} from "../actions/usersActions";
import {connect} from "react-redux";

class FaceBookLogin extends Component {
    state = {
        username: "",
        email: "",
        facebook_id: "",
        imageURL: ""
    }

    componentClicked = () => console.log("Clicked")

    responseFacebook = (facebookResponse) => {
        console.log(facebookResponse);

        this.setState({
            username: facebookResponse.name,
            facebook_id: facebookResponse.id,
            imageURL: facebookResponse.picture.data.url
        }, () => {
            console.log(this.state);
            const {facebook_id,
                username,
                imageURL} = this.state;
            axios.get(`${MAIN_PROXY_URL}/users?facebook_id=${facebook_id}`)
            .then(response => {
                console.log(response.data);
                const user = response.data;

                if (user){
                    axios.post(`${MAIN_PROXY_URL}/users/login`, {facebook_id})
                    .then(response => {
                        console.log("Login");
                        console.log(response.data);
                        this.props.userLogin(response);
                    })
                } else {
                    axios.post(`${MAIN_PROXY_URL}/users/signup`, {facebook_id, username, imageURL})
                    .then(response => {
                        console.log("Signup");
                        console.log(response.data);
                        this.props.userLogin(response);
                    })
                }

                if (this.props.user !== {}){
                    this.props.history.push("/dashboard");
                }
            })
        })
    }

    render(){
        return (
            <section>
                <div className="pt-5 pb-5 banner bg-dark text-center">
                    <h1 className="text-white">Welcome to your very own todo application</h1>
                </div>
                <div className="text-center mt-4">
                    <FacebookLogin
                    appId="2385795361730610"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (response) => dispatch(userLogin(response))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceBookLogin);