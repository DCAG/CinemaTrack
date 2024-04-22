import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import CreateAccountPage from './pages/CreateAccountPage'
import MainPage from './pages/MainPage'
import UsersPage from './pages/UsersPage'
import ManageUsersPage from './pages/ManageUsersPage'
import MoviesPage from './pages/MoviesPage'
import AllMoviesPage from './pages/AllMoviesPage'
import AddMoviePage from './pages/AddMoviePage'
import EditMoviePage from './pages/EditMoviePage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import AllMembersPage from './pages/AllMembersPage'
import AddMemberPage from './pages/AddMemberPage'
import EditMemberPage from './pages/EditMemberPage'
import AddUserPage from './pages/AddUserPage'
import EditUserPage from './pages/EditUserPage'
import AllUsersPage from './pages/AllUsersPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/createaccount' element={<CreateAccountPage />} />
        <Route path='/main' element={<MainPage />}>
          <Route path='movies' element={<MoviesPage />} >
            <Route path='all' element={<AllMoviesPage />} />
            <Route path='add' element={<AddMoviePage />} />
            <Route path='edit' element={<EditMoviePage />} />
          </Route>
          <Route path='subscriptions' element={<SubscriptionsPage />} >
            <Route path='allmembers' element={<AllMembersPage />} />
            <Route path='addmember' element={<AddMemberPage />} />
            <Route path='editmember' element={<EditMemberPage />} />
          </Route>
          <Route path='users' element={<UsersPage />}>
            <Route path='all' element={<AllUsersPage />} />
            <Route path='add' element={<AddUserPage />} />
            <Route path='edit' element={<EditUserPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
