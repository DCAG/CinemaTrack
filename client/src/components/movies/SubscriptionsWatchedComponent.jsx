import React from 'react'
import { Link } from 'react-router-dom'

function SubscriptionsWatchedComponent({subscriptions}) {
  return (
    <div className='subscriptionswatched-component'>
      <h4>
        Subscriptions watched
      </h4>
      <ul>
        {
          subscriptions?.map(sub => {
            return (
              <li key={sub._id}>
                {/*
                NOTE:
                Instruction: ...click on the Subscriber link will redirect to the “Member” page...
                Interpretation: There is no "Member Page", so its either "EditMember Page" or present the member in "All Members Page". I chose the 2nd option.
                 */}
                <Link to={`/main/subscriptions/#${sub.member._id}`}>{sub.member.name}</Link>
                {', ' + sub.date.replace(/T.*Z$/,'')}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default SubscriptionsWatchedComponent