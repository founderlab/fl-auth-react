import Immutable from 'immutable'

const default_state = new Immutable.Map()

export default function authReducer(state=default_state, action={}) {

  switch (action.type) {
    case 'REGISTER_START':
    case 'LOGIN_START':
      return state.delete('error').set('loading', true)

    case 'REGISTER_ERROR':
    case 'LOGIN_ERROR':
      return state.merge({loading: false, error: action.error || action.res.body.error})

    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return state.merge({loading: false, error: false, email: action.res.body.user.email})

    case 'LOGOUT':
      return state.delete('loading').delete('error').delete('email')

    default:
      return state

  }
}
