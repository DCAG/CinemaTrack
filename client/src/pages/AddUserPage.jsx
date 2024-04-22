import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

//TODO: implement map {PERMISSION:boolean} and take only the keys to the update/creation of the object.
const USER_PERMISSIONS = [
    'View Subscriptions',
    'Create Subscriptions',
    'Delete Subscriptions',
    'Update Subscriptions',
    'View Movies',
    'Create Movies',
    'Delete Movies',
    'Update Movies'
]

function AddUserPage(params) {
    const navigate = useNavigate()
    const [user, setUser] = useState({firstName: '', lastName: '', username: '', sessionTimeout: 0, createdDate:'', permissions: []})

    useEffect(()=>{
        const init = () => {
            setUser(params.user)
        }
        init()
    },[user])

    const handleCheck = (e) => {
        //TODO: click on “Create Subscriptions” , “Update Subscriptions” and “Delete Subscriptions” 
        // options will automatically check the “View Subscriptions” checkbox
        //TODO: A click on “Create Movies” , “Update Movies” and “Delete Movies” options will automatically 
        // check the “View Movies” checkbox
        let permissions = user.permissions
        if(e.checked){
            permissions = Array.from(new Set([...previous.permissions, e.target.value]))
        }
        else{
            permissions = permissions.filter(p=>p!==e.target.value)
        }
        setUser(previous => {return {...previous,permissions: permissions}})
    }

    const handleSave = () => {
        // redirect to all users
        navigate('/')
    }

    const handleCancel = () => {
        // redirect to all users
        navigate('/')
    }

    return (
    <div>
        <h1>
            Add New User
        </h1>
        First Name: <input type="text" value={user.firstName} /> <br />
        Last Name: <input type="text" value={user.lastName} /> <br />
        Username: <input type="text" value={user.username} /> <br />
        Session Timeout (Minutes): <input type="number" value={user.sessionTimeout} /> <br />
        Permissions: <br />
        <ul>
        {
            USER_PERMISSIONS.map(p => {
                return (
                    <li key={p}>
                        <input type="checkbox" name={p} value={p} onChange={handleCheck} />
                        {p}
                    </li>
                )
            })
        }
        </ul>
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>
    )
}

export default AddUserPage
