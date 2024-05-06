import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
const USERS_CREATE_URL = 'http://localhost:3001/auth/createaccount'

function CreateAccountPage() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState('')
    
    const handleCreate = async (e) => {
        e.preventDefault()
        try{
            const body = {
                username: username,
                password: password
            }
            const {data} = await axios.post(USERS_CREATE_URL,body)
            navigate('/') // redirect to login page
        }
        catch(error){
            const errorMessage = JSON.stringify(error.response?.data)
            console.error('account creation failed',error)
            setFormError(errorMessage??'Account creation failed. Contact the sysadmin.')
        }
    }
    return (
    <div className='center'>
        <h1>
            Create an Account
        </h1>
        <form onSubmit={handleCreate} className='login-form'>
          <div className='txt_field'>
            <input type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} placeholder='Username:' title='username provided by the sysadmin' required/> <br />
            <span></span>
          </div>
          <div className='txt_field'>
            <input type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='New password:' title='specify new password for your account' required/> <br />
            <span></span>
          </div>
          <input type='submit' value="Create"/> <br />
          <div className="signup_link">
            Back to <Link to="/">Login Page</Link>
          </div>
          <div className='form-error'>
            {formError}
          </div>
        </form>
    </div>
    )
}

export default CreateAccountPage
