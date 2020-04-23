import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/postAction';

const CommentItem = ({
    postId,
    comment: { _id, name, avatar, text, user, date },
    auth,
    deleteComment
}) => {
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
            {!auth.loading && user === auth.user._id && (
                <button onClick={e => deleteComment(postId, _id)} type="button" className="btn btn-danger">
                    <i className="fas fa-times"></i>
                </button>
            )}
          </div>
        </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.string,
    comment: PropTypes.object,
    auth: PropTypes.object,
    deleteComment: PropTypes.func
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteComment: (postId, commentId) => dispatch(deleteComment(postId, commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)
