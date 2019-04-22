import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData} from '../../Ducks/userReducer';
import {Route, Switch, Link} from 'react-router-dom';
import './Main.css';
import Intro from '../Intro/Intro';
import Listings from '../Listings/Listings';
import Messages from '../Messages/Messages';
import MyListings from '../MyListings/MyListings';
import Account from '../Account/Account';

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
                            <h1>SHRUBS</h1>
                        </Link>
                        <h3>The DIY Textbook Exchange</h3>
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
                        {this.props.user.loggedIn ?
                        <div>
                        <a href='http://localhost:4000/Logout'>
                        <div className='user-option-button' style={{borderBottom: '1px solid grey'}}>Log Out</div>
                        </a>
                        <Link to='/Shrubs/MyListings'>
                        <div className='user-option-button' style={{borderBottom: '1px solid grey'}}>My Listings</div>
                        </Link>
                        <Link to='/Shrubs/Account'>
                        <div className='user-option-button'>My Account</div>
                        </Link>
                        </div>
                        :
                        <Link to='/Shrubs/Login'>
                        <div className='user-option-button'>Log In</div>
                        </Link>
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
                    <Route exact path='/Shrubs' component={Intro}/>
                    <Route path='/Shrubs/Listings' component={Listings}/>
                    <Route path='/Shrubs/Messages' component={Messages}/>
                    <Route path='/Shrubs/MyListings' component={MyListings}/>
                    <Route path='/Shrubs/Account' component={Account}/>
                </Switch>
                <hr style={{marginTop: '5rem'}}></hr>
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