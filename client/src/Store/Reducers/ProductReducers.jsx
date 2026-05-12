import {
  ADD_PRODUCT_RED,
  DELETE_PRODUCT_RED,
  GET_PRODUCT_RED,
  UPDATE_PRODUCT_RED
} from "../Constants"

export function ProductReducer(state = [], action) {
  switch (action.type) {

    case ADD_PRODUCT_RED:
      return [...state, action.payload]

    case GET_PRODUCT_RED:
      return action.payload || []

    case UPDATE_PRODUCT_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      )

    case DELETE_PRODUCT_RED:
      return state.filter(
        (item) => item._id !== action.payload._id
      )

    default:
      return state
  }
}