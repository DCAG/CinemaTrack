import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LOGIN_URL = 'http://localhost:3001/auth/login'

function LoginPage() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async () => {
        const body = {
            username: username,
            password: password
        }
        const {data} = await axios(LOGIN_URL,body)
        sessionStorage['Authorization'] = data.accessToken
        navigate('/main')
    }

    return (
    <div>
        <h1>
            LoginPage
        </h1>
        Username: <input type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} /> <br />
        Password: <input type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} /> <br />
        <button onClick={handleLogin}>Login</button> <br />
        New User? <Link to="/createaccount">Create Account</Link>
    </div>
    )
}

export default LoginPage
