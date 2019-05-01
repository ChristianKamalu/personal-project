import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Account.css';

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {
        return (
            <div style={{display: 'flex', width: '100vw', minHeight: 'calc(100vh - 25rem'}}>
                <div className='left-side-container'>
                    <div>
                        <Link to='/MyListings'>
                        <p className='user-links'>My Listings</p>
                        </Link>
                        <Link to='/Account'>
                        <p className='user-links'>My Account</p>
                        </Link>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}

export default Account