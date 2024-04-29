import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import MemberComponent from '../../components/subscriptions/MemberComponent'

function AllMembersPage() {
    const membersIds = useSelector(store => store.members.map(member => member._id), shallowEqual)
    
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
