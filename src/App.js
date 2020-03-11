import React from 'react';
import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import SignUp from './fireBaseAuthentication/SignUp';
import SignIn from './fireBaseAuthentication/SignIn';
import DashBoard from '../src/Dashboard/dashboard';
import firebase from './FireBase';

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const usersData = JSON.stringify(user);
        localStorage.setItem("user", usersData);
        this.props.history.push('/dashboard');
      }
    })
  }

  render() {
    const userData = localStorage.getItem('user');
    const parsedUser = JSON.parse(userData);
    return (
      <Switch>
        <Route exact path='/' component={SignUp} />
        <Route path='/sign-in' component={SignIn} />
        <PrivateRoute path="/dashboard" component={DashBoard} isAuth={parsedUser !== null} />
      </Switch>
    );
  }
}

export default withRouter(App);

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  console.log(isAuth)
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuth ? <Component {...props} /> : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
      )}
    />
  )
}
