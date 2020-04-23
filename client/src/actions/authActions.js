import axios from 'axios';
import { setAlert } from './alertActions';
import { clearProfile } from './profileAction';
import setAuthToken from '../utils/setAuthToken';


// load user whenever there's a token in localStorage
export const setUser = () => {
    return async (dispatch) => {
        if(localStorage.token) setAuthToken(localStorage.token);
        try {
            const res = await axios.get('/api/auth');
            dispatch({type: 'USER_LOADED', payload: res.data})
        } catch(err) {
            dispatch({type: 'AUTH_ERROR'})
        }
    }
}

export const registerUser = (info) => {
    const { name, email, password } = info
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({
            name,
            email,
            password
        })
        try {
            const res = await axios.post('/api/users', body, config);
            dispatch({type:'REGISTER_SUCCESS', payload: res.data});
            dispatch(setUser());
        } catch(err) {
            const errors = err.response.data.errors;
            if(errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            dispatch({type: 'REGISTER_FAILED'})
        }

    }
}

export const logUser = (info) => {
    return async (dispatch) => {
        const { email, password } = info
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ email, password });
        try {
            const res = await axios.post('/api/auth', body, config);
            dispatch({type: 'LOGIN_SUCCESS', payload: { token: res.data.token }})
            dispatch(setUser());
        } catch(err) {
            const error = err.response.data.msg
            if(typeof error === 'string') {
                dispatch(setAlert(error, 'danger'))
            } else if(typeof error === 'object') {
                error.forEach(err => dispatch(setAlert(err.msg, 'danger')));
            }
            dispatch({type: 'LOGIN-FAILED'})
        }
    }
}

export const logOut = () => dispatch => {
    dispatch(clearProfile());
    dispatch({type: 'LOGOUT'});
}