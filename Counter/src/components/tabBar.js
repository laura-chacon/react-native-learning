import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

export const HISTORY_TAB = "HISTORY_TAB";
export const FACT_TAB = "FACT_TAB";
export const ACTION_TAB = "ACTION_TAB";

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

  _textColor(text, color) {
    if (color == "gray") {
      return <Text style={[styles.text, styles.textColorGray]}>{text}</Text>;
    }
    else if (color == "blue") {
      return <Text style={[styles.text, styles.textColorBlue]}>{text}</Text>;
    }
  }

  _icon_container(tab, image, text, color) {
    return (
      <TouchableHighlight
        style={styles.icon_container}
        underlayColor='ghostwhite'
        onPress={() => {
          this._onTabPressed(tab);
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {image}
          {this._textColor(text, color)}
        </View>
        </TouchableHighlight>
    );
  }

  _action_icon_container(tab, image) {
    return (
      <TouchableHighlight
        style={styles.action_container}
        underlayColor='ghostwhite'
        onPress={() => {
          this._onTabPressed(tab);
        }}>
        <View style={styles.action_icon_container}>
          {image}
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    let view;
    if(this.state.selectedTab == HISTORY_TAB) {
      view =
        <View style={styles.tabBar}>
          {this._icon_container(
            HISTORY_TAB,
            <Image style={styles.icon}
              source={require('../img/history_blue.png')}/>,
            "HISTORY",
            "blue"
          )}
          {this._action_icon_container(
            ACTION_TAB,
            <Image style={styles.icon}
              source={require('../img/add_white.png')}/>
          )}
          {this._icon_container(
            FACT_TAB,
            <Image style={styles.icon}
              source={require('../img/facts_gray.png')}/>,
            "FACTS",
            "gray"
          )}
      </View>
    }
    else if (this.state.selectedTab == ACTION_TAB) {
      view =
        <View style={styles.tabBar}>
        {this._icon_container(
          HISTORY_TAB,
          <Image style={styles.icon}
            source={require('../img/history_gray.png')}/>,
          "HISTORY",
          "gray"
        )}
        {this._action_icon_container(
          ACTION_TAB,
          <Image style={styles.icon}
            source={require('../img/add_white.png')}/>
        )}
        {this._icon_container(
          FACT_TAB,
          <Image style={styles.icon}
            source={require('../img/facts_gray.png')}/>,
          "FACTS",
          "gray"
        )}
      </View>
    }
    else if (this.state.selectedTab == FACT_TAB) {
      view = <View style={styles.tabBar}>
        {this._icon_container(
          HISTORY_TAB,
          <Image style={styles.icon}
            source={require('../img/history_gray.png')}/>,
          "HISTORY",
          "gray"
        )}
        {this._action_icon_container(
          ACTION_TAB,
          <Image style={styles.icon}
            source={require('../img/add_white.png')}/>
        )}
        {this._icon_container(
          FACT_TAB,
          <Image style={styles.icon}
            source={require('../img/facts_blue.png')}/>,
          "FACTS",
          "blue"
        )}
      </View>
    }
    return view;
  }
}
