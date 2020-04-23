import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { logUser } from '../../actions/authActions';

const Login = (props) => {
    const [info,setInfo] = useState({
        email: '',
        password: ''
    });
    const { email, password } = info;
    const handleOnchange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    const handleOnSubmit = async(e) => {
        e.preventDefault();
        props.logUser(info)
    }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={(e)=> handleOnSubmit(e)}>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address" 
          name="email" 
          value={email}
          onChange={(e) => handleOnchange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to='/register'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
    logUser: Proptypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        logUser: (info) => dispatch(logUser(info))
    }
}

export default connect(null, mapDispatchToProps)(Login);
