import axios from 'axios';

const initialState = {
    listings: [{
        listings: [{
            ISBN: 0
        }]
    }]
}

const GET_LISTINGS = 'GET_LISTINGS';

export function getListings() {
    let listings = axios.get('/Listings').then(res => res.data)
    return {
        type: GET_LISTINGS,
        payload: listings
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_LISTINGS + '_FULFILLED':
            return {listings: action.payload.listings}
        default:
            return state
    }
}