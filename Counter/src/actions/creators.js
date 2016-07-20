import * as types from './types';

export function submitEmail(email) {
  let response = getUserByEmailBackendCall(email);
  if (response.users.length == 0) {
    return {
      type: types.SUBMIT_EMAIL,
      uid: response.uid,
      isEmailRegistered: false,
      email: email
    };
  }
  else {
    return {
      type: types.SUBMIT_EMAIL,
      uid: response.users[0].uid,
      isEmailRegistered: true,
      email: email
    };
  }
}

export function login(uid, password) {
  let response = loginBackendCall(uid, password);
  if (response.token) {
    let nextActionId = getNextActionIdBackendCall(uid);
    let staticInfo = getStaticInfo();
    let history = getHistoryBackendCall(uid, response.token);
    return {
      type: types.LOGIN,
      token: response.token,
      loginSuccessful : true,
      nextActionId: nextActionId,
      history: history,
      fact: staticInfo.fact,
      sections: staticInfo.sections,
      actionTypes: staticInfo.actionTypes
    };
  }
  else {
    return {
      type: types.LOGIN,
      loginSuccessful: false
    };
  }
}

export function signup(uid, email, password) {
  let response = signupBackendCall(uid, email, password);
  if (response.token) {
    let nextActionId = getNextActionIdBackendCall(uid);
    let staticInfo = getStaticInfo();
    let history = getHistoryBackendCall(uid, response.token);
    return {
      type: types.SIGNUP,
      token: response.token,
      nextActionId: nextActionId,
      history: history,
      fact: staticInfo.fact,
      sections: staticInfo.sections,
      actionTypes: staticInfo.actionTypes
    };
  }
}

function getUserByEmailBackendCall(email) {
  return getUserFoundMock();
}

function getUserNotFoundMock() {
  return {
    users: [],
    uid: "uid_new_foo"
  };
}

function getUserFoundMock() {
  return {
    users: [{uid: "uid_not_new_foo"}]
  };
}

function loginBackendCall(uid, password) {
  return loginValidPasswordMock();
}

function loginValidPasswordMock() {
  return {
    token: "token_foo"
  };
}

function loginInvalidPasswordMock() {
  return {
    errors: [
      {code: "password_invalid"}
    ]
  };
}

function signupBackendCall(uid, email, password) {
  return signupSuccessfulMock();
}

function signupSuccessfulMock() {
  return {
    token: "token_foo"
  }
}

export function openApp(staticInfoLastDate) {
  if (isDateFromToday(staticInfoLastDate)) {
    return {
      type: types.OPEN_APP
    };
  }
  else {
    let staticInfo = getStaticInfo();
    return {
      type: types.OPEN_APP,
      fact: staticInfo.fact,
      sections: staticInfo.sections,
      actionTypes: staticInfo.actionTypes,
    };
  }
}

export function addAction(uid, nextActionId, section, actionType, score, authToken) {
  createActionBackendCall(uid, nextActionId, section, actionType, score, authToken);
  let nextACtionId = getNextActionIdBackendCall(uid);
  return {
    type: types.ADD_ACTION,
    nextActionId: nextActionId
  };
}

function createActionBackendCall(uid, nextActionId, section, actionType, score, authToken) {
  let newAction = {
    "id": "12",
    "actionId": "asda",
    "actionType": actionType,
    "datetime": "2016-07-21",
    "section": section,
    "score": score
  };
}

function getNextActionIdBackendCall(uid) {
  return "3f45";
}

function isDateFromToday(staticInfoLastDate) {
  return true;
}

function getStaticInfo() {
  let responseFact = getFactBackendCall();
  let responseSections = getSectionsBackendCall();
  let responseActionTypes = getActionTypesBackendcall();
  return {
    fact: responseFact.fact,
    sections: responseSections.sections,
    actionTypes: responseActionTypes.actionTypes,
  };
}

function getHistoryBackendCall(uid, authToken) {
  let history = [
    {
      id: "0",
      actionId: "0-1231231",
      actionType: "foo",
      datetime: "2016-07-20",
      section: "bar",
      score: "5"
    },
    {
      id: "1",
      actionId: "1-1231231",
      actionType: "foo1",
      datetime: "2016-07-209",
      section: "bar1",
      score: "-5"
    },
    {
      id: "2",
      actionId: "2-1231231",
      actionType: "foo2",
      datetime: "2016-07-18",
      section: "bar2",
      score: "10"
    }
  ];
  return {
    history: history
  };
}

function getSectionsBackendCall() {
  let sections = [
  		{
    		"id": "food",
    		"display": "info food"
  		},
  		{
    		"id": "water",
    		"display": "info water"
  		},
  		{
    		"id": "transportation",
    		"display": "info transportation"
  		},
  		{
    		"id": "heating and cooling",
    		"display": "info heating and cooling"
  		}
  	];
  return {
    sections: sections
  };
}

function getFactBackendCall() {
  let random = Math.floor((Math.random() * 4));
  facts = [
    {
    "id": 1,
    "display": "En el año 2050 habra mas plastico en el mar que peces."
    },
    {
    "id": 2,
    "display": "Aproximadamente un millon de aves y 100.000 mamiferos mueren cada ano solo a causa de desechos plasticos."
    },
    {
    "id": 3,
    "display": "El contenido de una botella de plastico de un solo uso tiene una durabilidad de medio milenio. Es absurdo y carisimo."
    },
    {
    "id": 4,
    "display": "La contaminacion del aire es el cuarto factor de riesgo de muerte en el mundo y con mucha diferencia el primer factor de riesgo ambiental de enfermedades."
    }
  ];
  let fact = facts[random];
  return {
    fact: fact.display
  };
}

function getActionTypesBackendcall() {
  let action_types: [
    {
      "id": "meat",
      "display": "I ate meat",
      "points": -5
     },
     {
      "id": "no_meat",
      "display": "I didn't eat meat",
      "points": 5
    },
    {
      "id": "fish",
      "display": "I ate fish",
      "points": -3
    },
    {
      "id": "no_fish",
      "display": "I didn't eat fish",
      "points": 3
    }
  ];
  return {
    actionTypes: action_types
  };
}
