import React, { Component } from 'react';
import firebase from '../FireBase';
import '../App.css';
import NavBar from './NavBar';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    }

    componentDidMount() {
        const userData = localStorage.getItem('user');
        const parsedUser = JSON.parse(userData);
        if (parsedUser !== null) {
            this.props.history.push("/dashboard");
        }
    }

    handleSignUp = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleOnSubmitSignIn = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        if (user.emailVerified) {
                            const usersData = JSON.stringify(user);
                            localStorage.setItem("user", usersData);
                            this.props.history.push('/dashboard');
                        }
                    }
                })
            })

    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className='conatiner mt-5'>
                    <div className='col-lg-4 col-sm-12 col-12 m-auto'>
                        <div style={{ borderRadius: '2rem' }}
                            className='card card-body shadow'>
                            <h3
                                className='text-center text-info'>
                                SignIn
                            </h3>
                            <form onSubmit={this.handleOnSubmitSignIn} className='p-2'>
                                <div className='form-group'>
                                    <input
                                        name='email'
                                        onChange={this.handleSignUp}
                                        className='form-control text-center'
                                        type='email'
                                        placeholder='Email' />
                                </div>
                                <div className='form-group'>
                                    <input
                                        autoComplete=""
                                        name='password'
                                        onChange={this.handleSignUp}
                                        className='form-control text-center'
                                        type='password'
                                        placeholder='Password' />
                                </div>
                                <button
                                    className='btn btn-md btn-info float-right'>
                                    SignIn
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SignIn;