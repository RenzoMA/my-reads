import * as service from './../services/api'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_DONE = 'FETCH_CATEGORIES_DONE';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_DONE = 'FETCH_POSTS_DONE';
export const FETCH_ALL_POST = 'FETCH_ALL_POSTS';
export const FETCH_ALL_POST_DONE = 'FETCH_ALL_POSTS_DONE';
export const SORT_POSTS = 'SORT_POSTS';
export const SAVE_NEW_POST = 'SAVE_NEW_POST';
export const SAVE_NEW_POST_DONE = 'SAVE_NEW_POST_DONE';
const uuidv4 = require('uuid/v4');
export const FETCH_POST = "FETCH_POST";
export const FETCH_POST_DONE = "FETCH_POST_DONE";
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_DONE = 'ADD_COMMENT_DONE';
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const FETCH_COMMENTS_DONE = "FETCH_COMMENTS_DONE";
export const VOTE_FOR_POST = "VOTE_FOR_POST";
export const VOTE_FOR_POST_DONE = "VOTE_FOR_POST_DONE";
export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_DONE = "DELETE_POST_DONE";
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_DONE = 'UPDATE_POST_DONE';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_COMMENT_DONE = 'UPDATE_COMMENT_DONE';
export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_DONE = "DELETE_COMMENT_DONE";
export const VOTE_COMMENT = "VOTE_COMMENT";
export const VOTE_COMMENT_DONE = "VOTE_COMMENT_DONE";

export function voteComment(voteOption, commentId) {
    return function (dispatch) {
        return service.voteComment(voteOption, commentId)
            .then((response) => {
                dispatch(voteCommentDone(response))
            });
    }
}

export function voteCommentDone(payload) {
    return {
        type: VOTE_COMMENT_DONE,
        payload
    }
}

export function deleteComment(commentId) {
    return function (dispatch) {
        return service.deleteComment(commentId)
            .then((response) => {
                dispatch(deleteCommentDone(response))
            });
    }
}

export function deleteCommentDone(payload) {
    return {
        type: DELETE_COMMENT_DONE,
        payload
    }
}

export function updateComment(comment) {
    comment.timestamp = Date.now();
    return function (dispatch) {
        return service.updateComment(comment)
            .then((response) => {
                dispatch(updateCommentDone(response))
            });
    }
}

export function updateCommentDone(payload) {
    return {
        type: UPDATE_COMMENT_DONE,
        payload
    }
}

export function updatePost(post) {
    return function (dispatch) {
        return service.updatePost(post)
            .then((response) => {
                dispatch(updatePostDone(response))
            });
    }
}

export function updatePostDone(payload) {
    return {
        type: UPDATE_POST_DONE,
        payload
    }
}

export function deletePost(postId) {
    return function (dispatch) {
        return service.deletePost(postId)
            .then((response) => {
                dispatch(deletePostDone(response))
            });
    }
}

export function deletePostDone(payload) {
    return {
        type: DELETE_POST_DONE,
        payload
    }
}

export function voteForPost(voteOption, postId) {
    return function (dispatch) {
        return service.votePost(voteOption, postId)
            .then((response) => {
                dispatch(voteForPostDone(response))
            })
    }
}

export function voteForPostDone(payload) {
    return {
        type: VOTE_FOR_POST_DONE,
        payload
    }
}

export function fetchComments(postId) {
    return function (dispatch) {
        return service.fetchComments(postId)
            .then((response) => {
                dispatch(fetchCommentsDone(response))
            })
    }
}

export function fetchCommentsDone(payload) {
    return {
        type: FETCH_COMMENTS_DONE,
        payload
    }
}

export function addComment(postId, comment) {
    comment.id = uuidv4();
    comment.timestamp = Date.now();
    comment.author = "annonymous";
    comment.parentId = postId;
    return function (dispatch) {
        return service.addComment(comment)
            .then((response) => {
                dispatch(addCommentDone(response))
            })
    }
}

export function addCommentDone(payload) {
    return {
        type: ADD_COMMENT_DONE,
        payload
    }
}

export function fetchPost(id) {
    return function (dispatch) {
        return service.fetchPost(id)
            .then((response) => {
                dispatch(fetchPostDone(response));
                return response;
            })
    }
}
export function fetchPostDone(payload) {
    return {
        type: FETCH_POST_DONE,
        payload
    }
}
export function saveNewPost(post) {
    post.id = uuidv4();
    post.timestamp = Date.now();
    post.author = "annonymous";
    return function (dispatch) {
        return service.saveNewPost(post)
            .then((response) => {
                dispatch(saveNewPostDone(response))
            });
    }
}
export function saveNewPostDone(payload) {
    return {
        type: SAVE_NEW_POST_DONE,
        payload
    }
}

export function sortPosts(payload) {
    return {
        type: SORT_POSTS,
        payload
    }
}

export function fetchCategories() {
    return function (dispatch) {
        return service.fetchCategories()
            .then((response) => {
                dispatch(fetchCagegoriesDone(response.categories));
            })
    }
}

export function fetchCagegoriesDone(payload) {
    return {
        type: FETCH_CATEGORIES_DONE,
        payload
    }
}

export function fetchPosts(category, sortBy) {
    return function (dispatch) {
        return service.fetchPosts(category)
            .then((response) => {
                dispatch(fetchPostsDone({ response, sortBy }))
            })
    }
}

export function fetchPostsDone(payload) {
    return {
        type: FETCH_POSTS_DONE,
        payload
    }
}

export function fetchAllPosts(sortBy) {
    return function (dispatch) {
        return service.fetchAllPosts()
            .then((response) => {
                dispatch(fetchAllPostsDone({ response, sortBy }))
            })
    }
}

export function fetchAllPostsDone(payload) {
    return {
        type: FETCH_ALL_POST_DONE,
        payload
    }
}