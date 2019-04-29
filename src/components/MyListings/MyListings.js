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
            editListing: false,
            targetListing: '',
            title: '',
            ISBN: '',
            condition: '',
            price: '',
            image: '',
            textbook_id: ''
        }
    }

    componentDidMount() {
        this.props.getListings()
    }

    toggleDisplay = (listing) => {
        this.setState({
            displayListing: !this.state.displayListing,
            targetListing: listing,
            editListing: false,
            createListing: false,
            title: '',
            ISBN: '',
            image: '',
            price: '',
            condition: ''
        })
    }

    toggleCreate = () => {
        this.toggleDisplay();
        this.setState({
            createListing: true
        })
    }

    toggleEdit = () => {
        console.log('target', this.state.targetListing)
        this.setState({
            editListing: !this.state.editListing,
            title: this.state.targetListing.title,
            ISBN: this.state.targetListing.isbn,
            image: this.state.targetListing.image,
            condition: this.state.targetListing.condition,
            price: this.state.targetListing.price,
            textbook_id: this.state.targetListing.textbook_id
        })
    }

    setValue = (target) => {
        const {name, value} = target;
        this.setState({
            [name]: value
        })
    }

    createListing = async () => {
        if(this.state.title && this.state.image && this.state.condition && this.state.price && this.state.ISBN) {
        await Axios.post('/Create-Listing', {state: this.state, user_id: this.props.user.userData.id})
            .then(() => {
                this.props.getListings()
                this.setState({
                    displayListing: false,
                    editListing: false
                })
                swal('Completed', 'New Listing Created', 'success')
            })
        } else {swal('?', 'Please fill out all of the boxes.', 'error')}
    }

    editListing = async () => {
        if(this.state.title && this.state.image && this.state.condition && this.state.price && this.state.ISBN) {
            await Axios.put('/Edit-Listing', {state: this.state})
            .then(() => {
                this.props.getListings()
                this.setState({
                    displayListing: false,
                    createListing: false
                })
                swal('Completed', 'Listing Updated', 'success')
            })
        } else {swal('?', 'Please fill out all of the boxes.', 'error')}
    }

    deleteListing = () => {
        swal("Are you sure you want to do this?", {
            buttons: ["Cancel", "Delete"],
            dangerMode: true
            })
            .then(async (willDelete) => {
                if(willDelete) {
                    await Axios.delete(`/Delete-Listing/${this.state.targetListing.listing_id}`)
                        .then(async () => {
                            this.props.getListings();
                            await this.setState({
                                displayListing: false
                            })
                            swal('Cool Beans', 'Listing deleted.', 'success')
                        })
                }
            })
    }

    render() {
        // eslint-disable-next-line
        const listings = this.props.listings.listings.map((listing, i) => {
            if (listing.user_id === this.props.user.userData.id) {
                return (
                    <div className='listing-container' key={i} onClick={() => this.toggleDisplay(listing)}>
                        <img src={listing.image} alt={listing.titlel} height='150px'/>
                        <div>
                            <h4 style={{fontSize: '1rem', fontWeight: '700', marginTop: '0'}}>{listing.title}</h4>
                            <p>ISBN: <br/>{listing.isbn}</p>
                        </div>
                    </div>
                )
            }
        })
        
        return this.props.user.loggedIn ? (
            <div style={{display: 'flex', width: '100vw', height: '100%'}}>
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
                toggleEdit={this.toggleEdit}
                state={this.state}
                setValue={this.setValue}
                createListing={this.createListing}
                editListing={this.editListing}
                deleteListing={this.deleteListing}
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