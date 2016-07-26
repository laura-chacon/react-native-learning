import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Chart from 'react-native-chart';
import SectionBar from './sectionBar';
import * as colors from  './colors';

const MEAT_ACTION_SELECTED_ICON = require('../img/food/meat_white@2x.png');
const MEAT_ACTION_UNSELECTED_ICON = require('../img/food/meat_red@2x.png');
const NO_MEAT_ACTION_SELECTED_ICON = require('../img/food/meat_white@2x.png');
const NO_MEAT_ACTION_UNSELECTED_ICON = require('../img/food/meat_red@2x.png');
const FISH_ACTION_SELECTED_ICON = require('../img/food/fish_white@2x.png');
const FISH_ACTION_UNSELECTED_ICON = require('../img/food/fish_red@2x.png');
const NO_FISH_ACTION_SELECTED_ICON = require('../img/food/fish_white@2x.png');
const NO_FISH_ACTION_UNSELECTED_ICON = require('../img/food/fish_red@2x.png');
const SHORT_SHOWER_ACTION_SELECTED_ICON = require('../img/water/shower_white@2x.png');
const SHORT_SHOWER_ACTION_UNSELECTED_ICON = require('../img/water/shower_blue@2x.png');
const LONG_SHOWER_ACTION_SELECTED_ICON = require('../img/water/shower_white@2x.png');
const LONG_SHOWER_ACTION_UNSELECTED_ICON = require('../img/water/shower_blue@2x.png');
const BATH_ACTION_SELECTED_ICON = require('../img/water/bath_white@2x.png');
const BATH_ACTION_UNSELECTED_ICON = require('../img/water/bath_blue@2x.png');
const COLD_WATER_ACTION_SELECTED_ICON = require('../img/water/cold_water_white@2x.png');
const COLD_WATER_ACTION_UNSELECTED_ICON = require('../img/water/cold_water_blue@2x.png');
const BIKE_ACTION_SELECTED_ICON = require('../img/transportation/bike_white@2x.png');
const BIKE_ACTION_UNSELECTED_ICON = require('../img/transportation/bike_green@2x.png');
const CAR_ACTION_SELECTED_ICON = require('../img/transportation/car_white@2x.png');
const CAR_ACTION_UNSELECTED_ICON = require('../img/transportation/car_green@2x.png');
const PLANE_ACTION_SELECTED_ICON = require('../img/transportation/plane_white@2x.png');
const PLANE_ACTION_UNSELECTED_ICON = require('../img/transportation/plane_green@2x.png');
const PUBLIC_TRANSPORT_ACTION_SELECTED_ICON = require('../img/transportation/transportation_white@2x.png');
const PUBLIC_TRANSPORT_ACTION_UNSELECTED_ICON = require('../img/transportation/transportation_green@2x.png');
const HEATING_ACTION_SELECTED_ICON = require('../img/temperature/heating_white@2x.png');
const HEATING_ACTION_UNSELECTED_ICON = require('../img/temperature/heating_purple@2x.png');
const COOLING_ACTION_SELECTED_ICON = require('../img/temperature/cooling_white@2x.png');
const COOLING_ACTION_UNSELECTED_ICON = require('../img/temperature/cooling_purple@2x.png');
const WINDOW_ACTION_SELECTED_ICON = require('../img/temperature/smart_home_white@2x.png');
const WINDOW_ACTION_UNSELECTED_ICON = require('../img/temperature/smart_home_purple@2x.png');
const SWEATER_ACTION_SELECTED_ICON = require('../img/temperature/sweater_white@2x.png');
const SWEATER_ACTION_UNSELECTED_ICON = require('../img/temperature/sweater_purple@2x.png');

const styles = StyleSheet.create({
  // Main containers
  parent: {
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
    flex: 1,
    backgroundColor: colors.MAIN_BACKGROUND_COLOR
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  horizontalLine: {
    height: 1,
    marginLeft: 20,
    marginRight: 20,
    borderTopWidth: 0.5,
    borderColor: "#e6e6e6"
  },
  sectionsBar: {
    alignItems: "center",
    justifyContent: 'center'
  },
  sectionsContainer: {
    flex: 6,
    flexDirection: 'row'
  },

  // Score
  scoreContainerLabelText: {
    marginRight: 5,
    fontSize: 16,
    color: "lightslategray"
  },
  scoreContainerNumber: {
    marginLeft: 5,
    fontSize: 16,
    color: colors.APP_COLOR,
    fontWeight: 'bold'
  },

  // Info Button
  sectionInfoButtonContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionInfoButton: {
    borderRadius: 20,
    backgroundColor: colors.APP_COLOR,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionInfoButtonText: {
    fontSize: 14,
    color: 'white',
    marginRight: 10
  },
  sectionInfoButtonInfoIconContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionInfoButtonInfoIconText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic'
  },
  sectionActionTypes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Action types
  actionTypesRowContainer: {
    flexDirection: 'row',
    flex: 1
  },
  actionTypeContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconActionTypeContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 40
  }
});

