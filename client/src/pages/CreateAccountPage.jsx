import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const USERS_CREATE_URL = 'http://localhost:3001/users/create'

//TODO: fix this page
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
            const {data} = await axios.put(USERS_CREATE_URL,body)
            alert(data)
            navigate('/') // redirect to login page
        }
        catch(error){
            alert('Account creation failed. Contact the sysadmin.')
            //TODO: if the username does not exist in the DB present a relevant message
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
