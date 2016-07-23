import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView
} from 'react-native';

import * as colors from  './colors';

const styles = StyleSheet.create({
  listview_container: {
    flex: 1,
    borderTopWidth: 0.5,
    borderColor: 'lightgray'
  },
  element_listview_container: {
    borderBottomWidth: 0.5,
    borderColor: 'lightgray',
    flexDirection: "row",
  },
  score_container: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 10
  },
  score_text_container: {
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  date_actions_container: {
    flex: 3,
    flexDirection: 'column',
    padding: 10,
  },
  action_container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2
  },
  text_date: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: 'gray'
  },
  text_score: {
    fontWeight: 'bold',
    fontSize: 12,
    color:'white'
  },
  text_action: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: 'gray',
  },
  box: {
    width: 9,
    height: 9,
    borderRadius: 2,
    marginRight: 4
  }
});

const MAX_SCORE = 60;

export default class History extends Component {
  constructor(props) {
    super(props);
  }

  _groupActionsByDate() {
    const { history } = this.props;
    var fun = function (acc, action) {
      if (acc[action.datetime]) {
        let data = acc[action.datetime];
        data.actions.push({
          section: action.section,
          actionType: action.actionType,
          actionId: action.actionId
        });
        data.score = data.score + action.score;
        acc[action.datetime] = data;
      }
      else {
        acc[action.datetime] = {
          date: action.datetime,
          actions: [{
            section: action.section,
            actionType: action.actionType,
            actionId: action.actionId
          }],
          score: action.score
        }
      }
      return acc;
    };
    return history.reduce(fun, {});
  }

  _sortActionGroupsByDate(actionGroups) {
    var sortFun = function(a, b) {
      if (a.date < b.date) {
        return 1;
      }
      else {
        return -1;
      }
    }
    actionGroups.sort(sortFun);
    return actionGroups;
  }

  _getListViewSourceData() {
    let aux = this._groupActionsByDate();
    let actionGroups = Object.values(aux);
    return this._sortActionGroupsByDate(actionGroups);
  }

  _getColorSection(section) {
    switch(section) {
      case "Food":
        return colors.FOOD_SECTION_COLOR;
      case "Water":
        return colors.WATER_SECTION_COLOR;
      case "Transportation":
        return colors.TRANSPORTATION_SECTION_COLOR;
      case "Temperature":
        return colors.TEMPERATURE_COLOR;
    }
  }

  _createSectionBox(section) {
    let color = this._getColorSection(section);
    return <View style={[styles.box, {backgroundColor: color}]}></View>;
  }

  _createActionTypeText(section, actionType) {
    let color = this._getColorSection(section);
    return (
      <Text style={[styles.text_action, {color: color}]}>
        {actionType}
      </Text>
    );
  }

  _renderActions(actions) {
    let thisInstance = this;
    var renderAction = function(action) {
      return (
        <View
          style={styles.action_container}
          key={action.actionId}>
          {thisInstance._createSectionBox(action.section)}
          {thisInstance._createActionTypeText(action.section, action.actionType)}
        </View>
      );
    }
    return actions.map(renderAction);
  }

  _calculateColor(best, worst, score) {
    if (score == 0) {
      return worst;
    }
    else if (score == MAX_SCORE) {
      return best;
    }
    else if (best == worst) {
      return best;
    }
    else if (best > worst) {
      return worst + (best - worst) * score / MAX_SCORE;
    }
    else {
      return worst - (worst - best) * score / MAX_SCORE;
    }
  }

  _getDate(date) {
    var date = new Date(date).toDateString();
    dateSplit = date.split(" ");
    let weekDay = 0;
    let month = 1;
    let day = 2;
    let year = 3;
    weekDay = dateSplit[weekDay].toUpperCase();
    year = dateSplit[year].split(0)[1];
    return (
      weekDay + ", " +
      dateSplit[day] + " " +
      dateSplit[month] + " '" +
      year);
  }

  _renderScore(score) {
    /*
    indianred = 205 92 92
    lightgreen = 144 238 144
    */
    let bestColor = [144, 238, 144]; // lightgreen
    let worstColor = [205, 92, 92]; // indianred
    let auxScore = Math.min(Math.max(score, -30), 30) + 30;
    // Now auxScore is a number between 0 and 60
    let red = this._calculateColor(bestColor[0], worstColor[0], auxScore);
    let green = this._calculateColor(bestColor[1], worstColor[1], auxScore);
    let blue = this._calculateColor(bestColor[2], worstColor[2], auxScore);
    let color = "rgb(" + red + "," + green + "," + blue + ")";
    return (
      <View style={styles.score_container}>
        <View style={[styles.score_text_container, {backgroundColor: color}]}>
          <Text style={styles.text_score}>
            {score}
          </Text>
        </View>
      </View>
    );
  }
  _renderListView() {
    history = this._getListViewSourceData();
    var dataSource = (new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      }))
      .cloneWithRows(history);
    return <ListView
      dataSource={dataSource}
      renderRow={(rowData) => {
        return (
          <View style={styles.element_listview_container}>
            <View style={styles.date_actions_container}>
              <View style={styles.section_container}>
                <Text style={styles.text_date}>
                  {this._getDate(rowData.date)}
                </Text>
              </View>
              <View style={styles.section_container}>
                {this._renderActions(rowData.actions)}
              </View>
            </View>
            {this._renderScore(rowData.score)}
          </View>
        );
      }}
    />;
  }

  render() {
    return (
      <View style={styles.listview_container}>
        {this._renderListView()}
      </View>);
  }
}
