import axios from 'axios';

const initialState = {
    loggedIn: false,
    userData: {
        firstName: '',
        id: ''
    },
    loading: false
}

const GET_DATA = 'GET_DATA';

export function getData() {
    let userData = axios.get('/user-info').then( res => res.data )
    return {
        type: GET_DATA,
        payload: userData
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATA + '_FULFILLED':
            return {loggedIn: action.payload.loggedIn, userData: action.payload.userData, loading: false}
        case GET_DATA + '_PENDING':
            return {...state, loading: true}
        default:
            return state
    }
}