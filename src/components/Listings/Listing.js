import React from 'react';
// import {Link} from 'react-router-dom';

export default function Listing (props) {
    console.log('email', props.targetListing.email)
    return (
        <div className='listing-display-component' style={props.displayListing ? {display: 'flex', justifyContent:'center'} : {display: 'none'}}>
            <div className='empty-space' onClick={props.toggleDisplay}/>
            <div className='listing-display-container'>
                <i className="fas fa-times exit" onClick={props.toggleDisplay}></i>
                <img src={props.targetListing.image} alt={props.targetListing.title} width='40%'/>
                <div style={{margin: '1rem'}}>
                    <h4 style={{marginTop: '1rem'}}>{props.targetListing.title}</h4>
                    <p>ISBN: <br/>{props.targetListing.isbn}</p>
                    <p>Condition: <br/>{props.targetListing.condition}</p>
                    <p>Price: <br/>${props.targetListing.price}</p>
                    <p>Interested? <button onClick={props.buy}>Contact Seller</button></p>
                </div>
            </div>
        </div>
    )
}