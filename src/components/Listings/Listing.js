import React from 'react';

export default function Listing (props) {
    return (
        <div className='listing-display-component' style={props.displayListing ? {display: 'flex', justifyContent:'center'} : {display: 'none'}}>
            <div className='empty-space' onClick={props.toggleDisplay}/>
            <div className='listing-display-container'>
                <i className="fas fa-times exit" onClick={props.toggleDisplay}></i>
                <img src={props.targetListing.image} alt={props.targetListing.title} width='40%'/>
                <div style={{margin: '1rem'}}>
                    <h4 style={{marginTop: '1rem'}}>{props.targetListing.title}</h4>
                    <br/>
                    <p>ISBN:{props.targetListing.isbn}</p>
                    <br/>
                    <p>Condition:{props.targetListing.condition}</p>
                    <br/>
                    <p className='description'>Description: {props.targetListing.description}</p>
                    <br/>
                    <p>Price: <br/>${props.targetListing.price}</p>
                    <p>Interested? <button onClick={props.buy}>Contact Seller</button></p>
                </div>
            </div>
        </div>
    )
}