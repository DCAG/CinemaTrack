import React from 'react'
import { useSelector } from 'react-redux'
import UserComponent from '../../components/users/UserComponent'

function AllUsersPage() {
		const users = useSelector(store => store.users)
    return (
    <div>
			<h1>hello</h1>
        {
            users.map((user,index) => {
                return (
                    <UserComponent key={index} user={user} />
                )
            })
        }
    </div>
    )
}

export default AllUsersPage
