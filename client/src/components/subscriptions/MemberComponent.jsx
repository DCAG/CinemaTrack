import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MoviesWatchedComponent from './MoviesWatchedComponent'

function MemberComponent({id}) {
  const member = useSelector(store=>store.members.find(member=>member._id===id))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleEdit = () => {
    navigate('edit')
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
    <div>
        <h1>{member.fullName}</h1>
        <br />
        Email: {member.email} <br />
        City: {member.city} <br />
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <br />
        <MoviesWatchedComponent subscriptions={member.subscriptions?.movies} />
    </div>
  )
}

export default MemberComponent