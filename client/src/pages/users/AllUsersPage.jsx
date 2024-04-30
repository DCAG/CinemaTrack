import React from 'react'
import { useSelector } from 'react-redux'
import UserComponent from '../../components/users/UserComponent'

function AllUsersPage() {
	  const usersIds = useSelector(store => store.users?.map(user=>user._id))
    return (
    <div className='main-pages'>
        {
            usersIds.map((userId) => {
                return (
                    <UserComponent key={userId} id={userId} />
                )
            })
        }
    </div>
    )
}

export default AllUsersPage
