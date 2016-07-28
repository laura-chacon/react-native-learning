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

  componentWillMount() {
    this.props.actions.openApp(
      this.props.state.staticInfo.lastUpdatedDate,
      this.props.state.authentication.uid,
      this.props.state.authentication.token);
  }

  componentDidMount() {
    let openAppAction = this.props.actions.openApp;
    let staticInfoLastUpdatedDate = this.props.state.staticInfo.lastUpdatedDate;
    let infoUid = this.props.state.authentication.uid;
    let infoToken = this.props.state.authentication.token;
    AppState.addEventListener(
      'change', (currentAppState) => {
        if (currentAppState == "active") {
          openAppAction(staticInfoLastUpdatedDate, infoUid, infoToken);
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
        authenticationState={state.authentication}
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
