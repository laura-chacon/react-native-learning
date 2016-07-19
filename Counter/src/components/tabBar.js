import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

export const HISTORY_TAB = "HISTORY_TAB";
export const FACTS_TAB = "FACTS_TAB";
export const ACTION_TAB = "ACTION_TAB";

const HISTORY_TAB_SELECTED_ICON = require('../img/history_blue.png');
const HISTORY_TAB_UNSELECTED_ICON = require('../img/history_gray.png');
const FACTS_TAB_SELECTED_ICON = require('../img/facts_blue.png');
const FACTS_TAB_UNSELECTED_ICON = require('../img/facts_gray.png');

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    borderTopWidth: 0.5,
    borderTopColor: "lightslategray",
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: 24,
    height: 24
  },
  text: {
    fontSize: 8,
    marginTop: 5
  },
  textColorGray: {
    color: "lightslategray",
  },
  textColorBlue: {
    color: "lightseagreen"
  },
  action_container: {
    alignItems: 'center',
    flex: 1
  },
  icon_container: {
    alignItems: 'center',
    flex: 2
  },
  action_icon_container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
    height: 38,
    width: 38,
    borderWidth: 0.4,
    borderColor: 'lightgray',
    backgroundColor: 'lightseagreen'
  }
});

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: ACTION_TAB
    };
  }

  _onTabPressed(tab) {
    const { onTabPressed } = this.props;
    onTabPressed(tab);
    this.setState({selectedTab: tab});
  }

  _renderTextColor(text, isSelected) {
    if (isSelected) {
      return <Text style={[styles.text, styles.textColorBlue]}>{text}</Text>;
    }
    else {
      return <Text style={[styles.text, styles.textColorGray]}>{text}</Text>;
    }
  }

  _tabToText(tab) {
    if (tab == HISTORY_TAB) {
      return "HISTORY";
    }
    else if (tab == FACTS_TAB) {
      return "FACTS";
    }
  }

  _tabToImageSource(tab) {
    if (tab == HISTORY_TAB) {
      if (this.state.selectedTab == tab) {
        return HISTORY_TAB_SELECTED_ICON;
      }
      else {
        return HISTORY_TAB_UNSELECTED_ICON;
      }
    }
    else if (tab == FACTS_TAB) {
      if (this.state.selectedTab == tab) {
        return FACTS_TAB_SELECTED_ICON;
      }
      else {
        return FACTS_TAB_UNSELECTED_ICON;
      }
    }
  }

  _renderIconContainer(tab) {
    let isTabSelected = this.state.selectedTab == tab;
    return (
      <TouchableHighlight
        style={styles.icon_container}
        underlayColor={null}
        onPress={() => {
          this._onTabPressed(tab);
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image style={styles.icon}
            source={this._tabToImageSource(tab)}/>
          {this._renderTextColor(this._tabToText(tab), isTabSelected)}
        </View>
        </TouchableHighlight>
    );
  }

  _renderActionIconContainer() {
    return (
      <TouchableHighlight
        style={styles.action_container}
        underlayColor={null}
        onPress={() => {
          this._onTabPressed(ACTION_TAB);
        }}>
        <View style={styles.action_icon_container}>
          <Image style={styles.icon}
            source={require('../img/add_white.png')}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.tabBar}>
        {this._renderIconContainer(HISTORY_TAB)}
        {this._renderActionIconContainer()}
        {this._renderIconContainer(FACTS_TAB)}
      </View>);
  }
}
