const initialState = {
    users: []
}

const GET_USERS = "GET_USERS"

export function getUsers(user){
    return {
        type: GET_USERS,
        payload: user
    }
}

export default function userReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
      case GET_USERS:
        return { ...state, users: payload }
      default:
        return state
    }
  }