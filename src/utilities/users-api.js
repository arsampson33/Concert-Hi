import { getToken } from './users-service';


const BASE_URL = 'http://localhost:3001/api/users'

export function signUp(userData){
    return sendRequest(BASE_URL, 'POST', userData)
}

export function login(userData){
    return sendRequest(BASE_URL + "/login", 'POST', userData)
}

export function checkToken(){
    return sendRequest(BASE_URL + "/check-token")
}
//FUNCTION THAT HANDLES THE FETCH REQUEST
async function sendRequest( url, method = 'GET', payload = null){
    
    const options = {method}

    if (payload) {
        options.headers = { 'Content-Type': 'application/json'}
        options.body = JSON.stringify(payload)
    }

    const token = getToken();
    if(token){
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(url, options)
    if(res.ok) return res.json()
    throw new Error('Bad Request')
}
