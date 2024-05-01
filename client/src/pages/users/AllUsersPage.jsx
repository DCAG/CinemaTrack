import React from 'react'
import { useSelector } from 'react-redux'
import UserComponent from '../../components/users/UserComponent'
import { selectUsersIds } from '../../redux/reducer'

function AllUsersPage() {
	  const usersIds = useSelector(selectUsersIds)
    
    return (
    <div>
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
