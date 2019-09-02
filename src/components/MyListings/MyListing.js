import React from 'react';
import './MyListings.css';

export default function MyListing (props) {

    return props.state.createListing ? (
        <div className='listing-display-component' style={props.state.displayListing ? {display: 'flex', justifyContent:'center'} : {display: 'none'}}>
            <div className='empty-space' onClick={props.toggleDisplay}/>
            <div className='listing-display-container'>
                    <img src={props.state.image} alt={props.state.title} width='40%'/>
                <div className='edit-section-container'>
                    <i className="fas fa-times exit" onClick={props.toggleDisplay}></i>
                    <p>Image: <br/><input className='edit-create-input' placeholder='image' name='image' onChange={e => props.setValue(e.target)}/></p>
                    <p style={{marginTop: '1rem'}}>Title: <br/><textarea className='edit-create-input' placeholder='title' name='title' value={props.state.title} onChange={e => props.setValue(e.target)}/></p>
                    <br/>
                    <p>ISBN: <br/><input className='edit-create-input' placeholder='ISBN' type='number' name='ISBN' value={props.state.ISBN} onChange={e => props.setValue(e.target)}/></p>
                    <br/>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <p>Department:
                            <br/>
                            <select name='department' onChange={e => props.setValue(e.target)}>
                                <option value='Agriculture and Life Sciences'>Agriculture and Life Sciences</option>
                                <option value='Business'>Business</option>
                                <option value='Design'>Design</option>
                                <option value='Engineering'>Engineering</option>
                                <option value='English'>English</option>
                                <option value='Graduate'>Graduate</option>
                                <option value='Human Sciences'>Human Sciences</option>
                                <option value='Language Arts'>Language Arts</option>
                                <option value='Liberal Arts and Sciences'>Liberal Arts and Sciences</option>
                                <option value='Mathematics'>Mathematics</option>
                                <option value='Medicine'>Medicine</option>
                                <option value='Other'>Other</option>
                            </select>    
                        </p>
                        <p>Condition: 
                            <br/>
                            <select name='condition' onChange={e => props.setValue(e.target)}>
                                <option value='Poor'>Poor</option>
                                <option value='Acceptable'>Acceptable</option>
                                <option value='Excellent'>Excellent</option>
                            </select>
                        </p>
                    </div>
                    <br/>
                    <p>Description:
                        <br/>
                        <textarea className='edit-create-input' placeholder='description' name='description' value={props.state.description} onChange={e => props.setValue(e.target)}/>
                    </p>
                    <br/>
                    <p>Price: 
                        <br/>$
                        <input className='price-input' placeholder='price' type='number' name='price' value={props.state.price} onChange={e => props.setValue(e.target)}/>
                    </p>
                    <br/>
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
                    <i className="fas fa-times exit" onClick={props.toggleDisplay}></i>
                    <img src={props.state.image} alt={props.state.title} width='40%'/>
                    <p>Image: <br/><input className='edit-create-input' placeholder='image' name='image' value={props.state.image} onChange={e => props.setValue(e.target)}/></p>
                    <p style={{marginTop: '1rem'}}>Title: <br/><input className='edit-create-input' placeholder='title' name='title' value={props.state.title} onChange={e => props.setValue(e.target)}/></p>
                    <p>ISBN: <br/><input className='edit-create-input' placeholder='ISBN' name='ISBN' type='number' value={props.state.ISBN} onChange={e => props.setValue(e.target)}/></p>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <p>Department:
                            <br/>
                            <select value={props.state.department} name='department' onChange={e => props.setValue(e.target)}>
                                <option value='Agriculture and Life Sciences'>Agriculture and Life Sciences</option>
                                <option value='Business'>Business</option>
                                <option value='Design'>Design</option>
                                <option value='Engineering'>Engineering</option>
                                <option value='English'>English</option>
                                <option value='Graduate'>Graduate</option>
                                <option value='Human Sciences'>Human Sciences</option>
                                <option value='Language Arts'>Language Arts</option>
                                <option value='Liberal Arts and Sciences'>Liberal Arts and Sciences</option>
                                <option value='Mathematics'>Mathematics</option>
                                <option value='Medicine'>Medicine</option>
                            </select>    
                        </p>
                        <p>Condition: 
                            <br/>
                            <select value={props.state.condition} name='condition' onChange={e => props.setValue(e.target)}>
                                <option value='Poor'>Poor</option>
                                <option value='Acceptable'>Acceptable</option>
                                <option value='Excellent'>Excellent</option>
                            </select>
                        </p>
                    </div>
                    <p>Description:
                        <br/>
                        <textarea className='edit-create-input' placeholder='description' name='description' value={props.state.description} onChange={e => props.setValue(e.target)}/>
                    </p>    
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
                    <i className="fas fa-times exit" onClick={props.toggleDisplay}></i>
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