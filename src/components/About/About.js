import React from 'react';
import './About.css';

export default function About (props) {

    return (
        <div style={{width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className='our-goal-container'>
                <img className='our-goal-picture' src='https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80' alt='college students'/>

                <div className='our-goal-text'>
                    <h2>Back Story</h2>
                    <p>College. A chance to expand horizons, learn new concepts, and build opportunities. Unfortunately, all of this comes at a price. Trust us, we know. With the goal of reducing study costs, we set off to create an application to give back to students.</p>
                </div>
            </div>
            <div className='next-container' style={{backgroundColor: 'lightgrey'}}>
                <div className='our-goal-text'>
                    <h2>Mission Statement</h2>
                    <p>Shrubs was created to give all students, both current and previous, the ability to create personalized listings in order to purchase from and sell used textbooks to each other at a significantly lower price.</p>
                </div>

                <img className='our-goal-picture' src='https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80' alt='college students'/>
            </div>
        </div>
    )
}