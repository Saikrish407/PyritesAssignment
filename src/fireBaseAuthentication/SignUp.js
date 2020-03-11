import React, { Component } from 'react';
import '../App.css';
import firebase from '../FireBase';
import NavBar from './NavBar';

class SignUp extends Component {
    state = {
        userName: '',
        email: '',
        password: '',
        loading: true,
        usersRef: firebase.database().ref("users")
    }

    componentDidMount() {
        const userData = localStorage.getItem('user');
        const parsedUser = JSON.parse(userData);
        if (parsedUser !== null) {
            this.props.history.push("/sign-in");
        }
    }

    handleSignUp = (eve) => {
        this.setState({ [eve.target.name]: eve.target.value })
    }

    handleSubmitSignUp = (eve) => {
        eve.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                res.user.updateProfile({
                    displayName: this.state.userName,
                })
                    .then(() => {
                        this.saveUserData(res).then(() => console.log("user saved sucsessfully"))
                    })
            })
            .then(() => {
                firebase.auth().currentUser.sendEmailVerification()
                    .then(() => {
                        this.props.history.push('/sign-in')
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    saveUserData = (createdUser) => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            email: createdUser.user.email
        })
    };

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className='conatiner mt-5'>
                    <div className='col-lg-4 col-md-6 col-sm-12 col-12 m-auto'>
                        <div style={{ borderRadius: '2rem' }}
                            className='card card-body shadow'>
                            <h3 className='text-center text-info'>SignUp</h3>
                            <form className='p-2'
                                onSubmit={this.handleSubmitSignUp}>
                                <div className='form-group'>
                                    <input
                                        name='username'
                                        onChange={this.handleSignUp}
                                        className='form-control text-center'
                                        type='text'
                                        placeholder='Enter user id' />
                                </div>
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
                                    type='submit'
                                    className='btn btn-md btn-info float-right'>
                                    SignUp
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SignUp;