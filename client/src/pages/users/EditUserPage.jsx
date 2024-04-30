import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const PERMISSIONS_LIST = [
    'View Subscriptions',
    'Create Subscriptions',
    'Delete Subscriptions',
    'Update Subscriptions',
    'View Movies',
    'Create Movies',
    'Delete Movies',
    'Update Movies'
]

function EditUserPage() {
    const {id: userId} = useParams()
    const users = useSelector(store => store.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({firstName: '', lastName: '', username: '', sessionTimeout: 0, createdDate:'', permissions: [] /* the 'permissions' state is used for user input */})
    const [permissions,setPermissions] = useState({})
    const convertPermissionsFromList = (permissionsList) => {
        let result = {}
        PERMISSIONS_LIST.forEach(item => {result[item] = Array.isArray(permissionsList) && permissionsList.includes(item)})
        return result
    }
    const convertPermissionsToList = (permissionsObject) => {
        return PERMISSIONS_LIST.filter(permission => permissionsObject[permission])
    }

    useEffect(()=>{
        let tempUser = users.find(user => user._id === userId)
        setUser(previous => tempUser??previous)
        setPermissions(convertPermissionsFromList(tempUser?.permissions??{}))
    },[users])
    const handleCheck = (e) => {
        // dependency is for viewing purposes. This will be be enforced on the server side as well.
        let dependency = {}
        if(['Create Subscriptions','Update Subscriptions','Delete Subscriptions'].includes(e.target.name) && e.target.checked){            
            dependency = {'View Subscriptions': true}
        }
        else if(['Create Movies','Update Movies','Delete Movies'].includes(e.target.name) && e.target.checked ){
            dependency = {'View Movies': true}
        }
        setPermissions(previous => {return {
            ...previous,
            ...dependency,
            [e.target.name]:e.target.checked
        }})
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUser(previous => { return {...previous, [name]: value}})
    }

    const handleUpdate = () => {
        //TODO: verify handleUpdate works
        dispatch({type: 'USER_UPDATE', payload: {...user, permissions: convertPermissionsToList(permissions)}})
        // redirect to all users
        navigate('../')
    }

    const handleCancel = () => {
        // redirect to all users
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
