import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getListings} from '../../Ducks/listingsReducer';
import {Link} from 'react-router-dom';
import './Listings.css';
import Listing from './Listing';
import Axios from 'axios';
import swal from 'sweetalert';

class Listings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayListing: false,
            targetListing: ''
        }
    }

    componentDidMount() {
        this.props.getListings()
    }

    toggleDisplay = (listing) => {
        this.setState({
            displayListing: !this.state.displayListing,
            targetListing: listing
        })
    }

    buy = () => {
        console.log('buyer', this.props.user.userData.id)
        console.log('seller', this.state.targetListing.user_id)
        if(this.state.targetListing.user_id !== this.props.user.userData.id) {
            Axios.post('/CreateMessage', {listing: this.state.targetListing, buyer_id: this.props.user.userData.id})
                .then(() => swal("You're a wizard!!", 'You may now communicate with the seller in your messages tab.', 'success'))
        } else {swal('Error!', 'This is your own listing', 'error', `Let's gooo!`)}
    }

    render() {
        const listings = this.props.listings.listings.map((listing, i) => {
            return (
                <div className='listing-container' key={i} onClick={() => this.toggleDisplay(listing)}>
                    <img src={listing.image} alt={listing.titlel} height='170px'/>
                    <div style={{width: '90%'}}>
                        <h4 style={{marginTop: '1rem'}}>{listing.title}</h4>
                        <p>ISBN: <br/>{listing.isbn}</p>
                    </div>
                </div>
            )
        })


        return this.props.user.loggedIn ? (
            <div className='listings-component'>
                <div className='user-options-container'>
                    <div className='search-container'>
                        <input className='search' placeholder='Search by "title" or "ISBN"'/>
                        <button className='search-button'>Search</button>
                    </div>
                </div>
                <div className='all-listings-container'>
                    {listings}
                </div>
                <Listing 
                    displayListing={this.state.displayListing}
                    toggleDisplay={this.toggleDisplay}
                    targetListing={this.state.targetListing}
                    buy={this.buy}/>
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