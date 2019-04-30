import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData} from '../../Ducks/userReducer';
import {Redirect, Route, Switch, Link} from 'react-router-dom';
import './Main.css';
import Intro from '../Intro/Intro';
import Listings from '../Listings/Listings';
import Messages from '../Messages/Messages';
import MyListings from '../MyListings/MyListings';
import Account from '../Account/Account';
import About from '../About/About';
require('dotenv').config();

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: false
        }
    }
    componentDidMount() {
        this.props.getData()
    }

    getFirstLetter = () => {
        return this.props.user.userData.firstName.toUpperCase().split('')[0]
    }

    toggleOptions = () => {
        this.setState({
            options: !this.state.options
        })
    }

    render() {
        return(
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <header>
                    <div className='header-title'>
                        <Link to='/Shrubs' style={{textDecoration: 'none', color: 'white'}}>
                            <h1 style={{fontSize: '4rem'}}>SHRUBS</h1>
                        </Link>
                        <h3>#1 way to buy and sell textbooks</h3>
                    </div>
                    <div className='header-picture'></div>
                    {this.props.user.loggedIn ?
                    <div className='user-logo' onClick={this.toggleOptions}>{this.getFirstLetter()}</div>
                    :
                    <div className='user-logo' onClick={this.toggleOptions}>
                        <i className="far fa-user"></i>                    
                    </div>
                    }
                    <div className={this.state.options ? 'user-options' : 'no-display'}>
                    <div style={{position: 'fixed', right: '0', top: '0', width: '100vw', height: '100vh'}} onClick={this.toggleOptions}></div>
                        {this.props.user.loggedIn ?
                        <div style={{zIndex: '1'}}>
                            <div>
                            <a href={process.env.REACT_APP_LOGOUT}>
                            <div className='user-option-button' style={{borderBottom: '1px solid grey'}} onClick={this.toggleOptions}>Log Out</div>
                            </a>
                            <Link to='/Shrubs/MyListings'>
                            <div className='user-option-button' style={{borderBottom: '1px solid grey'}} onClick={this.toggleOptions}>My Listings</div>
                            </Link>
                            <Link to='/Shrubs/Account'>
                            <div className='user-option-button' onClick={this.toggleOptions}>My Account</div>
                            </Link>
                            </div>
                        </div>
                        :
                        <div style={{zIndex: '1'}}>
                            <Link to='/Shrubs/Login'>
                            <div className='user-option-button'>Log In</div>
                            </Link>
                        </div>
                        }
                    </div>
                    <div className='links'>
                        <Link style={{textDecoration: 'none'}} to='/Shrubs'>
                            <li>HOME</li>
                        </Link>
                        <Link style={{textDecoration: 'none'}} to='/Shrubs/Listings'>
                            <li>Listings</li>
                        </Link>
                        <Link style={{textDecoration: 'none'}} to='/Shrubs/Messages'>
                            <li>Messages</li>
                        </Link>
                        <Link style={{textDecoration: 'none'}} to='/Shrubs/About'>
                            <li>About</li>
                        </Link>
                    </div>
                </header>
                <Switch>
                    <Route exact path='/' render={() => {
                        return <Redirect to='/Shrubs'/>
                    }}/>>
                    <Route exact path='/Shrubs' component={Intro}/>
                    <Route path='/Shrubs/Listings' component={Listings}/>
                    <Route path='/Shrubs/Messages' component={Messages}/>
                    <Route path='/Shrubs/About' component={About}/>
                    <Route path='/Shrubs/MyListings' component={MyListings}/>
                    <Route path='/Shrubs/Account' component={Account}/>
                </Switch>
                <hr></hr>
                <footer>

                </footer>
            </div>
        )
    }
}

const mapState = reduxState => {
    return {
        user: reduxState.user
    }
}

export default connect(mapState, {getData})(Main)