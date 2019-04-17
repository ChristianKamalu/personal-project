import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData} from '../../Ducks/userReducer';
import './Listings.css'

class Listings extends Component {
    componentDidMount() {
        this.props.getData()
        console.log(this.props)
    }

    render() {
        const listings = this.props.user.listings.map((listing, i) => {
            return (
                <div className='listing-container'>
                    <img src={listing.image} alt='' width='150px'/>
                </div>
            )
        })
        console.log(this.props)
        return (
            <div className='all-listings-container'>
                {listings}
            </div>
        )
    }
}

const mapState = reduxState => reduxState

export default connect(mapState, {getData})(Listings)