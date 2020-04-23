import React ,{ Fragment, useEffect }from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import './App.css';
import store from './store';
import { setUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

if(localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(()=>{
    store.dispatch(setUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <PublicRoute exact restricted path="/" component={Landing}/>
            <section className="container">
                <Alert />
                <PublicRoute restricted path="/login" component={Login}/>
                <PublicRoute restricted path="/register" component={Register}/>
                <PublicRoute path="/profiles" component={Profiles}/>
                <PublicRoute path="/profile/:id" component={Profile}/>
                <PrivateRoute path="/dashboard" component={Dashboard}/>
                <PrivateRoute path="/create-profile" component={CreateProfile}/>
                <PrivateRoute path="/edit-profile" component={EditProfile}/>
                <PrivateRoute path="/add-experience" component={AddExperience}/>
                <PrivateRoute path="/add-education" component={AddEducation}/>
                <PrivateRoute exact path="/posts" component={Posts}/>
                <PrivateRoute exact path="/posts/:id" component={Post}/>
            </section>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}


export default App;
