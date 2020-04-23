import React , { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { getAllPost } from '../../actions/postAction';

const Posts = ( { post: { posts, loading }, getAllPost} ) => {
    useEffect(() => {
        getAllPost()
    }, [getAllPost])
    return (
        <>{ loading? <Spinner/> : <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user">Welcome to the community</i>
            </p>
            <PostForm/>
            <div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>
        </>}</>
    )
}

Posts.propTypes = {
    post: PropTypes.object,
    getAllPost: PropTypes.func
}

const mapStateToProps = state => {
    return {
        post: state.post
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllPost: () => dispatch(getAllPost())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);