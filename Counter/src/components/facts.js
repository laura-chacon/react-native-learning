import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput
} from 'react-native';
import NavigationBar from './navigationBar';
import * as colors from  './colors';

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: colors.MAIN_BACKGROUND_COLOR
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon_name: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 16,
    color: colors.APP_COLOR
  },
  textInput_container: {
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    height: 150,
    width: 250,
    fontFamily: 'Helvetica',
    fontSize: 15,
    color: 'gray',
    textAlign: 'justify',
    lineHeight: 25
  }
});

export default class Facts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fact, title } = this.props;
    return (
      <View style={styles.parent}>
        <NavigationBar
          title={title}/>
        <View style={styles.container}>
          <View style={styles.textInput_container}>
            <Text style={styles.text}>
              {fact}{"\n"}
            </Text>
          </View>
        </View>
      </View>);
  }
}
