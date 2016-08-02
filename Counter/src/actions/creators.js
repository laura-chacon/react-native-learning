import * as types from './types';

const MOCK_BACKEND = false;


// -----------------------------------------------------------------------------
// ACTIONS
// -----------------------------------------------------------------------------

export function submitEmail(email) {
  return (dispatch) => {
    let type = types.SUBMIT_EMAIL;
    let ctxt = {email};
    let steps = [
      getUserByEmailBackendCall
    ];
    steps.reverse();
    nextStep(ctxt, {type}, dispatch, steps);
  };
}

export function signup(uid, email, password) {
 return (dispatch) => {
   let type = types.SIGNUP;
   let ctxt = {uid, email, password};
   let steps = [
     signupBackendCall,
     getNextActionIdBackendCall,
     getHistoryBackendCall
   ];
   steps.reverse();
   nextStep(ctxt, {type}, dispatch, steps);
 };
}

export function login(uid, password) {
 return (dispatch) => {
   let type = types.LOGIN;
   let ctxt = {uid, password};
   let steps = [
     loginBackendCall,
     getNextActionIdBackendCall,
     getHistoryBackendCall
   ];
   steps.reverse();
   nextStep(ctxt, {type}, dispatch, steps);
 };
}

export function openApp(staticInfoLastDate, uid, token) {
  if (staticInfoLastDate != null && isDateFromToday(staticInfoLastDate)) {
    return {
      type: types.NO_ACTION
    };
  }
  else {
    return (dispatch) => {
      let type = types.OPEN_APP;
      let ctxt = {uid, token};
      let steps = [
        getFactBackendCall,
        getSectionsBackendCall,
        getActionTypesForAllSections
      ];
      steps.reverse();
      nextStep(ctxt, {type}, dispatch, steps);
    };
  }
}

export function addAction(uid, nextActionId, section, actionType, score,
                          token) {
  return (dispatch) => {
    let type = types.ADD_ACTION;
    let ctxt = {uid, token, nextActionId, section, actionType, score};
    let steps = [
      addActionBackendCall,
      getNextActionIdBackendCall,
      getHistoryBackendCall
    ];
    steps.reverse();
    nextStep(ctxt, {type}, dispatch, steps);
  };
}



// -----------------------------------------------------------------------------
// STEPS
// -----------------------------------------------------------------------------
function nextStep(ctxt, partialAction, dispatch, stepsLeft) {
 if (stepsLeft.length == 0) {
   console.log(partialAction);
   dispatch(partialAction);
 }
 else {
   let step = stepsLeft.pop();
   step(ctxt, partialAction, dispatch, stepsLeft);
 }
}
function getUserByEmailBackendCall(ctxt, partialAction, dispatch, stepsLeft) {
  let f = function(response) {
    let email = ctxt.email;
    let isEmailRegistered = response.users.length == 1;
    let uid = response.users.length == 0 ? response.uid : response.users[0].uid;
    let action = Object.assign({email, isEmailRegistered, uid}, partialAction);
    dispatch(action);
  };
  if (MOCK_BACKEND) {
    let response = getUserByEmailBackendCallMock();
    f(response);
  }
  else {
    let path = `/users?email=${ctxt.email}`;
    doFetch(path, {}, f);
  }
}
function loginBackendCall(ctxt, partialAction, dispatch, stepsLeft) {
 let f = function(response) {
   if (response.token) {
     partialAction['token'] = response.token;
     partialAction['loginSuccessful'] = true;
     ctxt['token'] = response.token;
     nextStep(ctxt, partialAction, dispatch, stepsLeft);
   }
   else {
     partialAction['loginSuccessful'] = false;
     dispatch(partialAction);
   }
 };
 if (MOCK_BACKEND) {
   let response = loginBackendCallMock();
   f(response);
 }
 else {
   let path = `/users/${ctxt.uid}/validate_password`;
   let password = ctxt.password;
   let body = JSON.stringify({password});
   let method = 'post';
   let headers = new Headers({'Content-Type': 'application/json'});
   doFetch(path, {method, body, headers}, f);
 }
}

function signupBackendCall(ctxt, partialAction, dispatch, stepsLeft) {
  let f = function(response) {
    partialAction['token'] = response.auth_token;
    ctxt['token'] = response.auth_token;
    nextStep(ctxt, partialAction, dispatch, stepsLeft);
  };
  if (MOCK_BACKEND) {
    let response = signupBackendCallMock();
    f(response);
  }
  else {
    let path = `/users/${ctxt.uid}`;
    let password = ctxt.password;
    let email = ctxt.email;
    let body = JSON.stringify({email, password});
    let method = 'put';
    let headers = new Headers({'Content-Type': 'application/json'});
    doFetch(path, {method, body, headers}, f);
  }
}

