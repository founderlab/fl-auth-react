import request from 'superagent'

export function register(url, email, password) {
  return {
    type: 'LOGIN',
    request: request.post(url).send({email, password}),
  }
}

export function login(url, email, password) {
  return {
    type: 'LOGIN',
    request: request.post(url).send({email, password}),
  }
}

export function logout() {
  return {
    type: 'LOGOUT',
    payload: {},
  }
}

export default {register, login, logout}
