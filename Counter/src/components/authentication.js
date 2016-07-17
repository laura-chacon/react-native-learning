import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import EmailForm from './emailForm'
import LoginForm from './loginForm'

const EMAIL_FORM = "EMAIL_FORM";
const FROM_EMAIL_TO_LOGIN_FORM = "FROM_EMAIL_TO_LOGIN_FORM";
const LOGIN_FORM = "LOGIN_FORM";
const FROM_EMAIL_TO_SIGNUP_FORM = "FROM_EMAIL_TO_SIGNUP_FORM";
const SIGNUP_FORM = "SIGNUP_FORM";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightseagreen'
  },
  app_name_logo_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  app_name: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 35,
    color: 'white',
    marginBottom: 15
  },
  logo: {
    width: 44,
    height: 44,
    marginTop: 15
  },
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: EMAIL_FORM
    }
  }

  _maybeGoToNextForm() {
    if (this.state.stage == EMAIL_FORM &&
        this.props.state.uid &&
        this.props.state.isEmailRegistered) {
      this.setState({stage: FROM_EMAIL_TO_LOGIN_FORM});
    }
  }

  componentDidMount() {
    this._maybeGoToNextForm();
  }

  componentDidUpdate() {
    this._maybeGoToNextForm();
  }

  _render(view) {
    return <View style={styles.container}>
      <View style={styles.app_name_logo_container}>
        <Text style={styles.app_name}>GREENY</Text>
        <Image style={styles.logo} source={require('../img/logo.png')}/>
      </View>
      <View style={styles.form_container}>
        {view}
      </View>
    </View>;
  }

  render() {
    const { state, actions } = this.props;
    let view;
    if (this.state.stage == EMAIL_FORM) {
      view = <EmailForm
        onSubmit={actions.submitEmail}/>;
    }
    else if (this.state.stage == FROM_EMAIL_TO_LOGIN_FORM) {
      // we need to render both email_form and login_form.
      // login_form should be outside of the screen, to the right.
      // email_form should be in the center of the screen
      // then an animation should start which moves both forms to the left.
      // when the animation ends, we should do:
      // this.setState({stage: LOGIN_FORM});
      //
      // This is temporary code that should be replaced with the animation code:
      view = <LoginForm
        onSubmit={(password) => actions.login(state.uid, password)}/>;
      setTimeout(() => this.setState({stage: LOGIN_FORM}), 500);
    }
    else if (this.state.stage == LOGIN_FORM) {
      view = <LoginForm
        onSubmit={(password) => actions.login(state.uid, password)}/>;
    }
    return this._render(view);
  }
}
