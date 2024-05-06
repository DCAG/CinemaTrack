import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import CreateAccountPage from './pages/CreateAccountPage'
import MainPage from './pages/MainPage'
import MoviesPage from './pages/movies/MoviesPage'
import AllMoviesPage from './pages/movies/AllMoviesPage'
import AddMoviePage from './pages/movies/AddMoviePage'
import EditMoviePage from './pages/movies/EditMoviePage'
import SubscriptionsPage from './pages/subscriptions/SubscriptionsPage'
import AllMembersPage from './pages/subscriptions/AllMembersPage'
import AddMemberPage from './pages/subscriptions/AddMemberPage'
import EditMemberPage from './pages/subscriptions/EditMemberPage'
import UsersPage from './pages/users/UsersPage'
import AddUserPage from './pages/users/AddUserPage'
import EditUserPage from './pages/users/EditUserPage'
import AllUsersPage from './pages/users/AllUsersPage'

function App() {
  return (
    <>
      <h1>
        CinemaTrack - Movies Subscriptions Website
      </h1>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/createaccount' element={<CreateAccountPage />} />
        <Route path='/main' element={<MainPage />}>
          <Route path='movies' element={<MoviesPage />} >
            <Route index element={<AllMoviesPage />} />
            <Route path='add' element={<AddMoviePage />} />
            <Route path=':id/edit' element={<EditMoviePage />} />
          </Route>
          <Route path='subscriptions' element={<SubscriptionsPage />} >
            <Route index element={<AllMembersPage />} />
            <Route path='add' element={<AddMemberPage />} />
            <Route path=':id/edit' element={<EditMemberPage />} />
          </Route>
          <Route path='users' element={<UsersPage />}>
            <Route index element={<AllUsersPage />} />
            <Route path='add' element={<AddUserPage />} />
            <Route path=':id/edit' element={<EditUserPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
