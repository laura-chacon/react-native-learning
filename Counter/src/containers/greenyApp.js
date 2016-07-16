'use strict';

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import Authentication from '../components/authentication';
import * as actionCreators from '../actions/creators';
import { connect } from 'react-redux';

class GreenyApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    if (!state.authentication.isLoggedIn) {
      return (
        <Authentication
          state = {state.authentication}
          actions = {actions}
        />
      );
    }
    else {
      <Text>
        User is logged in
      </Text>
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
