import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData} from '../../Ducks/userReducer';
import './Listings.css';

class Listings extends Component {
    componentDidMount() {
        this.props.getData()
    }

    render() {
        console.log(this.props)
        return(
            <div>
                <header>
                    <div className='header-title'>
                        <h1>Textbook Exchange</h1>
                    </div>
                    <div className='header-picture'></div>
                </header>
            
            </div>
        )
    }
}

const mapState = reduxState => reduxState

export default connect(mapState, {getData})(Listings)