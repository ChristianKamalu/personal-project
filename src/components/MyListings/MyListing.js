import React from 'react';
import './MyListings.css';

export default function MyListing (props) {

    return props.state.createListing ? (
        <div className='listing-display-component' style={props.state.displayListing ? {display: 'flex', justifyContent:'center'} : {display: 'none'}}>
            <div className='empty-space' onClick={props.toggleDisplay}/>
            <div className='listing-display-container'>
                <div className='edit-section-container'>
                    <img src={props.state.image} alt={props.state.title} width='40%'/>
                    <p>Image: <br/><input className='edit-create-input' placeholder='image' name='image' onChange={e => props.setValue(e.target)}/></p>
                    <p style={{marginTop: '1rem'}}>Title: <br/><input className='edit-create-input' placeholder='title' name='title' value={props.state.title} onChange={e => props.setValue(e.target)}/></p>
                    <p>ISBN: <br/><input className='edit-create-input' placeholder='ISBN' type='number' name='ISBN' value={props.state.ISBN} onChange={e => props.setValue(e.target)}/></p>
                    <p>Condition: <br/><input className='edit-create-input' placeholder='condition' name='condition' value={props.state.condition} onChange={e => props.setValue(e.target)}/></p>
                    <p>Price: <br/>$<input className='price-input' placeholder='price' type='number' name='price' value={props.state.price} onChange={e => props.setValue(e.target)}/></p>
                    <div>
                        <button style={{width: '100%'}} onClick={props.createListing}>Create Listing</button>
                    </div>
                </div>
            </div>
        </div>
    ) : props.state.editListing ? (
        <div className='listing-display-component' style={props.state.displayListing ? {display: 'flex', justifyContent:'center'} : {display: 'none'}}>
            <div className='empty-space' onClick={props.toggleDisplay}/>
            <div className='edit-container'>
                <div className='edit-section-container'>
                    <img src={props.state.image} alt={props.state.title} width='40%'/>
                    <p>Image: <br/><input className='edit-create-input' placeholder='image' name='image' value={props.state.image} onChange={e => props.setValue(e.target)}/></p>
                    <p style={{marginTop: '1rem'}}>Title: <br/><input className='edit-create-input' placeholder='title' name='title' value={props.state.title} onChange={e => props.setValue(e.target)}/></p>
                    <p>ISBN: <br/><input className='edit-create-input' placeholder='ISBN' name='ISBN' type='number' value={props.state.ISBN} onChange={e => props.setValue(e.target)}/></p>
                    <p>Condition: <br/><input className='edit-create-input' placeholder='condition' name='condition' value={props.state.condition} onChange={e => props.setValue(e.target)}/></p>
                    <p>Price: <br/>$<input  className='price-input' placeholder='price' name='price' type='number' value={props.state.price} onChange={e => props.setValue(e.target)}/></p>
                </div>
                <div>
                    <button onClick={props.editListing}>Update Listing</button>
                    <button onClick={props.toggleEdit}>Cancel</button>
                </div>
            </div>
        </div>
    ) : (
        <div className='listing-display-component' style={props.state.displayListing ? {display: 'flex', justifyContent:'center'} : {display: 'none'}}>
            <div className='empty-space' onClick={props.toggleDisplay}/>
            <div className='listing-display-container'>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={props.state.targetListing.image} alt={props.state.targetListing.title} width='40%'/>
                    <div>
                        <h4 style={{marginTop: '1rem'}}>{props.state.targetListing.title}</h4>
                        <p>ISBN: <br/>{props.state.targetListing.isbn}</p>
                        <p>Condition: <br/>{props.state.targetListing.condition}</p>
                        <p>Price: <br/>${props.state.targetListing.price}</p>
                    </div>
                    <div>
                        <button onClick={props.toggleEdit}>Edit Listing</button>
                        <button 
                            onClick={props.deleteListing}>
                            Delete Listing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}