import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({ profile: {
    status,
    social,
    company,
    location,
    user: { name, gravatar }
} }) => {
    return (
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={gravatar}
            alt=""
          />
          <h1 className="large">{name}</h1>
          <p className="lead">{status} {company && <span> at {company}</span>}</p>
          { location && <span>{location}</span>}
          <div className="icons my-1">
            {social && social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
              </a>)
            }
            {social && social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {social && social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            {social && social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            )}
            {social && social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )}
          </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object
}

export default ProfileTop;