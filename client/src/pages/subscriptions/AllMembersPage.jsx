import React from 'react'
import { useSelector } from 'react-redux'
import MemberComponent from '../../components/subscriptions/MemberComponent'
import { selectMembersIds } from '../../redux/reducer'

function AllMembersPage() {
    const membersIds = useSelector(selectMembersIds)
    
    return (
    <div>
      {
        membersIds.map(id => {
            return <MemberComponent key={id} id={id} />
        })
      }
    </div>
    )
}

export default AllMembersPage
