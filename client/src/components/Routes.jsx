import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Profiles from './profiles/Profiles';
import Profile from './profile/Profile';
import Alert from './layout/Alert';
import Dashboard from './dashboard/Dashboard';
import CreateProfile from './profile-forms/CreateProfile';
import EditProfile from './profile-forms/EditProfile';
import AddExperience from './profile-forms/AddExperience';
import AddEducation from './profile-forms/AddEducation';
import Posts from './posts/Posts';
import Post from './post/Post';
import NotFound from './layout/NotFound';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
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
                <Route component={NotFound}/>
            </Switch>
        </section>
    )
}


export default Routes
