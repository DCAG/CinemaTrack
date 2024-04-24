import React, {useState} from 'react'

function MoviesWatchedComponent({movies}) {
    const [showDialog, setShowDialog] = useState(false)
    const handleSubscribe = () => {
        setShowDialog(previous => !previous)
    }
  return (
    <div>
        <h2>Movies Watched</h2>
        <button onClick={handleSubscribe}>Subscribe to new movie</button>
        <br />
        <div style={showDialog??{display:none}}>
            <NewMovieWatchedComponent watched={movies}/>
        </div>
        <ul>
            {
                movies.map(movie => {
                    return (
                        <li key={movie.id}><Link to={movie.id}>{movie.name}</Link> {' , '+movie.date}</li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default MoviesWatchedComponent