import * as actions from './../actions';


const initialState = {
    categories: [],
    posts: [],
    post: {
        detail: null,
        comments: []
    }
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.VOTE_FOR_POST_DONE: {
            return {
                ...state,
                post: { ...state.post, detail: action.payload },
                posts: state.posts.map((post) => {
                    if (post.id === action.payload.id) {
                        return action.payload
                    }
                    return post;
                })
            }
        }
        case actions.FETCH_COMMENTS_DONE: {
            return {
                ...state,
                post: { ...state.post, comments: action.payload }
            }
        }
        case actions.FETCH_POST_DONE: {
            return {
                ...state,
                post: { ...state.post, detail: action.payload }
            }
        }
        case actions.FETCH_CATEGORIES_DONE: {
            return {
                ...state,
                categories: action.payload
            }
        }
        case actions.FETCH_POSTS_DONE: {
            return {
                ...state,
                posts: action.payload.response.sort((currentPost, nextPost) => {
                    if (currentPost[action.payload.sortBy] > nextPost[action.payload.sortBy]) return -1
                    if (currentPost[action.payload.sortBy] < nextPost[action.payload.sortBy]) return 1
                    return 0
                })
            }
        }
        case actions.FETCH_ALL_POST_DONE: {
            return {
                ...state,
                posts: action.payload.response.sort((currentPost, nextPost) => {
                    if (currentPost[action.payload.sortBy] > nextPost[action.payload.sortBy]) return -1
                    if (currentPost[action.payload.sortBy] < nextPost[action.payload.sortBy]) return 1
                    return 0
                })
            }
        }
        case actions.SORT_POSTS: {
            return {
                ...state,
                posts: action.payload
            }
        }
        default:
            return state;
    }
}