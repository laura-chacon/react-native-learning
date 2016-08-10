import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import Chart from 'react-native-chart';
import NavigationBar from './navigationBar';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from  './colors';

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: colors.MAIN_BACKGROUND_COLOR
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    width: 300,
    height: 300
  },
  linearGradient: {
     paddingLeft: 15,
     paddingRight: 15,
     borderRadius: 5
   },
   buttonText: {
     fontSize: 18,
     fontFamily: 'Gill Sans',
     textAlign: 'center',
     margin: 10,
     color: '#ffffff',
     backgroundColor: 'transparent',
   },
});

export default class Facts extends Component {
  constructor(props) {
    super(props);
  }

  _sumScoresPerDate() {
    const { history } = this.props;
    var fun = function (acc, action) {
      if (acc[action.datetime]) {
        acc[action.datetime] += action.score;
      }
      else {
        acc[action.datetime] = action.score;
      }
      return acc;
    };
    return history.reduce(fun, {});
  }

  _nextDay(date) {
    date = new Date(date);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  }

  _getDatesList(scoresPerDate) {
    let datesWithScore = Object.keys(scoresPerDate);
    datesWithScore.sort();
    let oldestDate = datesWithScore[0];
    let youngestDate = datesWithScore[datesWithScore.length - 1];
    let datesList = [];
    for (let date = oldestDate; date <= youngestDate;) {
      datesList.push(date);
      date = this._nextDay(date);
    }
    return datesList;
  }

  _assembleScoreProgression(scoresPerDate, datesList) {
    let fun = function(acc, date) {
      let accProgression = acc[0];
      let dateScore = scoresPerDate[date] ? scoresPerDate[date] : 0;
      let accScore = acc[1] + dateScore;
      accProgression.push([date, accScore]);
      return [accProgression, accScore];
    }
    return datesList.reduce(fun, [[], 0])[0];
  }

  _getScoreProgression() {
    let scoresPerDate = this._sumScoresPerDate();
    let datesList = this._getDatesList(scoresPerDate);
    return this._assembleScoreProgression(scoresPerDate, datesList);
  }

  render() {
    let progression = this._getScoreProgression();
    console.log(progression);
    const { title } = this.props;
    return (
      <View style={styles.parent}>
        <NavigationBar
          title={title}/>
        <View style={styles.container}>
          <Chart
            style={styles.chart}
            data={progression}
            showDataPoint={true}
            color={colors.APP_COLOR}
            axisColor={colors.BORDER_COLOR}
            hideHorizontalGridLines={true}
            hideVerticalGridLines={false}
            dataPointFillColor={null}
            dataPointColor={null}
            xAxisHeight={50}
            showXAxisLabels={false}
            type="line"
            />
        </View>
      </View>);
  }
}