export default class Action extends Component {
  constructor(props) {
    super(props);
    let firstSelectedSection = props.sections.length > 0 ?
      props.sections[0].id : null;
    this.state = {
      selectedSection: firstSelectedSection,
      translateAnim: new Animated.Value(0),
      xPreviousPosition: 0,
      xPosition: 0
    };
  }

  _startAnimation() {
    Animated.timing(
      this.state.translateAnim,
      {
        toValue: 1,
        duration: 600
      }
    ).start();
    setTimeout(() => this.setState({
      translateAnim: new Animated.Value(0)
    }), 600);
  }

  _calculateNextXPosition(newSelectedSection) {
    let {width} = Dimensions.get('window');
    return -width * this._getSectionIndex(newSelectedSection);
  }

  _getSectionIndex(section) {
    let fun = function(s) {
      return s.id == section;
    }
    return this.props.sections.findIndex(fun);
  }

  _sectionInfoButtonPressed(section) {
    // TODO
  }

  _calculateTotalScore() {
    let fun = function(acc, action) {
      return acc + action.score;
    }
    return this.props.history.reduce(fun, 0);
  }

  _getSectionInfoButtonBackgroundColor(section) {
    return eval("colors." + section.toUpperCase() + "_SECTION_COLOR");
  }

  _getBorderColor(section) {
    return eval("colors." + section.toUpperCase() + "_SECTION_COLOR");
  }

  _getActionTypesRows(actionTypes) {
    let actionTypesRows = [];
    for (let i = 0; i < actionTypes.length; i += 2) {
      let actionTypesRow = [actionTypes[i]];
      if (i + 1 < actionTypes.length) {
        actionTypesRow.push(actionTypes[i+1]);
      }
      actionTypesRows.push(actionTypesRow);
    }
    return actionTypesRows;
  }

  _actionToImageSource(action) {
    // to change
    let isSelected = this.state.selectedSection == action ?
      "SELECTED" : "UNSELECTED";
    let imageSourceConst =
      action.toUpperCase() + "_ACTION_" + isSelected + "_ICON";
    return eval(imageSourceConst);
  }

  /* --------------------------------------------------------------------------
  RENDER
  ---------------------------------------------------------------------------*/

  _renderSectionInfoButton(section) {
    let color = this._getSectionInfoButtonBackgroundColor(section.id);
    return (
      <View style={styles.sectionInfoButtonContainer}>
        <View
          style={
            [styles.sectionInfoButton,
              {backgroundColor: color}]}
          onPress={() => this._sectionInfoButtonPressed(section)}>
          <Text style={styles.sectionInfoButtonText}>
            {section.display.toUpperCase()}
          </Text>
          <View style={styles.sectionInfoButtonInfoIconContainer}>
            <Text style={styles.sectionInfoButtonInfoIconText}>
              i
            </Text>
          </View>
        </View>
      </View>
    );
  }

  _renderActionType(action, borderColorSection) {
    if(action != undefined) {
      return (
        <View style={styles.actionTypeContainer}>
          <TouchableHighlight style={[styles.iconActionTypeContainer, {borderColor: borderColorSection}]}>
            <Image
              style={styles.icon}
              source={this._actionToImageSource(action.id)}>
            </Image>
          </TouchableHighlight>
          <Text>{action.display}</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.actionTypeContainer}>
        </View>
      );
    }
  }

  _renderActionTypesForSection(section) {
    let thisInstance = this;
    let borderColorSection = this._getBorderColor(section);
    let actionTypes = this.props.actionTypes[section];
    let actionTypesRows = this._getActionTypesRows(actionTypes)
    let fun = function(row) {
      return (
        <View style={styles.actionTypesRowContainer}>
          {thisInstance._renderActionType(row[0], borderColorSection)}
          {thisInstance._renderActionType(row[1], borderColorSection)}
        </View>
      );
    }
    return actionTypesRows.map(fun);
  }

  _renderSection(section) {
    let {width} = Dimensions.get('window');
    return (
      <Animated.View
        key={section.id}
        style={{
          width: width,
          transform: [{
            translateX: this.state.translateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [this.state.xPreviousPosition, this.state.xPosition]
            })
          }]
        }}>
        {this._renderSectionInfoButton(section)}
        {this._renderActionTypesForSection(section.id)}
      </Animated.View>);
  }

  _renderSections() {
    let thisInstance = this;
    let fun = function(section) {
      return thisInstance._renderSection(section);
    }
    return this.props.sections.map(fun);
  }

  _renderScore() {
    return (
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreContainerLabelText}>
          TOTAL SCORE
        </Text>
        <Text style={styles.scoreContainerNumber}>
          {this._calculateTotalScore()}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.parent}>
        {this._renderScore()}
        <View style={styles.horizontalLine}/>
        <SectionBar
          sections={this.props.sections}
          style={styles.sectionsBar}
          onSectionPressed={(selectedSection) => {
            let xPreviousPosition = this.state.xPosition;
            let xPosition = this._calculateNextXPosition(selectedSection);
            this.setState({selectedSection, xPreviousPosition, xPosition});
            this._startAnimation();
          }}/>
        <View style={styles.sectionsContainer}>
          {this._renderSections()}
        </View>
      </View>);
  }
}
