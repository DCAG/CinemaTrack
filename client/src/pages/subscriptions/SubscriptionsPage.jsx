import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

function SubscriptionsPage() {
  const location = useLocation()
  
    return (
    <div>
        <h1>
            Subscriptions
        </h1>
        <nav className='main-nav'>
          <ul>
            <li className={location.pathname.endsWith('subscriptions')?'selected-link':''}>
              <Link to='.'>All Members</Link>
            </li>
            <li className={location.pathname.endsWith('add')?'selected-link':''}>
              <Link to='add'>Add Member</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
    </div>
    )
}

export default SubscriptionsPage
