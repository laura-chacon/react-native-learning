import * as actionTypes from '../actions/types';

const initialState = {
  history: [],
  score: null,
  nextActionId: null
};

export default function user(state = initialState, action = {}) {
  if (action.type == actionTypes.LOGIN ||
      action.type == actionTypes.ADD_ACTION ||
      action.type == actionTypes.SIGNUP) {
    return {
        ...state,
        nextActionId: action.nextActionId,
        history: action.history
    };
  }
  else if (action.type == actionTypes.OPEN_APP) {
    return {
      ...state,
      history: action.history
    };
  }
  else {
    return state;
  }
}
