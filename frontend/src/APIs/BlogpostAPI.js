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
