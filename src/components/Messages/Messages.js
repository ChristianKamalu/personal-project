import React, {Component} from 'react';
import './Messages.css'
import {connect} from 'react-redux';
import {getData} from '../../Ducks/userReducer';
import {getMessages} from '../../Ducks/messagesReducer';
import {getListings} from '../../Ducks/listingsReducer';
import {Link} from 'react-router-dom';
import socketIOClient from "socket.io-client";
import Axios from 'axios';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
import styled from 'styled-components';

const ThreadContainer = styled.div`
    height: 30rem;
    width: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3rem;
    border-radius: .5rem;
    box-shadow: 5px 10px 15px;

    @media (max-width: 1300px) {
        margin: .5rem    
    }

    @media (max-width: 1050px) {
        display: none;
    }
`

const MessageContainer = styled.div`
    height: 30rem;
    width: 20rem;
    position: relative;
    margin: 3rem;
    border-radius: .5rem;
    box-shadow: 5px 10px 15px;
    display: flex;
    justify-content: center;

    @media (max-width: 1300px) {
        margin: .5rem    
    }

    @media (max-width: 680px) {
        width: 100%;
        height: 15rem
    }

`

const ListingContainer = styled.div`
    height: 30rem;
    width: 20rem;
    position: relative;
    margin: 3rem;
    border-radius: .5rem;
    box-shadow: 5px 10px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 1300px) {
        margin: .5rem    
    }

    @media (max-width: 680px) {
        width: 100%;
    }
`

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endpoint: "165.22.149.91/#/",
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
        Axios.get(`/getThread/${message.message_id}`)
            .then(res => {
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

        this.setState({text: ''})
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
                // text: ''
            })
        })
    }
    
    render() {
        const ROOT_CSS = css({
            width: '95%', 
            height: 'calc(100% - 3rem)', 
            overflowX: 'scroll', 
            overflowY: 'scroll', 
            marginTop: '1rem'
        });

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
                <ThreadContainer>
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
                </ThreadContainer>
                {this.state.showMessage ? (
                <div className='all-container'>
                    <div className='drop-down-options' onClick={() => this.setState({purchase: !this.state.purchase, sell: false})}>
                        <div style={{width: '80%', display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Purchase Threads</h4><i className={this.state.purchase ? 'fas fa-chevron-right rotate' : "fas fa-chevron-right"}></i>
                        </div>
                    </div>
                    <div className={this.state.purchase ? 'buyer-threads-dropdown' : 'no-display'}>{buyerThreads}</div>
                    <div className='drop-down-options' onClick={() => this.setState({sell: !this.state.sell, purchase: false})}>
                        <div style={{width: '80%', display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Sell Threads</h4><i className={this.state.sell ? 'fas fa-chevron-right rotate' : "fas fa-chevron-right"}></i>
                        </div>
                    </div>
                    <div className={this.state.sell ? 'seller-threads-dropdown' : 'no-display'}>{sellerThreads}</div>
                    <div className='message-listing-container'>
                        <MessageContainer>
                            <ScrollToBottom className={ROOT_CSS} style={{width: '95%', height: 'calc(100% - 3rem)', overflowX: 'scroll', overflowY: 'scroll', marginTop: '1rem'}}>
                            {messages}
                            </ScrollToBottom>
                            <div className='input-button'>
                                <input className='message-input' 
                                    placeholder='send message' 
                                    value={this.state.text} 
                                    onChange={e => this.setState({text: e.target.value})}/>
                                <button 
                                    className='send-button' 
                                    onClick={this.send}><i className="fas fa-arrow-up"></i></button>
                            </div>
                        </MessageContainer>
                        <ListingContainer>
                            <img className='listing-image' src={this.state.listing.image} alt={this.state.listing.title} height='150px'/>
                            <div style={{margin: '1rem', width: '90%'}}>
                                <h4>{this.state.listing.title}</h4>
                                <p>ISBN: <br/>{this.state.listing.isbn}</p>
                                <p>Condition: <br/>{this.state.listing.condition}</p>
                                <p>Price: <br/>${this.state.listing.price}</p>
                            </div>
                        </ListingContainer>
                    </div>
                </div>
                ) : (
                <div style={{height: '41rem', display: 'flex', flexDirection: 'column'}}>
                    <div className='drop-down-options' onClick={() => this.setState({purchase: !this.state.purchase, sell: false})}>
                        <div style={{width: '80%', display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Purchase Threads</h4><i className={this.state.purchase ? 'fas fa-chevron-right rotate' : "fas fa-chevron-right"}></i>
                        </div>
                    </div>
                    <div className={this.state.purchase ? 'buyer-threads-dropdown' : 'no-display'}>{buyerThreads}</div>
                    <div className='drop-down-options' onClick={() => this.setState({sell: !this.state.sell, purchase: false})}>
                        <div style={{width: '80%', display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Sell Threads</h4><i className={this.state.sell ? 'fas fa-chevron-right rotate' : "fas fa-chevron-right"}></i>
                        </div>
                    </div>
                    <div className={this.state.sell ? 'seller-threads-dropdown' : 'no-display'}>{sellerThreads}</div>
                </div>
                )
                }
            </div>
        ) : (
            <div style={{minHeight: 'calc(100vh - 25rem'}}>
                Please <Link className='login-link' to='/Login'>log in</Link> to view messages
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