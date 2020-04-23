import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PublicRoute = ({ component: Component, isAuthenticated, restricted, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={
                (props) => {
                    return isAuthenticated && restricted? <Redirect to="/dashboard"/> : <Component {...props}/>
                }
            }
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(PublicRoute);