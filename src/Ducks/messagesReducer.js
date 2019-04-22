import axios from 'axios';

const initialState = {
    messages: [{
        buyer_id: '',
        seller_id: ''
    }]
}

const GET_MESSAGES = 'GET_MESSAGES';

export function getMessages() {
    let messages = axios.get('/get-messages').then(res => res.data)
    return {
        type: GET_MESSAGES,
        payload: messages
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES + '_FULFILLED':
            console.log('messages', action.payload)
            return {messages: action.payload.messages}
        default:
            return state
    }
}