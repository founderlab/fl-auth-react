// import request from 'axios'
import request from 'superagent'

export function register(email, password) {
  return {
    type: 'LOGIN',
    request: request.post('/register').send({email, password, login: email}),
  }
}

export function login(email, password) {
  return {
    type: 'LOGIN',
    request: request.post('/login').send({email, password, login: email}),
  }
}

export function logout() {
  return {
    type: 'LOGOUT',
    payload: {},
  }
}

export default {register, login, logout}
