import AV, { User } from 'leancloud-storage'
import * as setting from './setting.api'

let currentUser = null

/**
 * Get logined user
 * @return {Promise} resolve with logined user if user has logined.
 */
export function current () {
  currentUser = User.current()

  window.User = User
  if (currentUser === null) {
    return Promise.resolve({ authenticated: false })
  } else {
    return new Promise((resolve, reject) => {
      currentUser.isAuthenticated()
        .then((authenticated) => {
          if (authenticated) {
            resolve({
              authenticated: true,
              ...currentUser.toJSON()
            })
          } else {
            resolve({
              authenticated: false
            })
          }
        })
        .catch(reject)
    })
  }
}

/**
 * Login user
 * @param {*} username
 * @param {*} password
 * @return {Promise} fullfill with logined user
 */
export function login (username, password) {
  return new Promise((resolve, reject) => {
    User.logIn(username, password)
      .then((loginedUser) => {
        currentUser = loginedUser
        resolve({
          authenticated: true,
          ...loginedUser.toJSON()
        })
      })
      .catch(reject)
  })
}

/**
 * Register user
 * @param {*} email
 * @param {*} username
 * @param {*} password
 * @param {*} nickname
 * @return {Promise} fullfill with logined user
 */
export function register (email, username, password, nickname) {
  let user = new AV.User()

  user.setEmail(email)
  user.setPassword(password)
  user.setUsername(username)

  return new Promise((resolve, reject) => {
    user.signUp()
      .then((registedUser) => {
        registedUser.set('setting', setting.create())
        registedUser.save()

        resolve({
          ...registedUser.toJSON()
        })
      })
      .catch(reject)
  })
}

export function logOut () {
  AV.User.logOut()
}
