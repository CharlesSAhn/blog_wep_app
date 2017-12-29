const api = "http://localhost:3001"

const headers = {
    'Accept': 'application/json',
    'Authorization': 'Basic NDQyMWU3OGM4Zjk1NmE0ZTAyMTZjNjJmMjhiOTFkZmU6NjhlMTZmZjM5MDhiZTcxOWIzZGEwMjA4OTljMzM3ZTg='
}


export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())


export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())

export const getComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())


export const postNew = (data) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers,
        body: data
    }).then(res => res.json())

export const updatePost = (data, id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers,
        body: data
    }).then(res => res.json())

export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json())


export const postNewComment = (data) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers,
        body: data
    }).then(res => res.json())

export const updateComment = (body, id)=>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers,
        body: body
    }).then(res => res.json())

export const votePOST = (data, id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers,
        body: data
    }).then(res => res)


export const voteCOMMENTS = (data, id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers,
        body: data
    }).then(res => res)