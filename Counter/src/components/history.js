import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView
} from 'react-native';
import NavigationBar from './navigationBar';
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
    width: 20,
    marginRight: 10,
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
    fontSize: 10,
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
          actionType: action.action_type,
          actionId: action.action_id
        });
        data.score = data.score + action.score;
        acc[action.datetime] = data;
      }
      else {
        acc[action.datetime] = {
          date: action.datetime,
          actions: [{
            section: action.section,
            actionType: action.action_type,
            actionId: action.action_id
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

  _addPositionToGroups(actionGroups) {
    let fun = function(actionGroup, index) {
      actionGroup["index"] = index;
      return actionGroup;
    }
    return actionGroups.map(fun);
  }

  _getActionGroups() {
    let aux = this._groupActionsByDate();
    let actionGroups = Object.values(aux);
    let sortedActionGroups = this._sortActionGroupsByDate(actionGroups);
    return this._addPositionToGroups(sortedActionGroups);
  }

  _getColorSection(section) {
    switch(section) {
      case "food":
        return colors.FOOD_SECTION_COLOR;
      case "water":
        return colors.WATER_SECTION_COLOR;
      case "transportation":
        return colors.TRANSPORTATION_SECTION_COLOR;
      case "temperature":
        return colors.TEMPERATURE_SECTION_COLOR;
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
      return Math.round(worst + (best - worst) * score / MAX_SCORE);
    }
    else {
      return Math.round(worst - (worst - best) * score / MAX_SCORE);
    }
  }

  _scoreToColor(score) {
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
    return {red, green, blue};
  }

  _colorObjectToRgb(color) {
    return "rgb(" + color.red + "," + color.green + "," + color.blue + ")";
  }

  _colorInBetween(colorIndex1, colorIndex2, indexedColors) {
    if (colorIndex1 < 0) {
      return indexedColors[colorIndex2];
    }
    else if (colorIndex2 >= indexedColors.length) {
      return indexedColors[colorIndex1];
    }
    else {
      let color1 = indexedColors[colorIndex1];
      let color2 = indexedColors[colorIndex2];
      let middleFun = function(a, b) {
        let v = a < b ? a + (b - a) / 2 : b + (a - b) / 2;
        return Math.round(v);
      }
      return {
        red: middleFun(color1.red, color2.red),
        blue: middleFun(color1.blue, color2.blue),
        green: middleFun(color1.green, color2.green)
      };
    }
  }

  _linearGradient(specs) {
    let thisInstance = this;
    let fun = function(spec) {
      let v = thisInstance._colorObjectToRgb(spec.color);
      if (spec.perc) {
        v += " " + spec.perc + "%";
      }
      return v;
    }
    let colors = specs.map(fun);
    return "linear-gradient(0deg," + colors.join(",") + ")"
  }

  _renderScore(score, rowIndex, indexedColors) {
    let beginColor = this._colorInBetween(rowIndex, rowIndex+1, indexedColors);
    let midColor = indexedColors[rowIndex];
    let endColor = this._colorInBetween(rowIndex, rowIndex+1, indexedColors);
    let gradient = this._linearGradient([
        {color: beginColor},
        {color: midColor, perc: 20},
        {color: midColor, perc: 80},
        {color: endColor}
      ]);
    let color = this._colorObjectToRgb(midColor);
    return (
      <View style={[styles.score_container, {backgroundColor: color}]}>
        <Text style={styles.text_score}>
          {score}
        </Text>
      </View>
    );
  }

  _indexedColors(actionGroups) {
    let thisInstance = this;
    let fun = function(actionGroup) {
      return thisInstance._scoreToColor(actionGroup.score);
    }
    return actionGroups.map(fun);
  }

  _renderListView() {
    let actionGroups = this._getActionGroups();
    let indexedColors = this._indexedColors(actionGroups);
    var dataSource = (new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      }))
      .cloneWithRows(actionGroups);
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
            {this._renderScore(rowData.score, rowData.index, indexedColors)}
          </View>
        );
      }}
    />;
  }

  render() {
    const { title } = this.props;
    return (
      <View style={styles.listview_container}>
        <NavigationBar
          title={title}/>
        {this._renderListView()}
      </View>
    );
  }
}
