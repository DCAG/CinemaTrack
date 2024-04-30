import React from 'react'
import { useSelector } from 'react-redux'
import MemberComponent from '../../components/subscriptions/MemberComponent'
import { selectMembersIdsNames } from '../../redux/reducer'

function AllMembersPage() {
    const membersIds = useSelector(selectMembersIdsNames)
    
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
