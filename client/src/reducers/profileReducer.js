const init = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

const profileReducer = (state = init, action) => {
    const { type, payload } = action
    switch (type) {
        case 'GET_ALL_PROFILES':
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case 'GET_CURRENT_PROFILE':
        case 'UPDATE_PROFILE':
        case 'GET_CERTAIN_PROFILE':
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case 'GET_REPOS':
            return {
                ...state,
                repos: payload,
                loading: false
            }
        case 'CLEAR_PROFILE':
            return {
                ...state,
                profile: null,
                repose: [],
                loading: true
            }
        case 'PROFILE_ERROR':
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        default:
            return state
    }
}

export default profileReducer;