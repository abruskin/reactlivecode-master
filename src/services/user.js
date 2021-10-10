const base_url = 'http://localhost:3000/api/'

export function requestLogin(credentials) {
    console.log('request log in')
    return fetch (base_url + 'user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}