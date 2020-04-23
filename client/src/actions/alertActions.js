import * as uuid from 'uuid';

export const setAlert = (msg, alertType, timeout = 3000) => {
    return (dispatch) => {
        const id = uuid.v4();
        dispatch({
            type: "SET_ALERT",
            payload: {
                id,
                msg,
                alertType
            }
        })
        return setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id}), timeout);
    }
}