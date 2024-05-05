import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const USERS_CREATE_URL = 'http://localhost:3001/auth/createaccount'

function CreateAccountPage() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleCreate = async () => {
        try{
            const body = {
                username: username,
                password: password
            }
            const {data} = await axios.post(USERS_CREATE_URL,body)
            alert(JSON.stringify(data))
            navigate('/') // redirect to login page
        }
        catch(error){
            const errorMessage = JSON.stringify(error.response?.data)
            alert(errorMessage??'Account creation failed. Contact the sysadmin.')
            console.error('account creation failed',error)
        }
    }
    return (
    <div>
        <h1>
            Create an Account
        </h1>
        Username: <input type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} placeholder='username given by the sysadmin'/> <br />
        Password: <input type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='new password' /> <br />
        <button onClick={handleCreate}>Create</button> <br />
    </div>
    )
}

export default CreateAccountPage
