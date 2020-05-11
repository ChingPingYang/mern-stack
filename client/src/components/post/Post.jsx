import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from './CommentItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCertainPost } from '../../actions/postAction';

const Post = ({ getCertainPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getCertainPost(match.params.id)
    }, [getCertainPost])
    return loading || post === null? <Spinner /> : 
        <>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <PostItem post={post} showActions={false}/>
            <CommentForm postId={post._id} />
            {post.comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={post._id}/>    )}
        </>
    
}

Post.propTypes = {
    post: PropTypes.object,
    getCertainPost: PropTypes.func
}

const mapStateToProps = state => {
    return {
        post: state.post
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCertainPost: (postId) => dispatch(getCertainPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)