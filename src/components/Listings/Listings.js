import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getListings} from '../../Ducks/listingsReducer';
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
                    <img src={listing.image} alt='' width='150px'/>
                </div>
            )
        })
        return (
            <div className='all-listings-container'>
                {listings}
            </div>
        )
    }
}

const mapState = reduxState => {
    return {
        listings: reduxState.listings
    }
}

export default connect(mapState, {getListings})(Listings)