import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [
                'http://mediad.publicbroadcasting.net/p/kera/files/styles/medium/public/201409/texas_textbooks.jpg',
                'https://members1sttest.files.wordpress.com/2014/08/textbooks.jpg'
            ]
        }
    }

    carousel = () => {
        let pics = this.state.pictures
        for (let i = 0; i < pics; i++) {
            
        }
    }

    render() {
        return(
            <div>
                <div>
                    <div style={{backgroundImage: `url(${this.carousel})`}}></div>
                </div>
                <div className='right-side-container'>
                    <div className='login-container'>
                        <input placeholder='email'/>
                        <p>Email</p>
                        <input placeholder='password'/>
                        <p>Password</p>
                        <button>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login