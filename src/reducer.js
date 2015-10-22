import Immutable from 'immutable'

const default_state = new Immutable.Map()

export default function authReducer(state=default_state, action={}) {

  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return state.merge({loading: true, login_error: null, register_error: null})

    case 'LOGIN_ERROR':
      return state.merge({loading: false, register_error: null, login_error: action.error || action.res.body.error})
    case 'REGISTER_ERROR':
      return state.merge({loading: false, login_error: null, register_error: action.error || action.res.body.error})

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return state.merge({loading: false, login_error: null, register_error: null, email: action.res.body.user.email})

    case 'LOGOUT':
      return new Immutable.Map()

    default:
      return state

  }
}
