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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = { text: ''}
  }

  render() {
    const { submitEmail } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={styles.textInput}
          onChangeText= {(text) => this.setState({text})}
          value={this.state.text}
          keyboardType='email-address'
        />
        <TouchableOpacity onPress={ () => submitEmail(this.state.text)} style={styles.button}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
