import React from 'react'

function AllMembersPage() {
    const members = useSelector(store => store.members)
    return (
    <div>
      {
        members.map(member => {
            return <MemberComponent member={member} />
        })
      }
    </div>
    )
}

export default AllMembersPage
