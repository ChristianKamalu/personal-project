import React, {Component} from 'react';
import './Messages.css'
import {connect} from 'react-redux';
import {getData} from '../../Ducks/userReducer';
import {getMessages} from '../../Ducks/messagesReducer';
import {Link} from 'react-router-dom';
import socketIOClient from "socket.io-client";
import Axios from 'axios';

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endpoint: "http://192.168.2.172:4000",
            color: 'white',
            messages: [],
            id: this.props.user_id,
            text: ''
        }
    }

    send = () => {
        Axios.post('/SendText', {text: this.state.text, user_id: this.props.user.userData.id})
            .then()

        const socket = socketIOClient(this.state.endpoint);
        // socket.emit('change color', this.state.color)
        socket.emit('send text', this.state.text);
    }

    setColor = (color) => {
        this.setState({ color })
    }

    componentDidMount = () => {
        this.props.getData();
        this.props.getMessages();
        
        const socket = socketIOClient(this.state.endpoint);
        setInterval(this.send(), 1000)
        // socket.on('change color', (col) => {
            //     document.body.style.backgroundColor = col
            // })
            
            socket.on('send text', (text) => {
            console.log('text:', text)
            this.setState({
                messages: [...this.state.messages, text],
                text: ''
            })
        })
    }

    render() {
        const messages = this.state.messages.map((text, i) => {
            return (
                <p key={i} className='text'>{text}</p>
            )
        const threads = this.props.messages.messages.map((message, i) => {
            
        })
        })
        return this.props.user.loggedIn ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='message-thread-container'>
                    <h2>Purchase Threads:</h2>
                    <div className='threads-container'>

                    </div>
                    <h2>Sell Threads:</h2>
                    <div className='threads-container'>

                    </div>
                </div>
                <div className='message-box'>
                    <div className='messages-container'>
                    {messages}
                    </div>
                    <div className='input-button'>
                        <input className='message-input' 
                            placeholder='send message' 
                            value={this.state.text} 
                            onChange={e => this.setState({text: e.target.value})}/>
                        <button 
                            className='send-button' 
                            onClick={this.send}><i className="fas fa-arrow-up"></i></button>
                    </div>
                </div>



                {/* <button onClick={() => this.send() }>Change Color</button>



                <button id="white" onClick={() => this.setColor('white')}>White</button>
                <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
                <button id="red" onClick={() => this.setColor('red')}>Red</button> */}

            </div>
        ) : (
            <div>
                Please <Link className='login-link' to='/Shrubs/Login'>log in</Link> to view messages
            </div>
        )
    }
}

const mapState = reduxState => {
    return {
        user: reduxState.user,
        messages: reduxState.messages
    }
}

export default connect(mapState, {getData, getMessages})(Messages)