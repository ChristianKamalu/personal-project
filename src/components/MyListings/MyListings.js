import React, {Component} from 'react';
import './MyListings.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getListings} from '../../Ducks/listingsReducer';
import MyListing from './MyListing';
import Axios from 'axios';
import swal from 'sweetalert';

class MyListings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayListing: false,
            createListing: false,
            targetListing: '',
            title: '',
            ISBN: '',
            condition: '',
            price: '',
            image: ''
        }
    }

    componentDidMount() {
        this.props.getListings()
    }

    toggleDisplay = (listing) => {
        this.setState({
            displayListing: !this.state.displayListing,
            targetListing: listing,
            createListing: false
        })
    }

    toggleCreate = () => {
        this.toggleDisplay();
        this.setState({
            createListing: true
        })
    }

    setValue = (target) => {
        const {name, value} = target;
        this.setState({
            [name]: value
        })
    }

    createListing = () => {
        Axios.post('/Create-Listing', {state: this.state, user_id: this.props.user.userData.id})
            .then(() => {
                swal('Completed', 'New Listing Created', 'success')
            })
        this.toggleDisplay();
    }

    render() {
        // eslint-disable-next-line
        const listings = this.props.listings.listings.map((listing, i) => {
            if (listing.user_id === this.props.user.userData.id) {
                return (
                    <div className='listing-container' key={i} onClick={() => this.toggleDisplay(listing)}>
                        <img src={listing.image} alt={listing.titlel} width='120px'/>
                        <div>
                            <h4 style={{marginTop: '1rem'}}>{listing.title}</h4>
                            <p>ISBN: <br/>{listing.isbn}</p>
                        </div>
                    </div>
                )
            }
        })
        return this.props.user.loggedIn ? (
            <div style={{display: 'flex', width: '100vw'}}>
                <div className='left-container'>
                    <div>
                        <Link to='/Shrubs/MyListings'>
                        <p className='user-links'>My Listings</p>
                        </Link>
                        <Link to='/Shrubs/Account'>
                        <p className='user-links'>My Account</p>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className='create-listing' onClick={this.toggleCreate}>Create New Listing</div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {listings}
                    </div>
                </div>
                <MyListing 
                toggleDisplay={this.toggleDisplay}
                state={this.state}
                setValue={this.setValue}
                createListing={this.createListing}
                />
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
        listings: reduxState.listings,
        user: reduxState.user
    }
}

export default connect(mapState, {getListings})(MyListings)