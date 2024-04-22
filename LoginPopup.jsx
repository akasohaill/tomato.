import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState('Login')
    return (
        <div className='login-popup'>
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'Login' ? <></> : <input type="text" placeholder='Enter Name' required />}
                    <input type="email" placeholder='Enter email' required />
                    <input type="password" placeholder='Password' required />
                </div>
                <button>{currState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I am agree to the term of use & privacy policy</p>
                </div>
                {currState==='Login'?
                 <p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click Here</span></p>:
                 <p>Already have an account?<span onClick={()=>setCurrState('Login')}>Login here</span></p>}
               
                
            </form>
        </div>
    )
}

export default LoginPopup