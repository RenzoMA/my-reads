
const baseUrl = `http://localhost:3001`;
let authToken = localStorage.authToken

if (!authToken)
    authToken = localStorage.authToken = 'RM' + Math.random().toString(36).substr(-5)

export const headers = {
    'Accept': 'application/json',
    'Authorization': authToken,
    'Content-Type': 'application/json'
}

export function fetchCategories() {
    return fetch(`${baseUrl}/categories`, { headers: headers })
        .then((res) => res.json())
}

export function fetchPosts(category) {
    return fetch(`${baseUrl}/${category}/posts`, { headers: headers })
        .then((res) => res.json())
}
export function fetchAllPosts() {
    return fetch(`${baseUrl}/posts`, { headers: headers })
        .then((res) => res.json())
}
export function saveNewPost(post) {
    return fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(post)
    }).then((res) => res.json());
}

export function fetchPost(id) {
    return fetch(`${baseUrl}/posts/${id}`, { headers: headers })
        .then((res) => res.json())
}

export function fetchComments(postId) {
    return fetch(`${baseUrl}/posts/${postId}/comments`, { headers: headers })
        .then((res) => res.json())
}

export function addComment(comment) {
    return fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(comment)
    }).then((res) => res.json())
}

export function votePost(voteOption, postId) {
    let option = { option: voteOption };
    return fetch(`${baseUrl}/posts/${postId}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(option)
    }).then((res) => res.json())
}
export function voteComment(voteOption, commentId) {
    let option = { option: voteOption };
    return fetch(`${baseUrl}/comments/${commentId}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(option)
    }).then((res) => res.json())
}

export function deletePost(postId) {
    return fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
        headers: headers
    }).then((res) => res.json())
}

export function updatePost(post) {
    return fetch(`${baseUrl}/posts/${post.postId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(post)
    }).then((res) => res.json())
}

export function updateComment(comment) {
    return fetch(`${baseUrl}/comments/${comment.commentId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(comment)
    }).then((res) => res.json())
}

export function deleteComment(commentId) {
    return fetch(`${baseUrl}/comments/${commentId}`, {
        method: 'DELETE',
        headers: headers
    }).then((res) => res.json())
}

