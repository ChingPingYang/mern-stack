import React, { useState } from "react";
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profileAction';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const AddExperience = ({ addExperience, history }) => {
    const [ formData, setFormData ] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = formData;

    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        addExperience(formData, history);
    }

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required onChange={ e => handleOnChange(e)} value={title}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required onChange={ e => handleOnChange(e)} value={company}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" onChange={ e => handleOnChange(e)} value={location}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" onChange={ e => handleOnChange(e)} value={from} />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" 
                   name="current" 
                   checked={current} 
                   value={current}
                   onChange={ () => {
                       setFormData({
                           ...formData,
                           current: !current
                       });

                   }}  /> Current Job
          </p>
        </div>
        <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" onChange={ e => handleOnChange(e)} value={to} disabled={ current && 'disable'}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={ e => handleOnChange(e)} 
            value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

AddExperience.propTypes = {
    addExperience: PropTypes.func,
}


const mapDispatchToProps = dispatch => {
    return {
        addExperience: (formData, history) => dispatch(addExperience(formData, history))
    }
}

export default connect(null, mapDispatchToProps)(AddExperience);