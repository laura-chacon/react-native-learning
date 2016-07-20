import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AppState
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
    const { staticState, userState, actions } = this.props;
    if (tab == ACTION_TAB) {
      return (
        <View style={styles.contentContainer}>
          <Text>actions</Text>
        </View>
      );
    }
    else if (tab == HISTORY_TAB) {
      return (
        <View style={styles.contentContainer}>
          <Text>history</Text>
        </View>
      );
    }
    else if (tab == FACTS_TAB) {
      return (
        <Facts
          fact={staticState.fact}/>
      );
    }
  }

  render() {
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
