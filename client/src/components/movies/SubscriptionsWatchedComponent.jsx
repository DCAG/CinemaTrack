import React from 'react'

function SubscriptionsWatchedComponent({subscriptions}) {
  return (
    <div>
      <h3>
        Subscriptions watched
      </h3>
      <br />
      <ul>
        {
          subscriptions.map(sub => {
            return (
              <li key={sub.id}>
                <Link to={`/subscriptions/:${sub.id}`}>{sub.fullName}</Link>
                {' , ' + sub.date}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default SubscriptionsWatchedComponent