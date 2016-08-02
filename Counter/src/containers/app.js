import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import { Provider } from 'react-redux';

import * as reducers from '../reducers';
import GreenyApp from './greenyApp';

const loggerMiddleware = createLogger()
const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(thunk, loggerMiddleware));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GreenyApp />
      </Provider>
    );
  }
}
