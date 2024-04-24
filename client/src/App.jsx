import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import CreateAccountPage from './pages/CreateAccountPage'
import MainPage from './pages/MainPage'
import UsersPage from './pages/users/UsersPage'
import ManageUsersPage from './pages/users/ManageUsersPage'
import MoviesPage from './pages/movies/MoviesPage'
import AllMoviesPage from './pages/movies/AllMoviesPage'
import AddMoviePage from './pages/movies/AddMoviePage'
import EditMoviePage from './pages/movies/EditMoviePage'
import SubscriptionsPage from './pages/subscriptions/SubscriptionsPage'
import AllMembersPage from './pages/subscriptions/AllMembersPage'
import AddMemberPage from './pages/subscriptions/AddMemberPage'
import EditMemberPage from './pages/subscriptions/EditMemberPage'
import AddUserPage from './pages/users/AddUserPage'
import EditUserPage from './pages/users/EditUserPage'
import AllUsersPage from './pages/users/AllUsersPage'

import { fetchData } from './utils/init.js'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    fetchData(dispatch)
  },[])

  return (
    <>
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
