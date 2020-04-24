import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profileAction';
import { getCurrentProfile } from '../../actions/profileAction';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        githubUserName: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: ''
    });

    const [socialInputs, setSocialInputs] = useState(false);
    
    const {
        company,
        location,
        status,
        skills,
        bio,
        githubUserName,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = formData

    useEffect(() => {
        if(!profile) getCurrentProfile()
        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubUserName:
              loading || !profile.githubUserName ? '' : profile.githubUserName,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram
          });
    },[loading, getCurrentProfile])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    return (
        <>
            <h1 className="large text-primary">
                Edit Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's modify some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                <select name="status" value={status} onChange={e => handleChange(e)}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Company" name="company" value={company} onChange={(e) => handleChange(e)}/>
                <small className="form-text"
                    >Could be your own company or one you work for</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => handleChange(e)}/>
                <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e) => handleChange(e)}/>
                <small className="form-text"
                    >Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small
                >
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Github Username"
                    name="githubUserName"
                    value={githubUserName}
                    onChange={(e) => handleChange(e)}
                />
                <small className="form-text"
                    >If you want your latest repos and a Github link, include your
                    username</small
                >
                </div>
                <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e) => handleChange(e)}></textarea>
                <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                <button onClick={() => setSocialInputs(!socialInputs)} type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
                </div>
                
                {
                    socialInputs && (
                        <>
                            <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(e) => handleChange(e)}/>
                            </div>

                            <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e) => handleChange(e)}/>
                            </div>

                            <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e) => handleChange(e)}/>
                            </div>

                            <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e) => handleChange(e)}/>
                            </div>

                            <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e) => handleChange(e)}/>
                            </div>
                            
                        </>
                    )
                }
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func,
    getCurrentProfile: PropTypes.func,
    profile: PropTypes.object
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createProfile: (formData, history, isEdit) => dispatch(createProfile(formData, history, isEdit)),
        getCurrentProfile: () => dispatch(getCurrentProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);