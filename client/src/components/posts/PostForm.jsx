import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/postAction';

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('');
    const handleOnChange = e => setText(e.target.value);
    const handleOnSubmit = e => {
        e.preventDefault();
        addPost(text)
        setText('')
    }
    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={handleOnSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={handleOnChange}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        addPost: (formData) => dispatch(addPost(formData))
    }
}

export default connect(null, mapDispatchToProps)(PostForm);