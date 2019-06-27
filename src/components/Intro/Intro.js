import React from 'react';
import './Intro.css'
import Carousel from 'react-bootstrap/Carousel';

export default function Intro() {
    return(
        <div className='main-container'>
            <hr/>
            <h1 className='how-it-works'>- HOW IT WORKS -</h1>
            <hr/>
            <Carousel
                className='carousel'
                interval={3000}
            >
                <Carousel.Item>
                    <div className="directions-container">
                        <div className='circle'><i className="fas fa-sign-in-alt" style={{fontSize: '5rem', color:' rgb(43, 135, 221)'}}></i></div>
                        <h3 style={{textAlign: 'center'}}>Sign In</h3>
                        <p className='instruction'><br/>(Registering is easy if you do not already have an account)</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="directions-container">
                        <div className='circle'><i className="fas fa-folder-plus" style={{fontSize: '5rem', color:' rgb(43, 135, 221)'}}></i></div>
                        <h3 style={{textAlign: 'center'}}>Create a Listing</h3>
                        <p className='instruction'><br/>Easily post your own listing for others to see</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="directions-container">
                        <div className='circle'><i className="fas fa-search" style={{fontSize: '5rem', color:' rgb(43, 135, 221)'}}></i></div>
                        <h3 style={{textAlign: 'center'}}>Browse Listings</h3>
                        <p className='instruction'><br/>Search for a book by title or ISBN</p>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
