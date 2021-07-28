import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import './Login.css'

import { login } from '../../actions/auth'

const initialState = { username: '', password: '' }

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        dispatch(login(formData, history))
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <form className="login-form" onSubmit={handleSubmit} >
            <div className="login-box">
                <div className="dim-bg"></div>
                <h2>CampA</h2>
                <input className="input-field" type="text" name="username" id="username" placeholder="Username" onChange={handleChange} />
                <input className="input-field" type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />                
                    
                <button className="submit-btn" type="submit">Log In</button>
            </div>
        </form>
    )
}

export default Login