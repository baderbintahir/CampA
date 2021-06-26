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
                <h2>Log In</h2>
                <input type="text" name="username" id="username" placeholder="Username" onChange={handleChange} />
                <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />                
                    
                <button type="submit">Log In</button>
            </div>
        </form>
    )
}

export default Login