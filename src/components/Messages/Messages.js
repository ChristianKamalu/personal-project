import React, {Component} from 'react';
// import {connect} from 'react-redux';
import './Messages.css'
// import Axios from 'axios';
import socketIOClient from "socket.io-client";

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endpoint: "http://192.168.2.172:4000",
            color: 'white'
        }
    }

    send = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('change color', this.state.color)
    }

    setColor = (color) => {
        this.setState({ color })
    }

    // componentDidMount = () => {
    //     const socket = socketIOClient(this.state.endpoint);
    //     setInterval(this.send(), 1000)
    //     socket.on('change color', (col) => {
    //         document.body.style.backgroundColor = col
    //     })
    // }

    render() {

        const socket = socketIOClient(this.state.endpoint)
        socket.on('change color', (col) => {
            document.body.style.backgroundColor = col
        })

        return (
            <div style={{ textAlign: "center" }}>
                


                {/* <button onClick={() => this.send() }>Change Color</button>



                <button id="white" onClick={() => this.setColor('white')}>White</button>
                <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
                <button id="red" onClick={() => this.setColor('red')}>Red</button> */}

            </div>
        )
    }
}

export default Messages