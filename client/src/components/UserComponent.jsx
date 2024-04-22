import React from 'react'

//TODO: handle and move to redux
const USER_URL = 'http://localhost:3001/users'

function UserComponent(user) {
  const handleEdit = () => {

  } 
  
  const handleDelete = () => {

  }

  return (
    <div>
        Name: {user.name} <br />
        Username: {user.username} <br />
        Session Timeout: {user.sessionTimeout} <br />
        Created Date: {user.createdDate} <br />
        Permissions: {user.permissions.join(',')} <br />
        <br />
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default UserComponent