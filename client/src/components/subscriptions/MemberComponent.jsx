import React from 'react'

function MemberComponent({member}) {
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate('edit')
  }
  const handleDelete = () => {
    
  }
  return (
    <div>
        <h1>{member.fullName}</h1>
        <br />
        Email: {member.email} <br />
        City: {member.city} <br />
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <br />
        <MoviesWatchedComponent movies={member.movies} />
    </div>
  )
}

export default MemberComponent