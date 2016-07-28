import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import * as colors from  './colors';

const styles = StyleSheet.create({
  navigationBar: {
    height: 30,
    marginTop: 20,
    backgroundColor: colors.MAIN_BACKGROUND_COLOR,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#e6e6e6',
  },
  leftContainer: {
    flex: 1,
    marginLeft: 10
  },
  textTitle: {
    flex: 2,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 16,
    color: colors.APP_COLOR
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 15,
  }
});

export default class navigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, rightContainer } = this.props;
    return (
      <View style={styles.navigationBar}>
        <View style={styles.leftContainer}/>
        <Text style={styles.textTitle}>
          {title}
        </Text>
        <View
          style={styles.rightContainer}>
          {rightContainer}
        </View>
      </View>);
  }
}
