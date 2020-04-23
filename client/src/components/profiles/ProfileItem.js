import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ProfileItem = ({ profile: { 
    user: { _id, name, gravatar},
    status,
    company,
    location,
    skills
} }) => {
    return (
        <div className="profile bg-light">
            <img src={gravatar} alt="" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary'>
                    View Profile
                </Link>
            </div>
            <ul>
                {skills.slice(0, 4).map( (skill, index) => {
                    return (
                        <li key={index} className="text-primary">
                            <i className="fas fa-check"></i> {skill}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object
}

export default connect()(ProfileItem);