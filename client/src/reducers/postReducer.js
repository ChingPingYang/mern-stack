const init = {
    post: null,
    posts: [],
    loading: true,
    existUser: [],
    error: {}
}

const postReducer = (state = init, action) => {
    const { type, payload } = action
    switch (type) {
        case 'GET_ALL_POSTS':
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case 'GET_CERTAIN_POSTS':
            return {
                ...state,
                post: payload.post,
                existUser: payload.existUser,
                loading: false
            }
        case 'CREATE_POST':
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case 'CREATE_COMMENT':
            return {
                ...state,
                post: payload,
                loading: false
            }
        case 'LIKE_POST':
        case 'UNLIKE_POST':
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? {...post, likes: payload.likes } : post),
                loading: false
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case 'DELETE_COMMENT': 
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            }
        case 'POST_ERROR': 
            return {
                ...state,
                error: payload,
                loading: false
            }
        default: {
            return state
        }
    }
}

export default postReducer;
