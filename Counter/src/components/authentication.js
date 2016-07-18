import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import EmailForm from './emailForm'
import LoginForm from './loginForm'
import SignupForm from './signupForm'

const EMAIL_FORM = "EMAIL_FORM";
const TRANSITION_TO_LOGIN_FORM = "TRANSITION_TO_LOGIN_FORM";
const LOGIN_FORM = "LOGIN_FORM";
const TRANSITION_TO_SIGNUP_FORM = "TRANSITION_TO_SIGNUP_FORM";
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
      stage: EMAIL_FORM,
      translateAnim: new Animated.Value(0)
    }
  }

  _maybeGoToNextForm() {
    if (this.state.stage == EMAIL_FORM &&
        this.props.state.uid &&
        this.props.state.isEmailRegistered) {
      Animated.timing(
        this.state.translateAnim,
        {toValue: 1,
         duration: 600
        }
      ).start();
      setTimeout(() => this.setState({
        stage: TRANSITION_TO_LOGIN_FORM,
        translateAnim: new Animated.Value(0)
      }), 600);
    }
    else if (this.state.stage == TRANSITION_TO_LOGIN_FORM) {
      Animated.timing(
        this.state.translateAnim,
        {toValue: 1,
         duration: 800,
         easing: Easing.elastic(1)
        }
      ).start();
      setTimeout(() => this.setState({stage: LOGIN_FORM}), 800);
    }
    else if (this.state.stage == EMAIL_FORM &&
        this.props.state.uid &&
        !this.props.state.isEmailRegistered) {
      Animated.timing(
        this.state.translateAnim,
        {toValue: 1,
         duration: 600
        }
      ).start();
      setTimeout(() => this.setState({
        stage: TRANSITION_TO_SIGNUP_FORM,
        translateAnim: new Animated.Value(0)
      }), 600);
    }
    else if (this.state.stage == TRANSITION_TO_SIGNUP_FORM) {
      Animated.timing(
        this.state.translateAnim,
        {toValue: 1,
         duration: 800,
         easing: Easing.elastic(1)
        }
      ).start();
      setTimeout(() => this.setState({stage: SIGNUP_FORM}), 800);
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
    let {width} = Dimensions.get('window');
    if (this.state.stage == EMAIL_FORM) {
      view = <Animated.View style={{
          transform: [{translateX: this.state.translateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -width]
          })}]
        }}>
          <EmailForm onSubmit={actions.submitEmail}/>
        </Animated.View>;
    }
    else if (this.state.stage == TRANSITION_TO_LOGIN_FORM) {
      view = <Animated.View style={{
          transform: [{translateX: this.state.translateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 0]
          })}]
        }}>
          <LoginForm/>
        </Animated.View>;
    }
    else if (this.state.stage == LOGIN_FORM) {
      view = <LoginForm
        onSubmit={(password) => actions.login(state.uid, password)}
        error={state.error}/>;
    }
    else if (this.state.stage == TRANSITION_TO_SIGNUP_FORM) {
      view = <Animated.View style={{
        transform: [{translateX: this.state.translateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [width, 0]
          })}]
        }}>
        <SignupForm/>
      </Animated.View>;
    }
    else if (this.state.stage == SIGNUP_FORM) {
      view = <SignupForm
        onSubmit={(password) => actions.signup(state.uid, state.email, password)}/>;
    }
    return this._render(view);
  }
}
