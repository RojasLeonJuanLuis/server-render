import React from 'react'
import App from './app'
import HomePage from './pages/home-page'
import UsersListPage from './pages/users-list-page'

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...UsersListPage,
        path: '/users'
      }

    ]
  }
]
