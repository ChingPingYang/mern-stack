import React , { useEffect }from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAcount } from '../../actions/profileAction';

const Dashboard = ({ auth: { user }, profile: { profile, loading }, getCurrentProfile, deleteAcount}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
    return (
        <>
            { loading && profile === null ? <Spinner /> : 
            <> 
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user">Welcome { user && user.name}</i>
                </p>
                { profile !== null?
                    (<>
                        <DashboardActions />
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={deleteAcount}>
                                <i className="fas fa-user-minus"></i> Delete My Account
                            </button>
                        </div>
                    </>) :
                    (<>
                        <p>You have not profile, please add your own profile</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </>)
                }
            </>}
        </>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object,
    profile: PropTypes.object,
    getCurrentProfile: PropTypes.func,
    deleteAcount: PropTypes.func
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCurrentProfile: () => dispatch(getCurrentProfile()),
        deleteAcount: () => dispatch(deleteAcount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);