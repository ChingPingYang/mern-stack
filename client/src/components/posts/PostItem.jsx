import React , { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { likePost, unLikePost, deletePost } from '../../actions/postAction';


const PostItem = ({ auth, showActions, likePost, unLikePost, deletePost, post: {
    _id,
    user,
    name,
    text,
    avatar,
    likes,
    comments,
    date
} }) => {
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            {showActions && <>
            <button onClick={() => likePost(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
              {likes.length > 0 && (<span> {likes.length}</span>)}
            </button>
            <button onClick={() => unLikePost(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion {comments.length > 0 && (<span className='comment-count'> {comments.length}</span>)}
            </Link>
            { !auth.loading && user === auth.user._id && 
            <button      
                type="button"
                className="btn btn-danger"
                onClick={() => deletePost(_id)}
            >
                <i className="fas fa-times"></i>
            </button>
            }
            </>}
          </div>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object,
    likePost: PropTypes.func,
    unLikePost: PropTypes.func,
    deletePost: PropTypes.func
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        likePost: (postId) => dispatch(likePost(postId)),
        unLikePost: (postId) => dispatch(unLikePost(postId)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);