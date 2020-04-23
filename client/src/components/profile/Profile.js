import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCertainProfile } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import PropTypes from 'prop-types';

const Profile = ({ getCertainProfile, profile: { profile, loading }, auth, match }) => {
    useEffect(() => {
        getCertainProfile(match.params.id)
    },[getCertainProfile, match.params.id])
    return (
        <>{ profile === null || loading ? <Spinner /> : 
            <>
                <Link to="/profiles" className="btn btn-light">
                    Back To Profiles
                </Link>
                { auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id 
                  && <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>}
                <div class="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile={profile}/>
                    <div class="profile-exp bg-white p-2">
                        <h2 class="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (<>
                            {profile.experience.map( experience => (
                                <ProfileExperience key={experience._id} experience={experience}/>
                            ))}
                        </>) 
                        : (<h4>No experience credentials</h4>)}
                    </div>
                    <div class="profile-edu bg-white p-2">
                        <h2 class="text-primary">Education</h2>
                        {profile.education.length > 0 ? (<>
                            {profile.education.map( education => (
                                <ProfileEducation key={education._id} education={education}/>
                            ))}
                        </>) 
                        : (<h4>No education credentials</h4>)}
                    </div>
                     {profile.githubUserName && <ProfileGithub userName={profile.githubUserName}/> }
                </div>
            </>
        }</>
    )
}

Profile.propTypes = {
    profile: PropTypes.object,
    auth: PropTypes.object,
    getCertainProfile: PropTypes.func
}

const mapStateToProps = state => {
    return {
        profile: state.profile,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCertainProfile: (id) => dispatch(getCertainProfile(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);