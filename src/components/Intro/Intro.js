import React from 'react';
import './Intro.css'
import Carousel from 'react-bootstrap/Carousel';

export default function Intro() {
    return(
        <div className='main-container'>
            <hr/>
            <h1 className='how-it-works'>- HOW IT WORKS -</h1>
            <hr/>
            {/* <div style={{display: 'flex'}}>
                <h2 style={{color: 'green'}}>BUY</h2>
                <h2>&</h2>
                <h2 style={{color: 'orangered'}}>SELL</h2>
            </div> */}
            <Carousel
                className='carousel'
                interval={3000}
            >
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1464747108843-cec40b4f0157?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
                    alt="First slide"
                    />
                    <Carousel.Caption
                        className='carousel-caption'
                    >
                        <h3 className="title">First slide label</h3>
                        <p style={{marginBottom: 0}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1455287137723-7974edb0c07e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
                    alt="First slide"
                    />
                    <Carousel.Caption
                        className='carousel-caption'
                    >
                        <h3 className='title'>First slide label</h3>
                        <p style={{marginBottom: 0}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1497941818502-94b842b7ec0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1403&q=80"
                    alt="First slide"
                    />
                    <Carousel.Caption
                        className='carousel-caption'
                    >
                        <h3 className="title">First slide label</h3>
                        <p style={{marginBottom: 0}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            {/* <h2 style={{color: 'orangered'}}>SELL</h2>
            <div className='all-directions-container'>
                    <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=First slide&bg=373940"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                <div className="d-block w-100">
                    <div className='circle'></div>
                    <p>lorem alkdfj ;alskdfj a;lskd ;alskd f;laskf ;aslkf ;lkd fl s fs flks jforeu ghruigj dnfvndfjksvn kljndf jknfkjns</p>
                </div>
                <div className="d-block w-100">
                    <div className='circle'></div>
                    <p>lorem alkdfj ;alskdfj a;lskd ;alskd f;laskf ;aslkf ;lkd fl s fs flks jforeu ghruigj dnfvndfjksvn kljndf jknfkjns</p>
                </div>
                <div className="d-block w-100">
                    <div className='circle'></div>
                    <p>lorem alkdfj ;alskdfj a;lskd ;alskd f;laskf ;aslkf ;lkd fl s fs flks jforeu ghruigj dnfvndfjksvn kljndf jknfkjns</p>
                </div>
            </div>
            <h2 style={{color: 'green'}}>BUY</h2>
            <div className='all-directions-container'>
                <div className="d-block w-100">
                    <div className='circle'></div>
                    <p>lorem alkdfj ;alskdfj a;lskd ;alskd f;laskf ;aslkf ;lkd fl s fs flks jforeu ghruigj dnfvndfjksvn kljndf jknfkjns</p>
                </div>
                <div className="d-block w-100">
                    <div className='circle'></div>
                    <p>lorem alkdfj ;alskdfj a;lskd ;alskd f;laskf ;aslkf ;lkd fl s fs flks jforeu ghruigj dnfvndfjksvn kljndf jknfkjns</p>
                </div>
                <div className="d-block w-100">
                    <div className='circle'></div>
                    <p>lorem alkdfj ;alskdfj a;lskd ;alskd f;laskf ;aslkf ;lkd fl s fs flks jforeu ghruigj dnfvndfjksvn kljndf jknfkjns</p>
                </div>
                <div className="d-block w-100">
                    <div className='circle'></div>
                    <p>lorem alkdfj ;alskdfj a;lskd ;alskd f;laskf ;aslkf ;lkd fl s fs flks jforeu ghruigj dnfvndfjksvn kljndf jknfkjns</p>
                </div>
            </div> */}
        </div>
    )
}
