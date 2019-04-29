import React from 'react';
import './About.css';

export default function About (props) {

    return (
        <div style={{width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className='our-goal-container'>
                <img className='our-goal-picture' src='https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80' alt='college students'/>

                <div className='our-goal-text'>
                    <h2>Mission Statement</h2>
                    <p>Shrubs was created to give students all both current and previous an option to purchase from and sell textbooks to each other.</p>
                </div>
            </div>
            <div className='next-container' style={{backgroundColor: 'lightgrey'}}>
                <div className='our-goal-text'>
                    <h2>Something Else</h2>
                    <p>Blah blah blah. Blah blah blah. Blah blah blah. Blah blah blah. Blah blah blah. Blah blah blah. Blah blah blah. Blah blah blah. </p>
                </div>

                <img className='our-goal-picture' src='https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80' alt='college students'/>
            </div>
        </div>
    )
}