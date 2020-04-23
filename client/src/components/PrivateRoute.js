import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: {isAuthenticated, loading}, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={
                (props) => {
                return !isAuthenticated && !loading? <Redirect to="/login"/> : <Component {...props}/>
            }}
        />
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute);