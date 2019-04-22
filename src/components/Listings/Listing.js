import React from 'react';
// import {Link} from 'react-router-dom';

export default function Listing (props) {

    return (
        <div className='listing-display-component' style={props.displayListing ? {display: 'flex'} : {display: 'none'}}>
            <div className='empty-space' onClick={props.toggleDisplay}/>
            <div className='listing-display-container'>
                <img src={props.targetListing.image} alt={props.targetListing.title} width='120px' height='200px'/>
                <div>
                    <h4 style={{marginTop: '1rem'}}>{props.targetListing.title}</h4>
                    <p>ISBN: <br/>{props.targetListing.isbn}</p>
                    <p>Condition: <br/>{props.targetListing.condition}</p>
                    <p>Price: <br/>${props.targetListing.price}</p>
                    <p>Interested? <button onClick={props.buy}>BUY</button></p>
                </div>
            </div>
        </div>
    )
}