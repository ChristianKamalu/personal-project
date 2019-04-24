import React from 'react';
// import {Link} from 'react-router-dom';

export default function MyListing (props) {

    return props.state.createListing ? (
        <div className='listing-display-component' style={props.state.displayListing ? {display: 'flex', justifyContent:'center'} : {display: 'none'}}>
            <div className='empty-space' onClick={props.toggleDisplay}/>
            <div className='listing-display-container'>
                <div>
                    <img src={props.state.image} alt={props.state.title} width='300px'/>
                    <p>Image: <br/><input placeholder='image' name='image' onChange={e => props.setValue(e.target)}/></p>
                    <p style={{marginTop: '1rem'}}>Title: <br/><input placeholder='title' name='title' value={props.state.title} onChange={e => props.setValue(e.target)}/></p>
                    <p>ISBN: <br/><input placeholder='ISBN' name='ISBN' value={props.state.ISBN} onChange={e => props.setValue(e.target)}/></p>
                    <p>Condition: <br/><input placeholder='condition' name='condition' value={props.state.condition} onChange={e => props.setValue(e.target)}/></p>
                    <p>Price: <br/>$<input placeholder='price' name='price' value={props.state.price} onChange={e => props.setValue(e.target)}/></p>
                    <div>
                        <button onClick={props.createListing}>Create Listing</button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='listing-display-component' style={props.state.displayListing ? {display: 'flex', justifyContent:'center'} : {display: 'none'}}>
            <div className='empty-space' onClick={props.toggleDisplay}/>
            <div className='listing-display-container'>
                <img src={props.state.targetListing.image} alt={props.state.targetListing.title} width='300px'/>
                <div>
                    <h4 style={{marginTop: '1rem'}}>{props.state.targetListing.title}</h4>
                    <p>ISBN: <br/>{props.state.targetListing.isbn}</p>
                    <p>Condition: <br/>{props.state.targetListing.condition}</p>
                    <p>Price: <br/>${props.state.targetListing.price}</p>
                    <div>
                        <button>Update Listing</button>
                        <button>Delete Listing</button>
                    </div>
                </div>
            </div>
        </div>
    )
}