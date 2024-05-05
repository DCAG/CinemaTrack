import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { userUpdate } from '../../redux/reducer'
import {
    convertPermissionsFromList,
    convertPermissionsToList,
    calculatePermissionsDependencies
} from '../../utils/permissions'

function EditUserPage() {
    const {id: userId} = useParams()
    // TODO: check if selector can be simpler and the page without useEffect now with new redux implementations
    const storeUser = useSelector(store => store.users.find(user => user._id === userId))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({firstName: '', lastName: '', username: '', sessionTimeout: 0, createdDate:'', permissions: [] /* the 'permissions' state is used for user input */})
    const [permissions,setPermissions] = useState({})

    useEffect(()=>{
        setUser(previous => storeUser??previous)
        setPermissions(convertPermissionsFromList(storeUser?.permissions??{}))
    },[storeUser])

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
        setUser(previous => { return {...previous, [name]: value}})
    }

    const handleUpdate = () => {
        dispatch(userUpdate(userId,{...user, permissions: convertPermissionsToList(permissions)}))
        navigate('../')
    }

    const handleCancel = () => {
        navigate('../')
    }

    return (
    <div>
        <h2>
            Edit User: {user.firstName+' '+user.lastName}
        </h2>
        <div className='user-form'>
            <label>First Name:</label> <input type="text" name="firstName" value={user?.firstName} onChange={handleChange} /> <br />
            <label>Last Name:</label> <input type="text" name="lastName" value={user?.lastName} onChange={handleChange} /> <br />
            <label>Username:</label> <input type="text" name="username" value={user?.username} onChange={handleChange} /> <br />
            <label>Session Timeout (Minutes):</label> <input type="number" name="sessionTimeout" value={user?.sessionTimeout} onChange={handleChange} /> <br />
            <label>Created Date:</label> {user?.createdDate} <br />
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
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    </div>
    )
}

export default EditUserPage
