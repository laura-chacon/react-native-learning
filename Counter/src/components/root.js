import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import TabBar from './tabBar';
import Facts from './facts'

const ACTION_TAB = "ACTION_TAB";
const HISTORY_TAB = "HISTORY_TAB";
const FACTS_TAB = "FACTS_TAB";

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
    this.state = {
      selectedTab: ACTION_TAB
    };
  }

  _renderTabContainer(tab) {
    if (tab == ACTION_TAB) {
      return (
        <View style={styles.contentContainer}>
          <Text>3</Text>
        </View>
      );
    }
    else if (tab == HISTORY_TAB) {
      return (
        <View style={styles.contentContainer}>
          <Text>2</Text>
        </View>
      );
    }
    else if (tab == FACTS_TAB) {
      return (
        <Facts/>
      );
    }
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={styles.parent}>
        <View style={styles.contentContainer}>
          {this._renderTabContainer(this.state.selectedTab)}
        </View>
        <TabBar
          onTabPressed={(tab) => {
            this.setState({selectedTab: tab});
          }}/>
      </View>);
  }
}
