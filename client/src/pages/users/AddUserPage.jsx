import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userCreate } from '../../redux/reducer'
import {
    convertPermissionsFromList,
    convertPermissionsToList,
    calculatePermissionsDependencies
} from '../../utils/permissions'

function AddUserPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({firstName: '', lastName: '', username: '', sessionTimeout: 0, createdDate:'', permissions: [] /* the 'permissions' state is used for user input */})
    const [permissions,setPermissions] = useState({})

    useEffect(() => {
        setPermissions(convertPermissionsFromList([]))
    },[])

    const handleCheck = (e) => {
        const dependencies = calculatePermissionsDependencies(e.target.name,e.target.checked)
        setPermissions(previous => {return {
            ...previous,
            ...dependencies,
            [e.target.name]:e.target.checked
        }})
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        value=isNaN(value)?value:+value
        setUser(previous => { return {...previous, [name]: value}})
    }

    const handleSave = () => {
        dispatch(userCreate({...user, permissions: convertPermissionsToList(permissions)}))
        navigate('../')
    }

    const handleCancel = () => {
        navigate('../')
    }

    return (
    <div>
        <h2>
            Add New User
        </h2>
        <div className='user-form'>

        <label>First Name:</label> <input type="text" name="firstName" value={user?.firstName} onChange={handleChange} /> <br />
        <label>Last Name:</label> <input type="text" name="lastName" value={user?.lastName} onChange={handleChange} /> <br />
        <label>Username:</label> <input type="text" name="username" value={user?.username} onChange={handleChange} /> <br />
        <label>Session Timeout (Minutes):</label> <input type="number" name="sessionTimeout" value={user?.sessionTimeout} onChange={handleChange} /> <br />
        <label>Permissions:</label> <br />
        <div className='permissions'>
        {
            Object.keys(permissions).map(item => {
                return (
                    <label key={item}>
                        <input type="checkbox" name={item} checked={permissions[item]??false} onChange={handleCheck} />
                        {item}
                    </label>
                )
            })
        }
        </div>
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
        </div>
    </div>
    )
}

export default AddUserPage
