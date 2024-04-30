import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MoviesWatchedComponent from './MoviesWatchedComponent'

function MemberComponent({id}) {
  const member = useSelector(store=>store.members.find(member=>member._id===id))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleEdit = () => {
    navigate(id+'/edit')
  }
  const handleDelete = () => {
    navigate('.')
  }
  if(!member){
    return <div></div>
  }
  // useEffect(() => {
  //   console.log(member.subscriptions)
  // },[member])
  return (
    <div className='member-component generic-form'>
        {/* anchor used to jump directly to member*/}
        <a id={id}><h3>{member.name}</h3></a>
        <label>Email:</label> {member.email} <br />
        <label>City:</label> {member.city} <br />
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <br /><br />
        <MoviesWatchedComponent subscriptions={member.subscriptions?.movies} />
    </div>
  )
}

export default MemberComponent