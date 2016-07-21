import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView
} from 'react-native';

const styles = StyleSheet.create({
  listview_container: {
    flex: 1,
  },
  element_listview_container: {
    borderWidth: 0.5,
    borderColor: 'lightgray',
    flexDirection: "row",
  },
  score_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: 'grey'
  },
  date_actions_container: {
    flex: 3,
    flexDirection: 'column',
    padding: 10
  },
  text_date: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 15,
    color: 'lightseagreen'
  },
  text_score: {
    fontWeight: 'bold',
    fontSize: 13,
    color:'white'
  },
  text_action: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    color: 'gray',
    paddingTop: 2
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

  _renderActions(actions) {
    var fun = function(action) {
      return (
        <View key={action.actionId}>
          <Text style={styles.text_action}>
            {action.actionType}
          </Text>
        </View>
      );
    }
    return actions.map(fun);
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
      <View style={[styles.score_container, {backgroundColor: color}]}>
        <Text style={styles.text_score}>
          {score}
        </Text>
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
                  {rowData.date}
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
