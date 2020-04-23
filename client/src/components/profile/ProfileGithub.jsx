import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const ProfileGithub = ({ userName, getGithubRepos, repos }) => {
    useEffect(() => {
        getGithubRepos(userName)
    }, [getGithubRepos])
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Github Repos</h2>
            {repos === null? <Spinner/> : (
                repos.map(repo => (
                    <div key={repo._id} className="repo bg-white p-1 my-1">
                        <div>
                            <h4><a href={repo.html_url}target="_blank">{repo.name}</a></h4>
                            <p>{repo.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className="badge badge-dark">
                                    Watchers: {repo.watchers_count}
                                </li>
                                <li className="badge badge-light">
                                    Forks: {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>

                ))
            )}
        </div>
    )
}

ProfileGithub.propTypes = {
    userName: PropTypes.string,
    repos: PropTypes.array,
    getGithubRepos: PropTypes.func
}

const mapStateToProps = state => {
    return {
        repos: state.profile.repos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGithubRepos: (userName) => dispatch(getGithubRepos(userName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);