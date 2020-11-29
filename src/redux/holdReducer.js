const initialState = {
    holds: []
}

const GET_HOLDS = "GET_HOLDS"

export function getHolds(hold){
    return {
        type: GET_HOLDS,
        payload: hold
    }
}

export default function holdReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
      case GET_HOLDS:
        return { ...state, holds: payload }
      default:
        return state
    }
  }
    