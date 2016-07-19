import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import TabBar from './tabBar';

const ACTION_TAB = "ACTION_TAB";
const HISTORY_TAB = "HISTORY_TAB";
const FACT_TAB = "FACT_TAB";

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "ghostwhite"
  },
  contentContainer: {
    flex: 1
  }
});

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={styles.parent}>
        <View style={styles.contentContainer}>
          <Text>1</Text>
        </View>
        <TabBar
          onTabPressed={() => {}}/>
      </View>);
  }
}
