import * as actionTypes from '../actions/types';

const initialState = {
  fact: null,
  sections: [],
  actionTypes: [],
  lastUpdatedDate: null
};

export default function staticInfo(state = initialState, action = {}) {
  if (action.type == actionTypes.OPEN_APP ||
      action.type == actionTypes.LOGIN ||
      action.type == actionTypes.SIGNUP) {
    return {
      ...state,
      fact: action.fact,
      sections: action.sections,
      actionTypes: action.actionTypes,
      lastUpdatedDate: new Date()
    };
  }
  else {
    return state;
  }
}
