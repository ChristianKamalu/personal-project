import React, {Component} from 'react';
import './Login.css';
import Axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            pictures: [
                'http://mediad.publicbroadcasting.net/p/kera/files/styles/medium/public/201409/texas_textbooks.jpg',
                'https://members1sttest.files.wordpress.com/2014/08/textbooks.jpg'
            ],
            register: false,
            error: false
        }
    }

    // carousel = () => {
    //     let pics = this.state.pictures
    //     for (let i = 0; i < pics; i++) {

    //     }
    
    login = async () => {
        const {email, password} = this.state;
        const res = await Axios.post('/login', { email, password })
        if (res.data.loggedIn) this.props.history.push('/Shrubs')
        else this.setState({error: true})
    }

    register = async () => {
        const {firstName, lastName, email, password} = this.state;
        const res = await Axios.post('/register', { firstName, lastName, email, password })
        if (res.data.loggedIn) {

            this.props.history.push('/Shrubs')
        }
        else this.setState({error: true})
    }

    render() {
        return this.state.register ? (
            <div className='entire-container'>
                <div className='login-container'>
                    <input className='login-input' placeholder='Johnny'onChange={e => this.setState({firstName: e.target.value})} value={this.state.firstName}  type='text'/>
                    <p className='p'>First Name</p>
                    <input className='login-input' placeholder='Appleseed' onChange={e => this.setState({lastName: e.target.value})} value={this.state.lastName} type='text'/>
                    <p className='p'>Last Name</p>
                    <p style={this.state.error ? {display: 'flex'} : {display: 'none'}} className='error p'>Email already in use</p>
                    <input className='login-input' placeholder='email' onChange={e => this.setState({email: e.target.value})} value={this.state.email} type='text'/>
                    <p className='p'>Email</p>
                    <input className='login-input' placeholder='password' onChange={e => this.setState({password: e.target.value})} value={this.state.password} type='text'/>
                    <p className='p'>Password</p>
                    <button className='login-button' onClick={this.register}>Register</button>
                    <p className='p'>Already registered?</p>
                    <h4 className='login' onClick={() => this.setState({register: false, error: false})}>Back to login</h4>
                </div>
            </div>
        ) : this.state.error ? (
            <div className='entire-container'>
                <div className='login-container'>
                    <p className='error p'>Incorrect email and/or password</p>
                    <input className='login-input' placeholder='email' onChange={e => this.setState({email: e.target.value})} value={this.state.email} type='text'/>
                    <p className='p'>Email</p>
                    <input className='login-input' placeholder='password' onChange={e => this.setState({password: e.target.value})} value={this.state.password} type='text'/>                        
                    <p className='p'>Password</p>
                    <button className='login-button' onClick={this.login}>Login</button>
                    <p className='p'>Not yet registered?</p>
                    <h4 className='register' onClick={() => this.setState({register: true, error: false})}>register here</h4>
                </div>
            </div>
        ) : (
            <div className='entire-container'>
                <div className='login-container'>
                    <input className='login-input' placeholder='email' onChange={e => this.setState({email: e.target.value})} value={this.state.email} type='text'/>
                    <p className='p'>Email</p>
                    <input className='login-input' placeholder='password' onChange={e => this.setState({password: e.target.value})} value={this.state.password} type='text'/>                        
                    <p className='p'>Password</p>
                    <button className='login-button' onClick={this.login}>Login</button>
                    <p className='p'>Not yet registered?</p>
                    <h4 className='register' onClick={() => this.setState({register: true})}>register here</h4>
                </div>
            </div>
        )
    }
}

export default Login