import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../utils/useAuth'

import { useDispatch } from 'react-redux'
import {fetchMovies, fetchMembers, fetchUsers, fetchSubscriptions} from '../redux/reducer.js'


const LOGIN_URL = 'http://localhost:3001/auth/login'

function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loginUser} = useAuth()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async () => {
      const loginData = {
          username: username,
          password: password
      }

      try {
        const {data} = await axios.post(LOGIN_URL, loginData)
        console.log("login successful.",data)
        loginUser(data.accessToken, data.user.username, data.user.firstName, JSON.stringify(data.user.permissions))
        dispatch(fetchMovies)
        dispatch(fetchMembers)
        dispatch(fetchUsers)
        dispatch(fetchSubscriptions)
        
        navigate('/main')
      }catch(error){
        console.log(error)
        alert(error.response?.data??error)
      }
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
