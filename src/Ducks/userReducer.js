import axios from 'axios';

const initialState = {
    user: {}
}

const GET_DATA = 'GET_DATA';

export function getData() {
    let data = axios.get('/Listings').then( res => res.data )
    console.log(data)
    return {
        type: GET_DATA,
        payload: data
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATA + '_FULFILLED':
            return {user: action.payload}
        default:
            return state
    }
}