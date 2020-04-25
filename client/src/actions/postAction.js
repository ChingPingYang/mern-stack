import axios from 'axios';
import { setAlert } from './alertActions';

export const getAllPost = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({ type: 'GET_ALL_POSTS', payload: res.data});
    } catch(err){
        dispatch({ type: 'POST_ERROR', payload: { msg: err.response.data.msg, status: err.response.status}})
    }
}

export const getCertainPost = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}`);
        dispatch({ type: 'GET_CERTAIN_POSTS', payload: res.data});
    } catch(err) {
        dispatch({ type: 'POST_ERROR', payload: { msg: err.response.data.msg, status: err.response.status}})
    }
}

export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({text: formData});
    try {
        const res = await axios.post('/api/posts', body, config);
        dispatch({ type: 'CREATE_POST', payload: res.data});
        dispatch(setAlert('Post Created', 'success'));
    } catch(err) {        
        dispatch({ type: 'POST_ERROR', payload: { msg: err.response.data.msg, status: err.response.status}})
    }
}

export const addComment = (formData, postId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({text: formData});
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, body, config);
        dispatch({ type: 'CREATE_COMMENT', payload: res.data});
        dispatch(setAlert('Comment Added', 'success'))
    } catch(err) {
        dispatch({ type: 'POST_ERROR', payload: { msg: err.response.data.msg, status: err.response.status}})
    }
}

export const likePost = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({ type: 'LIKE_POST', payload: {postId, likes: res.data}})
    } catch(err) {
        dispatch({ type: 'POST_ERROR', payload: { msg: err.response.data.msg, status: err.response.status}})
    }
}

export const unLikePost = (postId) => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({ type: 'UNLIKE_POST', payload: { postId, likes: res.data}});
    } catch(err) {
        dispatch({ type: 'POST_ERROR', payload: { msg: err.response.data.msg, status: err.response.status}})
    }
}

export const deletePost = (postId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${postId}`);
        dispatch({ type: 'DELETE_POST', payload: postId});
        dispatch(setAlert(res.data.msg, 'success'))
    } catch(err) {
        dispatch({ type: 'POST_ERROR', payload: {msg: err.response.data.msg, status: err.response.status}})
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({ type: 'DELETE_COMMENT', payload: commentId});
        dispatch(setAlert('Comment Deleted', 'success'))
    } catch(err) {
        dispatch({ type: 'POST_ERROR', payload: {msg: err.response.data.msg, status: err.response.status}})
    }
}