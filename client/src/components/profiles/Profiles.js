import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllProfiles } from '../../actions/profileAction';
import Spinner from '../../components/layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profiles, loading }, getAllProfiles}) => {
    useEffect(() => {
        getAllProfiles()
    }, [getAllProfiles])
    return (
        <> {
            loading? <Spinner /> :
            <>
                <h1 className="large text-primary">Developers</h1>   
                <p className="lead">
                    <i className="fab fa-connectdevelop">Brows and connect with developers</i>
                </p>
                <div className="profiles">
                    { profiles.length > 0 ? 
                        profiles.map( profile => <ProfileItem key={profile._id} profile={profile}/>)
                        : <h4>No profiles found...</h4>
                    }
                </div>
            </>
        }</>
    )
}

Profiles.propTypes = {
    profile: PropTypes.object,
    getAllProfiles: PropTypes.func
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProfiles: () => dispatch(getAllProfiles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);