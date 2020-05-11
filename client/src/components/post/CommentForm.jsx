import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addComment } from '../../actions/postAction';
import PropTypes from 'prop-types'

const CommentForm = ({addComment, postId}) => {
    const [formData, setFormData] = useState('')
    const handleOnChange = e => setFormData(e.target.value);
    const handleOnSubmit = e => {
        e.preventDefault();
        addComment(formData, postId);
        setFormData('')
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Leave a Comment</h3>
            </div>
            <form className="form my-1" onSubmit={handleOnSubmit}>
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Leave a comment"
                value={formData}
                onChange={handleOnChange}
                required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (formData, postId) => dispatch(addComment(formData, postId))
    }
}

export default connect(null, mapDispatchToProps)(CommentForm)
