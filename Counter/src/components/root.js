import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AppState,
  TouchableHighlight
} from 'react-native';
import TabBar from './tabBar';
import Facts from './facts'
import History from './history'
import Chart from './chart'
import Action from './action'
import * as colors from  './colors';

const ACTION_TAB = "ACTION_TAB";
const HISTORY_TAB = "HISTORY_TAB";
const FACT_TAB = "FACTS_TAB";
const CHART_TAB = "CHART_TAB"

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: colors.MAIN_BACKGROUND_COLOR
  },
  contentContainer: {
    flex: 1,
  },
  icon_container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
    height: 38,
    width: 38,
    borderWidth: 0.4,
    borderColor: 'lightgray',
    backgroundColor: colors.APP_COLOR
  },
});

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: ACTION_TAB
    };
  }

  _tabToTitle(tab) {
    if (tab == ACTION_TAB) {
      return "New action";
    }
    else if (tab == HISTORY_TAB) {
      return "History";
    }
    else if (tab == FACT_TAB) {
      return "Fact of the day";
    }
    else if (tab == CHART_TAB) {
      return "Score progression";
    }
  }

  _renderTabContainer(tab) {
    const { authenticationState, staticState, userState, actions } = this.props;
    let title = this._tabToTitle(tab);
    if (tab == ACTION_TAB) {
      return (
        <View style={styles.contentContainer}>
          <Action
            title={title}
            addAction = {actions.addAction}
            history={userState.history}
            sections={staticState.sections}
            actionTypes={staticState.actionTypes}
            selectedTab={this.state.selectedTab}
            uid={authenticationState.uid}
            nextActionId={userState.nextActionId}
            token={authenticationState.token}
            />
        </View>
      );
    }
    else if (tab == HISTORY_TAB) {
      return (
        <View style={styles.contentContainer}>
          <History
            title={title}
            history={userState.history}/>
        </View>
      );
    }
    else if (tab == FACT_TAB) {
      return (
        <Facts
          title={title}
          fact={staticState.fact}/>
      );
    }
    else if (tab == CHART_TAB) {
      return (
        <View style={styles.contentContainer}>
          <Chart
            title={title}
            history={userState.history}/>
        </View>
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
