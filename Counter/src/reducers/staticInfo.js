import * as actionTypes from '../actions/types';

const initialState = {
  fact: null,
  sections: [],
  actionTypes: [],
  lastUpdatedDate: null
};

export default function staticInfo(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.OPEN_APP:
      return {
        ...state,
        fact: action.fact,
        sections: action.sections,
        actionTypes: action.actionTypes
      };
    case actionTypes.LOGIN:
     return {
       ...state,
       fact: action.fact,
       sections: action.sections,
       actionTypes: action.actionTypes
     };
    case actionTypes.SIGNUP:
      return {
        ...state,
        fact: action.fact,
        sections: action.sections,
        actionTypes: action.actionTypes
      };
    default:
      return state;
  }
}
