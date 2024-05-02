import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDelete } from '../../redux/reducer'
function UserComponent({id}) {
  const user = useSelector(store=>store.users.find(user=>user._id===id))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`${user._id}/edit`)
  } 
  
  const handleDelete = () => {
    dispatch(userDelete(id))
    navigate('.')
  }

  if(!user){
    return <div></div>
  }
  return (
    <div className='user-component user-form'>
        <label>Name:</label> {user.firstName +' '+user.lastName} <br />
        <label>Username:</label> <b>{user.username}</b> <br />
        <label>Session Timeout (Minutes):</label> {user.sessionTimeout} <br />
        <label>Created Date:</label> {user.createdDate} <br />
        <label>Permissions:</label> {user.permissions?.join(', ')} <br />
        <br />
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default UserComponent