function getFactBackendCall(ctxt, partialAction, dispatch, stepsLeft) {
  let f = function(response) {
    partialAction['fact'] = response.display;
    nextStep(ctxt, partialAction, dispatch, stepsLeft);
  };
  if (MOCK_BACKEND) {
    let response = getFactBackendCallMock();
    f(response);
  }
  else {
    let path = `/facts`;
    doFetch(path, {}, f);
  }
}

function getSectionsBackendCall(ctxt, partialAction, dispatch, stepsLeft) {
  let f = function(response) {
    partialAction['sections'] = response.sections;
    nextStep(ctxt, partialAction, dispatch, stepsLeft);
  };
  if (MOCK_BACKEND) {
    let response = getSectionsBackendCallMock();
    f(response);
  }
  else {
    let path = "/sections";
    doFetch(path, {}, f);
  }
}

function getActionTypesForAllSections(ctxt, partialAction, dispatch,
                                      stepsLeft) {
  let sectionIds = partialAction.sections.map((section) => section.id);
  let extraSteps = sectionIds.map((sectionId) =>
    (...args) => getSectionActionTypesBackendCall(sectionId, ...args)
  );
  stepsLeft = stepsLeft.concat(extraSteps);
  partialAction['actionTypes'] = {};
  nextStep(ctxt, partialAction, dispatch, stepsLeft);
}

function getSectionActionTypesBackendCall(sectionId, ctxt, partialAction,
                                          dispatch, stepsLeft) {
  let f = function(response) {
    let actionTypes = Object.assign({[sectionId]: response.action_types},
                                   partialAction['actionTypes']);
    partialAction['actionTypes'] = actionTypes;
    nextStep(ctxt, partialAction, dispatch, stepsLeft);
  };
  if (MOCK_BACKEND) {
    let response = getSectionActionTypesBackendCallMock(sectionId);
    f(response);
  }
  else {
    let path = `/sections/${sectionId}/actions`;
    doFetch(path, {}, f);
  }
}

function getNextActionIdBackendCall(ctxt, partialAction, dispatch,
                                    stepsLeft) {
  let f = function(response) {
    partialAction['nextActionId'] = response.next_action_id;
    nextStep(ctxt, partialAction, dispatch, stepsLeft);
  };
  if (MOCK_BACKEND) {
    let response = getNextActionIdBackendCallMock();
    f(response);
  }
  else {
    let path = `/users/${ctxt.uid}/actions/next_id`;
    doFetch(path, {}, f);
  }
}

function getHistoryBackendCall(ctxt, partialAction, dispatch, stepsLeft) {
  let f = function(response) {
    partialAction['history'] = response.user_history;
    nextStep(ctxt, partialAction, dispatch, stepsLeft);
  };
  if (MOCK_BACKEND) {
    let response = getHistoryBackendCallMock();
    f(response);
  }
  else {
    console.log("Token: " + ctxt.token);
    let path = `/users/${ctxt.uid}/history`;
    let headers = new Headers({Token: ctxt.token});
    doFetch(path, {headers}, f);
  }
}

function addActionBackendCall(ctxt, partialAction, dispatch, stepsLeft) {
  let f = function(response) {
    nextStep(ctxt, partialAction, dispatch, stepsLeft);
  };
  if (MOCK_BACKEND) {
    let response = addActionBackendCallMock();
    f(response);
  }
  else {
    let path = `/users/${ctxt.uid}/actions/${ctxt.nextActionId}`;
    let body = JSON.stringify({
      section: ctxt.section,
      action_type: ctxt.actionType,
      score: ctxt.score
    });
    let method = 'put';
    let headers = new Headers({
      Token: ctxt.token,
      'Content-Type': 'application/json'
    });
    doFetch(path, {method, body, headers}, f);
  }
}




// -----------------------------------------------------------------------------
// UTILS
// -----------------------------------------------------------------------------

function doFetch(path, options, resultFun) {
 console.log("-------- Sending request");
 console.log("Request URL path: " + path);
 console.log(options);
 fetch(uri(path), options)
   .then(response => {
     console.log("-------- Got response");
     console.log("Status code: " + response.status);
     return response.json();
   })
   .then(json => {
     console.log(json);
     return resultFun(json);
   });
}

function uri(path) {
  return 'http://52.51.179.41:8005' + path;
}

function isDateFromToday(staticInfoLastDate) {
  return staticInfoLastDate.toDateString() == (new Date()).toDateString();
}



