import React, {Component} from 'react';
import './Messages.css'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import socketIOClient from "socket.io-client";

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endpoint: "http://192.168.2.172:4000",
            color: 'white',
            messages: [],
            message: ''
        }
    }

    send = () => {
        const socket = socketIOClient(this.state.endpoint);
        // socket.emit('change color', this.state.color)
        socket.emit('send message', this.state.message)
    }

    setColor = (color) => {
        this.setState({ color })
    }

    componentDidMount = () => {
        const socket = socketIOClient(this.state.endpoint);
        setInterval(this.send(), 1000)
        // socket.on('change color', (col) => {
        //     document.body.style.backgroundColor = col
        // })

        socket.on('send message', (message) => {
            console.log('message', message)
            this.setState({
                messages: [...this.state.messages, message],
                message: message
            })
        })
    }

    render() {
        const messages = this.state.messages.map((message, i) => {
            return (
                <p key={i} className='text'>{message}</p>
            )
        })
        return this.props.user.loggedIn ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className='message-box'>
                    <div className='messages-container'>
                    {messages}
                    </div>
                    <div className='input-button'>
                        <input className='message-input' 
                            placeholder='send message' 
                            value={this.state.message} 
                            onChange={e => this.setState({message: e.target.value})}/>
                        <button 
                            className='send-button' 
                            onClick={this.send}>SEND</button>
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
        user: reduxState.user
    }
}

export default connect(mapState)(Messages)