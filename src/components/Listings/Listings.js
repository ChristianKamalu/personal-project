import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getListings} from '../../Ducks/listingsReducer';
import {Link, Switch, Route} from 'react-router-dom';
import './Listings.css';
import Listing from './Listing';
import Axios from 'axios';
import swal from 'sweetalert';
import styled from 'styled-components';
import ListingCard from './ListingCard';

const ListingContainer = styled.div`
    border-radius: 1rem;
    padding: 1rem;
    margin: 1rem;
    width: 15rem;
    height: 18.5rem;
    background-color: rgba(255, 255, 255, 0.555);
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    align-items: center;
    box-shadow: 5px 10px 15px;
    overflow: hidden;
    transition: .3s;

    :hover {
        cursor: pointer;
        transform: scale(1.1)
    }
`

class Listings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayListing: false,
            targetListing: '',
            searchResults: ''
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
        if(!this.props.user.loggedIn) return swal('Please log in to contact the seller')
        if(this.state.targetListing.user_id !== this.props.user.userData.id) {
            Axios.post('/CreateMessage', {listing: this.state.targetListing, buyer_id: this.props.user.userData.id})
                .then(() => swal("Listing tracked", 'You may now communicate with the seller in your messages tab.', 'success'))
        } else {swal('Error!', 'This is your own listing', 'error')}
    }

    render() {
        const listings = this.props.listings.listings.map((listing, i) => {
            // this.props.history.push(`-${listing.listing_id}`)
            return (
                <>
                {/* <ListingContainer key={i} onClick={() => this.toggleDisplay(listing)}>
                    <div className='listingPic' style={{backgroundImage: `url(${listing.image})`}}/>
                    <br/>
                    <div style={{width: '90%', maxHeight: '40%'}}>
                        <h4 style={{fontSize: '1rem', fontWeight: '700', marginTop: '0'}}>{listing.title}</h4>
                        <p>ISBN: {listing.isbn}</p>
                        <p>Condition: {listing.condition}</p>
                        <p className='description'>Description: {listing.description}</p>
                    </div>
                </ListingContainer> */}
                <ListingCard
                    toggleDisplay={this.toggleDisplay}
                    listing={listing} 
                    key={i}
                />
                </>
            )
        })


        // eslint-disable-next-line
        const filtered = this.props.listings.listings.map((listing, i) => {

            if (listing.title.toLowerCase().includes(this.state.searchResults.toLowerCase()) || listing.isbn === this.state.searchResults) {
                return (
                    <>
                    {/* <ListingContainer key={i} onClick={() => this.toggleDisplay(listing)}>
                        <div className='listingPic' style={{backgroundImage: `url(${listing.image})`}}/>
                        <br/>
                        <div style={{width: '90%'}}>
                            <h4 style={{fontSize: '1rem', fontWeight: '700', marginTop: '0'}}>{listing.title}</h4>
                            <p>ISBN: {listing.isbn}</p>
                            <p>Condition: {listing.condition}</p>
                            <p className='description'>Description: {listing.description}</p>
                        </div>
                    </ListingContainer> */}
                    <ListingCard 
                        toggleDisplay={this.toggleDisplay}
                        listing={listing}
                        key={i}
                    />
                    </>
                )
            }
        })


        return this.state.searchResults ? (
            <div className='listings-component'>
                <div className='user-options-container'>
                    <div className='search-container'>
                        <input className='search' placeholder='Search by "title" or "ISBN"' onChange={e => this.setState({searchResults: e.target.value})}/>
                        {/* <button className='search-button' onClick={this.search}>Search</button> */}
                    </div>
                </div>
                <div className='all-listings-container'>
                    {filtered}
                </div>
                <Listing 
                    displayListing={this.state.displayListing}
                    toggleDisplay={this.toggleDisplay}
                    targetListing={this.state.targetListing}
                    buy={this.buy}/>
            </div>
        ) : (
            <div className='listings-component'>
                <div className='user-options-container'>
                    <div className='search-container'>
                        <input className='search' placeholder='Search by "title" or "ISBN"' onChange={e => this.setState({searchResults: e.target.value})}/>
                        {/* <button className='search-button' onClick={this.search}>Search</button> */}
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