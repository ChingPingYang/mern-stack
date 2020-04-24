import axios from 'axios';
import { setAlert } from './alertActions';

export const getAllProfiles = () => async dispatch => {
    dispatch({ type: 'CLEAR_PROFILE'})
    try {
        const res = await axios.get('/api/profile');
        dispatch({ type: 'GET_ALL_PROFILES', payload: res.data});
    } catch(err) {
        dispatch({
            type: 'PROFILE_ERROR',
            payload: { msg: err.response.data.msg, status: err.response.status}
        })
    }
}

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({type: 'GET_CURRENT_PROFILE', payload: res.data})
    } catch(err) {
        dispatch({
            type: 'PROFILE_ERROR',
            payload: { msg: err.response.data.msg, status: err.response.status}
        })
    }
}

export const getCertainProfile = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${id}`);
        dispatch({ type: 'GET_CERTAIN_PROFILE', payload: res.data});
    } catch(err) {
        dispatch({
            type: 'PROFILE_ERROR',
            payload: { msg: err.response.data.msg, status: err.response.status}
        })
    }
}

export const getGithubRepos = userName => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${userName}`);
        dispatch({ type: 'GET_REPOS', payload: res.data });
    } catch(err) {
        dispatch({
            type: 'PROFILE_ERROR',
            payload: { msg: err.response.data.msg, status: err.response.status}
        })
    }
}

export const createProfile = (formData, history, isEdit = false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData)
    try {
        const res = await axios.post('/api/profile', body, config);
        dispatch({type: 'GET_CURRENT_PROFILE', payload: res.data.profile})
        if(isEdit === false) {
            history.push('/dashboard')
        }
        dispatch(setAlert(isEdit ? 'Profile Updated' : 'Profile Created', 'success'));
    } catch(err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({type: 'PROFILE_ERROR', payload: err.response.data.msg});
    }
}

export const addExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json' 
        }
    }
    const body = JSON.stringify(formData);
    try {
        const res = await axios.put('/api/profile/experience', body, config);
        dispatch({ type: 'UPDATE_PROFILE', payload: res.data})
        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');
    } catch(err) {
        const errors  = err.response.data.msg;
        if(errors) errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({type: 'PROFILE_ERROR', payload: err.response.data.msg});
    }
}

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({ type: 'UPDATE_PROFILE', payload: res.data});
        dispatch(setAlert('Experience Deleted', 'success'));
    } catch(err) {
        dispatch({type: 'PROFILE_ERROR', payload: err.response.data.msg});
    }
}

export const addEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData);
    try {
        const res = await axios.put('/api/profile/education', body, config);
        dispatch({ type: 'UPDATE_PROFILE', payload: res.data});
        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard');
    } catch(err) {
        const errors  = err.response.data.msg;
        console.log(errors)
        if(errors) errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({type: 'PROFILE_ERROR', payload: err.response.data.msg});
    }
}

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({ type: 'UPDATE_PROFILE', payload: res.data});
        dispatch(setAlert('Education Deleted', 'success'));
    } catch(err) {
        dispatch({type: 'PROFILE_ERROR', payload: err.response.data.msg});
    }
}



export const clearProfile = () => dispatch => {
    dispatch({type: 'CLEAR_PROFILE'});
}

export const deleteAcount = () => async dispatch => {
    if(window.confirm('Are you sure? This can not be undo')){
        try {
            await axios.delete('/api/profile');
            dispatch({ type: 'CLEAR_PROFILE' });
            dispatch({ type: 'ACCOUNT_DELETED' });
            dispatch(setAlert('Profile Deleted...'));
        } catch(err) {
            dispatch({type: 'PROFILE_ERROR', payload: err.response.data.msg});
        }
    }
}