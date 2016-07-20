import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput
} from 'react-native';

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "ghostwhite"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon_name: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 15,
    color: 'lightseagreen'
  },
  textInput_container: {
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    height: 150,
    width: 250,
    fontSize: 15,
    textAlign: 'justify'
  }
});

export default class Facts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fact } = this.props;
    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <Text style={styles.icon_name}>Fact of the day:</Text>
          <View style={styles.textInput_container}>
            <Text style={styles.text}>
              {fact}{"\n"}  
            </Text>
          </View>
        </View>
      </View>);
  }
}
