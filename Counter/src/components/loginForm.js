import React, { Component } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 30,
    padding: 10,
    backgroundColor: 'lightcoral',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
    borderRadius: 3
  },
  textInput: {
    height: 36,
    width: 200,
    borderColor: 'white',
    fontSize: 16,
    padding: 4,
    borderWidth: 1,
    color: 'white'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Helvetica'
  },
  error_container: {
    marginTop: 10,
    height: 30
  },
  text: {
    color: 'red'
  }
});

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null
    }
  }

  render() {
    const { onSubmit, error } = this.props;
    let errorView;
    if (error != null) {
      errorView = <Text style={styles.text}>
        Incorrect password
      </Text>;
    }
    else {
      errorView = false;
    }
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={styles.textInput}
          onChangeText= {(password) => this.setState({password})}
          value={this.state.password}
          placeholder="Enter your password"
          placeholderTextColor="floralwhite"
          keyboardType='numeric'
          autoCapitalize='none'
          returnKeyType='next'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onSubmit(this.state.password)}>
          <Text
            style={styles.buttonText}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <View style={styles.error_container}>
          {errorView}
        </View>
        <KeyboardSpacer/>
      </View>
    );
  }
}
