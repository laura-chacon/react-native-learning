import * as actionTypes from '../actions/types';

export const INVALID_PASSWORD = "INVALID_PASSWORD";

const initialState = {
  isLoggedIn: false,
  isEmailRegistered: false,
  uid: null,
  email: null,
  error: null
};

export default function authentication(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.SUBMIT_EMAIL:
      return {
        ...state,
        uid: action.uid,
        isEmailRegistered: action.isEmailRegistered,
        email: action.email,
        error: null
      };
    case actionTypes.LOGIN:
      if (action.loginSuccessful) {
        return {
          ...state,
          token: action.token,
          isLoggedIn : true,
          error: null
        };
      }
      else {
        return {
          ...state,
          error: INVALID_PASSWORD
        }
      }
    case actionTypes.SIGNUP:
      return {
        ...state,
        token: action.token,
        isLoggedIn: true,
        error: null
      };
    default:
      return state;
  }
}
