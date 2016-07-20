import * as actionTypes from '../actions/types';

const initialState = {
  history: [],
  score: null,
  nextActionId: null
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
          ...state,
          nextActionId: action.nextActionId,
          history: action.history
      };

    case actionTypes.ADD_ACTION:
      return {
        ...state,
        nextActionId: action.nextActionId
      };
    default:
      return state;
  }
}
