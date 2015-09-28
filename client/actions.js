// import request from 'axios'
import request from 'superagent'

export function register(email, password) {
  return dispatch => {
    dispatch({type: 'REGISTER_START'})

    request.post('/register').send({email, password}).end((err, res) => {
      const error = err || res.body.error
      if (error) return dispatch({res, error, type: 'REGISTER_ERROR'})

      dispatch({res, type: 'REGISTER_SUCCESS'})
    })
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch({type: 'LOGIN_START'})

    request.post('/login').send({email, password}).end((err, res) => {
      const error = err || res.body.error
      if (error) return dispatch({res, error, type: 'LOGIN_ERROR'})

      dispatch({res, type: 'LOGIN_SUCCESS'})
    })
  }
}

export function logout() {
  return {
    type: 'LOGOUT',
    payload: {},
  }
}

export default {register, login, logout}
