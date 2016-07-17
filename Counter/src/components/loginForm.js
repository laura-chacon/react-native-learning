import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  },
  textInput: {
    height: 36,
    width: 200,
    borderColor: 'white',
    fontSize: 16,
    padding: 4,
    borderWidth: 1,
    color: 'white'
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
    const { onSubmit } = this.props;
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
          onSubmitEditing={ () => onSubmit(this.state.password)}
        />
      </View>
    );
  }
}
