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
    const [formError, setFormError] = useState('')
    
    const handleLogin = async (e) => {
      e.preventDefault()
      const loginData = {
          username: username,
          password: password
      }

      try {
        const {data} = await axios.post(LOGIN_URL, loginData)
        loginUser(data.accessToken, data.user.username, data.user.firstName, JSON.stringify(data.user.permissions))
        dispatch(fetchMovies)
        dispatch(fetchMembers)
        dispatch(fetchUsers)
        dispatch(fetchSubscriptions)
        
        navigate('/main')
      }catch(error){
        console.error(error)
        setFormError(error.response?.data?.message??error)
      }
    }

    return (
    <div className='center'>
        <h1>
            Login
        </h1>
        <form onSubmit={handleLogin} className='login-form'>
          <div className='txt_field'>
            <input type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} placeholder='Username:' required/> <br />
            <span></span>
          </div>
          <div className='txt_field'>
            <input type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password:' required/> <br />
            <span></span>
          </div>
          <input type='submit' value="Login"/> <br />
          <div className="signup_link">
            New User? <Link to="/createaccount">Create Account</Link>
          </div>
          <div className='form-error'>
            {formError}
          </div>
        </form>
    </div>
    )
}

export default LoginPage