// -----------------------------------------------------------------------------
// MOCK DATA
// -----------------------------------------------------------------------------

function getUserByEmailBackendCallMock() {
  return getUserByEmailBackendCallMockNotFound();
}

function getUserByEmailBackendCallMockNotFound() {
  return {
    users: [],
    uid: "uid_new_foo"
  };
}

function getUserByEmailBackendCallMockFound() {
  return {
    users: [{uid: "uid_not_new_foo"}]
  };
}

function loginBackendCallMock() {
  return loginBackendCallMockValidPassword();
}

function loginBackendCallMockValidPassword() {
  return {
    auth_token: "token_foo"
  };
}

function loginBackendCallMockInalidPassword() {
  return {
    errors: [
      {code: "password_invalid"}
    ]
  };
}

function signupBackendCallMock() {
  return {
    auth_token: "token_foo"
  };
}

function getHistoryBackendCallMock() {
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
    user_history: history
  };
}

function getSectionActionTypesBackendCallMock(section) {
 if (section == 'transportation') {
   return {
     action_types: [
       {
         id: "bike",
         display: "Bike",
         points: 10
       },
       {
         id: "car",
         display: "Car",
         points: -5
       },
       {
         id: "public_transport",
         display: "Public transport",
         points: 5
       },
       {
         id: "plane",
         display: "Plane",
         points: -15
       }
     ]
   };
 }
 else if (section == 'water') {
   return {
     action_types: [
       {
         id: "short_shower",
         display: "Short shower",
         points: 5
       },
       {
         id: "long_shower",
         display: "Long Shower",
         points: -5
       },
       {
         id: "bath",
         display: "Bath",
         points: -10
       },
       {
         id: "cold_water",
         display: "Cold water",
         points: 5
       }
     ]
   };
 }
 else if (section == 'food') {
   return {
     action_types: [
       {
         id: "meat",
         display: "Meat",
         points: -10
       },
       {
         id: "no_meat",
         display: "No meat",
         points: 10
       },
       {
         id: "fish",
         display: "Fish",
         points: -5
       },
       {
         id: "no_fish",
         display: "No fish",
         points: 5
       }
     ]
   };
 }
 else if (section == 'temperature') {
   return {
     action_types: [
       {
         id: "heating",
         display: "Heating",
         points: -10
       },
       {
         id: "cooling",
         display: "Cooling",
         points: -10
       },
       {
         id: "window",
         display: "Window",
         points: 5
       },
       {
         id: "sweater",
         display: "Sweater",
         points: 5
       }
     ]
   };
 }
}

function getFactBackendCallMock() {
  let random = Math.floor((Math.random() * 4));
  facts = [
    {
      id: 1,
      display: "En el año 2050 habra mas plastico en el mar que peces."
    },
    {
      id: 2,
      display: "Aproximadamente un millón de aves y 100.000 mamíferos " +
        "mueren cada año solo a causa de desechos plasticos."
    },
    {
      id: 3,
      display: "El contenido de una botella de plástico de un solo uso " +
        "tiene una durabilidad de medio milenio. Es absurdo y carísimo."
    },
    {
      id: 4,
      display: "La contaminación del aire es el cuarto factor de riesgo " +
        "de muerte en el mundo y con mucha diferencia el primer factor de " +
        "riesgo ambiental de enfermedades."
    }
  ];
  let fact = facts[random];
  return {
    fact: fact.display
  };
}

function getSectionsBackendCallMock() {
  let sections = [
    {
      id: "food",
      display: "Food",
      info: "When land is used to raise animals instead of crops, precious " +
        "water and soil are lost, trees are cut down to make land for grazing" +
        "or factory-farm sheds, and untreated animal waste pollutes rivers " +
        "and streams. In fact, it has such a devastating effect on all " +
        "aspects of our environment that the Union of Concerned Scientists " +
        "lists meat-eating as the second-biggest environmental hazard facing " +
        "the Earth. (Number one is fossil-fuel vehicles.) And according to " +
        "a report published by the Worldwatch Institute, a staggering 51 " +
        "percent or more of global greenhouse-gas emissions are caused by " +
        "animal agriculture."
    },
    {
      id: "water",
      display: "Water",
      info: ""
    },
    {
      id: "transportation",
      display: "Transportation",
      info: ""
    },
    {
      id: "temperature",
      display: "Temperature",
      info: ""
    }
  ];
  return {
    sections: sections
  };
}

function getNextActionIdBackendCallMock() {
  return {next_action_id: "3f45"};
}

function addActionBackendCallMock(section, actionType, score) {
  return {};
}
