import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getListings} from '../../Ducks/listingsReducer';
import {Link} from 'react-router-dom';
import './Listings.css'

class Listings extends Component {
    componentDidMount() {
        this.props.getListings()
        console.log(this.props)
    }

    render() {
        console.log('this is listings', this.props)
        const listings = this.props.listings.listings.map((listing, i) => {
            return (
                <div className='listing-container'>
                    <img src={listing.image} alt='' width='150px' height='200px'/>
                </div>
            )
        })
        return this.props.user.loggedIn ? (
            <div className='listings-component'>
                <div className='user-options-container'>
                    <input className='search' placeholder='Search by "title" or "ISBN"'/>
                    <button className='search-button'>Search</button>
                </div>
                <div className='all-listings-container'>
                    {listings}
                </div>
            </div>
        ) : (
            <div>
                Please <Link className='login-link' to='/Shrubs/Login'>log in</Link> to view listings
            </div>
        )
    }
}

const mapState = reduxState => {
    return {
        listings: reduxState.listings,
        user: reduxState.user
    }
}

export default connect(mapState, {getListings})(Listings)