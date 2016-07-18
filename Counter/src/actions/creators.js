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
    return {
      type: types.LOGIN,
      token: response.token,
      loginSuccessful : true
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
    return {
      type: types.SIGNUP,
      token: response.token
    };
  }
}

function getUserByEmailBackendCall(email) {
  return getUserNotFoundMock();
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
