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
  textInput: {
    height: 36,
    width: 200,
    borderColor: 'white',
    fontSize: 16,
    padding: 4,
    borderWidth: 1,
    color: 'white',
  }
});

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null
    }
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={styles.textInput}
          onChangeText= {(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Enter your email"
          placeholderTextColor="floralwhite"
          keyboardType='email-address'
          autoCapitalize='none'
          returnKeyType='next'
          onSubmitEditing={ () => onSubmit(this.state.text)}
        />
      <KeyboardSpacer/>
      </View>
    );
  }
}
