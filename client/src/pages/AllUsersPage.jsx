import React from 'react'

function AllUsersPage(users) {
    return (
    <div>
        {
            users.map(user => {
                return (
                    <UserComponent user={user} />
                )
            })
        }
    </div>
    )
}

export default AllUsersPage
