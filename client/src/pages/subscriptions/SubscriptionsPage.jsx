import React from 'react'
import { Outlet } from 'react-router-dom'

function SubscriptionsPage() {
    return (
    <div>
        <h1>
            Subscriptions
        </h1>
        <Link to='.'>All Members</Link>
        <Link to='add'>Add Member</Link>
        <Outlet />
    </div>
    )
}

export default SubscriptionsPage
