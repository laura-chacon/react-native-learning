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
      history: history.history,
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
      history: history.history,
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

export function openApp(staticInfoLastDate, uid, authToken) {
  if (staticInfoLastDate != null && isDateFromToday(staticInfoLastDate)) {
    return {
      type: types.NO_ACTION
    };
  }
  else {
    let staticInfo = getStaticInfo();
    let history = getHistoryBackendCall(uid, authToken);
    return {
      type: types.OPEN_APP,
      fact: staticInfo.fact,
      sections: staticInfo.sections,
      actionTypes: staticInfo.actionTypes,
      history: history.history
    };
  }
}

export function addAction(uid, nextActionId, section, actionType, score, authToken) {
  createActionBackendCall(uid, nextActionId, section, actionType, score, authToken);
  let nextACtionId = getNextActionIdBackendCall(uid);
  let history = getHistoryBackendCall(uid, authToken);
  return {
    type: types.ADD_ACTION,
    nextActionId: nextActionId,
    history: history.history
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
  return staticInfoLastDate.toDateString() == (new Date()).toDateString();
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
      actionType: "No eat meat",
      datetime: "2016-07-20",
      section: "Food",
      score: 5
    },
    {
      id: "1",
      actionId: "1-1231231",
      actionType: "Car",
      datetime: "2016-07-20",
      section: "Transportation",
      score: -5
    },
    {
      id: "2",
      actionId: "2-1231231",
      actionType: "Bath",
      datetime: "2016-07-18",
      section: "Water",
      score: 30
    },
    {
      id: "3",
      actionId: "3-1231231",
      actionType: "Bike",
      datetime: "2016-07-19",
      section: "Transportation",
      score: 10
    },
    {
      id: "4",
      actionId: "4-1231231",
      actionType: "Shower",
      datetime: "2016-07-18",
      section: "Water",
      score: 5
    },
    {
      id: "5",
      actionId: "5-1231231",
      actionType: "Bath",
      datetime: "2016-07-16",
      section: "Water",
      score: -30
    },
    {
      id: "6",
      actionId: "6-1231231",
      actionType: "Bath",
      datetime: "2016-07-15",
      section: "Water",
      score: -10
    },
    {
      id: "10",
      actionId: "10-1231231",
      actionType: "Plane",
      datetime: "2016-07-15",
      section: "Transportation",
      score: -15
    },
    {
      id: "7",
      actionId: "7-1231231",
      actionType: "Sweater",
      datetime: "2016-07-12",
      section: "Temperature",
      score: 5
    },
    {
      id: "17",
      actionId: "7-1231231",
      actionType: "Heating",
      datetime: "2016-07-18",
      section: "Temperature",
      score: -5
    },
    {
      id: "8",
      actionId: "8-1231231",
      actionType: "Bath",
      datetime: "2016-07-13",
      section: "Water",
      score: -10
    },
    {
      id: "9",
      actionId: "9-1231231",
      actionType: "Bath",
      datetime: "2016-07-14",
      section: "Water",
      score: -10
    },
    {
      id: "43",
      actionId: "9-1231231",
      actionType: "Heating",
      datetime: "2016-07-11",
      section: "Temperature",
      score: 10
    },
    {
      id: "234",
      actionId: "9-1231231",
      actionType: "Bath",
      datetime: "2016-07-10",
      section: "Water",
      score: -30
    },
    {
      id: "9142",
      actionId: "9-1231231",
      actionType: "Fish",
      datetime: "2016-07-07",
      section: "Food",
      score: -5
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
    		"display": "Food"
  		},
  		{
    		"id": "water",
    		"display": "Water"
  		},
  		{
    		"id": "transportation",
    		"display": "Transportation"
  		},
  		{
    		"id": "temperature",
    		"display": "Temperature"
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
    "display": "Aproximadamente un millón de aves y 100.000 mamíferos mueren cada año solo a causa de desechos plasticos."
    },
    {
    "id": 3,
    "display": "El contenido de una botella de plástico de un solo uso tiene una durabilidad de medio milenio. Es absurdo y carísimo."
    },
    {
    "id": 4,
    "display": "La contaminación del aire es el cuarto factor de riesgo de muerte en el mundo y con mucha diferencia el primer factor de riesgo ambiental de enfermedades."
    }
  ];
  let fact = facts[random];
  return {
    fact: fact.display
  };
}

function getActionTypesBackendcall() {
  let action_types = {
    transportation: [
      {
        "id": "bike",
        "display": "Bike",
        "points": 10
       },
       {
        "id": "car",
        "display": "Car",
        "points": -5
      },
      {
        "id": "public_transport",
        "display": "Public transport",
        "points": 5
      },
      {
        "id": "plane",
        "display": "Plane",
        "points": -15
      }
    ],
    water: [
      {
        "id": "short_shower",
        "display": "Short shower",
        "points": 5
       },
       {
        "id": "long_shower",
        "display": "Long Shower",
        "points": -5
      },
      {
        "id": "bath",
        "display": "Bath",
        "points": -10
      },
      {
        "id": "cold_water",
        "display": "Cold water",
        "points": 5
      }
    ],
    food: [
      {
        "id": "meat",
        "display": "Meat",
        "points": -10
       },
       {
        "id": "no_meat",
        "display": "No meat",
        "points": 10
      },
      {
        "id": "fish",
        "display": "Fish",
        "points": -5
      },
      {
        "id": "no_fish",
        "display": "No fish",
        "points": 5
      }
    ],
    temperature: [
      {
        "id": "heating",
        "display": "Heating",
        "points": -10
       },
       {
        "id": "cooling",
        "display": "Cooling",
        "points": -10
      },
      {
        "id": "window",
        "display": "Window",
        "points": 5
      },
      {
        "id": "sweater",
        "display": "Sweater",
        "points": 5
      }
    ]
  };
  return {
    actionTypes: action_types
  };
}
