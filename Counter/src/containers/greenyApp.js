'use strict';

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import Authentication from '../components/authentication';
import Root from '../components/root'
import * as actionCreators from '../actions/creators';
import { connect } from 'react-redux';
import {
  AppState
} from 'react-native';

class GreenyApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let openAppAction = this.props.actions.openApp;
    let staticInfoLastUpdatedDate = this.props.state.staticInfo.lastUpdatedDate;
    AppState.addEventListener(
      'change', (currentAppState) => {
        if (currentAppState == "active") {
          openAppAction(staticInfoLastUpdatedDate);
        }
      });
  }

  render() {
    const { state, actions } = this.props;
    if (state.authentication.isLoggedIn) {
      return <Authentication
        state={state.authentication}
        actions={actions}/>;
    }
    else {
      return <Root
        staticState={state.staticInfo}
        userState={state.user}
        actions={actions}/>;
    }
  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(GreenyApp);
