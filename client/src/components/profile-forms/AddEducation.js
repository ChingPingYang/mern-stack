import React, { useState } from "react";
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileAction';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const AddEducation = ({ addEducation, history }) => {
    const [ formData, setFormData ] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const {
        school,
        degree,
        fieldOfStudy,
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
        addEducation(formData, history);
    }

  return (
    <>
      <h1 className="large text-primary">Add An Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any education that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* School" name="school" required onChange={ e => handleOnChange(e)} value={school}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree" name="degree" required onChange={ e => handleOnChange(e)} value={degree}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="fieldOfStudy" name="fieldOfStudy" onChange={ e => handleOnChange(e)} value={fieldOfStudy}/>
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
            placeholder="Program Description"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func,
}


const mapDispatchToProps = dispatch => {
    return {
        addEducation: (formData, history) => dispatch(addEducation(formData, history))
    }
}

export default connect(null, mapDispatchToProps)(AddEducation);