import React, {Component} from 'react';
import './Messages.css'
import {connect} from 'react-redux';
import {getData} from '../../Ducks/userReducer';
import {getMessages} from '../../Ducks/messagesReducer';
import {getListings} from '../../Ducks/listingsReducer';
import {Link} from 'react-router-dom';
import socketIOClient from "socket.io-client";
import Axios from 'axios';
import { readFileSync } from 'fs';

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endpoint: "http://192.168.2.172:4000",
            color: 'white',
            messages: [{
                message_id: ''
            }],
            text: '',
            showMessage: false,
            thread: '',
            buyerId: '',
            sellerId: '',
            listing: []
        }
    }

    focusMessage = () => {
        this.message.current.focus();
    }

    getThread = (message) => {
        console.log('getting thread', message)
        Axios.get(`/getThread/${message.message_id}`)
            .then(res => {
                console.log('res.data', res.data)
                this.setState({
                    messages: res.data,
                    thread: message.message_id,
                    showMessage: true,
                    purchase: false,
                    sell: false,
                    buyerId: message.buyer_id,
                    sellerId: message.seller_id,
                    listing: message
                })
            })
    }

    send = () => {
        Axios.post('/SendText', {text: this.state.text, user_id: this.props.user.userData.id, message_id: this.state.thread})
            .then(() => console.log('text sent'))

        const socket = socketIOClient(this.state.endpoint);

        socket.emit('send text', {text: this.state.text, user_id: this.props.user.userData.id});
    }

    setColor = (color) => {
        this.setState({ color })
    }

    componentDidMount = () => {
        this.props.getData();
        this.props.getMessages();
        this.props.getListings();

        
        const socket = socketIOClient(this.state.endpoint);
        setInterval(this.send(), 1000)
            
        socket.on('send text', (text) => {
            this.setState({
                messages: [...this.state.messages, text],
                text: ''
            })
        })
    }

    // toggleShowPurchase = () => {
    //     this.setState({
    //         showPurchase: !this.state.showPurchase,
    //         showSell: false
    //     })
    // }

    // toggleShowSell = () => {
    //     this.setState({
    //         showPurchase: false,
    //         showSell: !this.state.showSell
    //     })
    // }
    
    render() {
        // eslint-disable-next-line
        const messages = this.state.messages.map((text, i) => {
            if(text.user_id === this.state.buyerId || text.user_id === this.state.sellerId) {
                return (
                    <p key={i} className={this.props.user.userData.id === text.user_id ? 'text-right' : 'text' }>{text.text}</p>
                )
            }
        })

        // eslint-disable-next-line
        const buyerThreads = this.props.messages.messages.map((message, i) => {
            if (message.buyer_id === this.props.user.userData.id) {
                return (
                    <div className='thread-container' key={i} onClick={() => this.getThread(message)}>
                        {message.title}
                    </div>
                )
            }
        })
        // eslint-disable-next-line
        const sellerThreads = this.props.messages.messages.map((message, i) => {
            if (message.seller_id === this.props.user.userData.id) {
                return (
                    <div className='thread-container' key={i} onClick={() => this.getThread(message)}>
                        {message.title}
                    </div>
                )
            }
        })
        return this.props.user.loggedIn ? (
            <div className='all-container'>
                <div className='message-thread-container'>
                    <h2>Purchase Threads:</h2>
                    <div className='threads-container'>
                        {buyerThreads ? buyerThreads : (
                            <div>
                                No current purchase threads
                            </div>
                        )}
                    </div>
                    <h2>Sell Threads:</h2>
                    <div className='threads-container'>
                        {sellerThreads ? sellerThreads : (
                            <div>
                                No current purchase threads
                            </div>
                        )}
                    </div>
                </div>
                {this.state.showMessage ? (
                <div className='all-container'>
                    <div className='drop-down-options' onClick={() => this.setState({purchase: !this.state.purchase, sell: false})}>
                        <div style={{width: '10rem', display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Purchase Threads</h4><i className={this.state.purchase ? 'fas fa-chevron-right rotate' : "fas fa-chevron-right"}></i>
                        </div>
                    </div>
                    <div className={this.state.purchase ? 'buyer-threads-dropdown' : 'no-display'}>{buyerThreads}</div>
                    <div className='drop-down-options' onClick={() => this.setState({sell: !this.state.sell, purchase: false})}>
                        <div style={{width: '10rem', display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Sell Threads</h4><i className={this.state.sell ? 'fas fa-chevron-right rotate' : "fas fa-chevron-right"}></i>
                        </div>
                    </div>
                    <div className={this.state.sell ? 'seller-threads-dropdown' : 'no-display'}>{sellerThreads}</div>
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
                    <div className='listing-box'>
                        <img className='listing-image' src={this.state.listing.image} alt={this.state.listing.title} height='200px'/>
                        <div style={{margin: '1rem', width: '90%'}}>
                            <h4>{this.state.listing.title}</h4>
                            <p>ISBN: <br/>{this.state.listing.isbn}</p>
                            <p>Condition: <br/>{this.state.listing.condition}</p>
                            <p>Price: <br/>${this.state.listing.price}</p>
                        </div>
                    </div>
                </div>
                ) : (
                <div style={{height: '41rem'}}>
                    <div className='drop-down-options' onClick={() => this.setState({purchase: !this.state.purchase, sell: false})}>
                        <div style={{width: '10rem', display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Purchase Threads</h4><i className={this.state.purchase ? 'fas fa-chevron-right rotate' : "fas fa-chevron-right"}></i>
                        </div>
                    </div>
                    <div className={this.state.purchase ? 'buyer-threads-dropdown' : 'no-display'}>{buyerThreads}</div>
                    <div className='drop-down-options' onClick={() => this.setState({sell: !this.state.sell, purchase: false})}>
                        <div style={{width: '10rem', display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Sell Threads</h4><i className={this.state.sell ? 'fas fa-chevron-right rotate' : "fas fa-chevron-right"}></i>
                        </div>
                    </div>
                    <div className={this.state.sell ? 'seller-threads-dropdown' : 'no-display'}>{sellerThreads}</div>
                    Select a thread to see messages
                </div>
                )
                }
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
        messages: reduxState.messages,
        listings: reduxState.listings
    }
}

export default connect(mapState, {getData, getMessages, getListings})(Messages)