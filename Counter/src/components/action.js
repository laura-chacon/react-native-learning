import React, { Component } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CustomCell,
  Section,
  TableView
} from 'react-native-tableview-simple'
import Chart from 'react-native-chart';
import SectionBar from './sectionBar';
import NavigationBar from './navigationBar';
import * as colors from  './colors';

const MEAT_ACTION_SELECTED_ICON = require('../img/food/meat_white@2x.png');
const MEAT_ACTION_UNSELECTED_ICON = require('../img/food/meat_red@2x.png');
const NO_MEAT_ACTION_SELECTED_ICON = require('../img/food/no_meat_white.png');
const NO_MEAT_ACTION_UNSELECTED_ICON = require('../img/food/no_meat_red.png');
const FISH_ACTION_SELECTED_ICON = require('../img/food/fish_white@2x.png');
const FISH_ACTION_UNSELECTED_ICON = require('../img/food/fish_red@2x.png');
const NO_FISH_ACTION_SELECTED_ICON = require('../img/food/no_fish_white.png');
const NO_FISH_ACTION_UNSELECTED_ICON = require('../img/food/no_fish_red.png');
const SHORT_SHOWER_ACTION_SELECTED_ICON = require('../img/water/shower_white@2x.png');
const SHORT_SHOWER_ACTION_UNSELECTED_ICON = require('../img/water/shower_blue@2x.png');
const LONG_SHOWER_ACTION_SELECTED_ICON = require('../img/water/shower_white@2x.png');
const LONG_SHOWER_ACTION_UNSELECTED_ICON = require('../img/water/shower_blue@2x.png');
const BATH_ACTION_SELECTED_ICON = require('../img/water/bath_white@2x.png');
const BATH_ACTION_UNSELECTED_ICON = require('../img/water/bath_blue@2x.png');
const COLD_WATER_ACTION_SELECTED_ICON = require('../img/water/cold_water_white.png');
const COLD_WATER_ACTION_UNSELECTED_ICON = require('../img/water/cold_water_blue@2x.png');
const BIKE_ACTION_SELECTED_ICON = require('../img/transportation/bike_white@2x.png');
const BIKE_ACTION_UNSELECTED_ICON = require('../img/transportation/bike_green@2x.png');
const CAR_ACTION_SELECTED_ICON = require('../img/transportation/car_white@2x.png');
const CAR_ACTION_UNSELECTED_ICON = require('../img/transportation/car_green@2x.png');
const PLANE_ACTION_SELECTED_ICON = require('../img/transportation/plane_white@2x.png');
const PLANE_ACTION_UNSELECTED_ICON = require('../img/transportation/plane_green@2x.png');
const PUBLIC_TRANSPORT_ACTION_SELECTED_ICON = require('../img/transportation/public_transport_white@2x.png');
const PUBLIC_TRANSPORT_ACTION_UNSELECTED_ICON = require('../img/transportation/public_transport_green@2x.png');
const HEATING_ACTION_SELECTED_ICON = require('../img/temperature/heating_white@2x.png');
const HEATING_ACTION_UNSELECTED_ICON = require('../img/temperature/heating_purple@2x.png');
const COOLING_ACTION_SELECTED_ICON = require('../img/temperature/cooling_white@2x.png');
const COOLING_ACTION_UNSELECTED_ICON = require('../img/temperature/cooling_purple@2x.png');
const WINDOW_ACTION_SELECTED_ICON = require('../img/temperature/window_white@2x.png');
const WINDOW_ACTION_UNSELECTED_ICON = require('../img/temperature/window_purple@2x.png');
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
  textOk: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.APP_COLOR,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
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
  textSectionTitle: {
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'gray',
    textAlign: 'justify',
    lineHeight: 15,
    marginBottom: 8
  },
  textSectionInfo: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    color: 'gray',
    textAlign: 'justify',
    lineHeight: 22
  },
  infoSectionContainer: {
    margin: 20
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
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 40
  },
  textAction: {
    fontSize: 10,
    marginTop: 4
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  }
});

export default class Action extends Component {
  constructor(props) {
    super(props);
    let firstSelectedSection = props.sections.length > 0 ?
      props.sections[0].id : null;
    this.state = {
      selectedSection: firstSelectedSection,
      selectedAction: null,
      pointsFromSelectedAction: null,
      translateAnim: new Animated.Value(0),
      xPreviousPosition: 0,
      xPosition: 0,
      modalVisible: false,
      fadeAnimOkButton: new Animated.Value(1),
      fadeAnimLoading: new Animated.Value(0),
      historyLength: props.history.length,
      isOkPressed: false
    };
  }

  componentDidUpdate() {
    if(this.state.historyLength < this.props.history.length) {
      this._startOpacityAnimationLoading(0);
      this._startOpacityAnimationOkButton(1);
      this.setState(
        {historyLength: this.props.history.length},
      )
    }
  }

  componentWillUpdate() {
    if(this.state.historyLength < this.props.history.length) {
      this.setState(
        {isOkPressed: false}
      )
    }
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
    this.setModalVisible(true);
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

  _getSectionColor(section) {
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
    let isSelected = this.state.selectedAction == action ?
      "SELECTED" : "UNSELECTED";
    let imageSourceConst =
      action.toUpperCase() + "_ACTION_" + isSelected + "_ICON";
    return eval(imageSourceConst);
  }

  _onActionTypePressed(action) {
    if (this.state.selectedAction == action.id) {
      this.setState({selectedAction: null});
    }
    else {
      this.setState({selectedAction: action.id});
      this.setState({pointsFromSelectedAction: action.points});
    }
  }

  _getIconBackgroundColor(action, section) {
    if (this.state.selectedAction == action) {
      return eval("colors." + section.toUpperCase() + "_SECTION_COLOR");
    }
    else {
      return colors.MAIN_BACKGROUND_COLOR;
    }
  }

  _startOpacityAnimationOkButton(valueToFade) {
    Animated.timing(
      this.state.fadeAnimOkButton,
      {
        toValue: valueToFade,
        duration: 300
      }
    ).start();
    setTimeout(() => this.setState({
      fadeAnimOkButton: new Animated.Value(valueToFade)
    }), 300);
  }

  _startOpacityAnimationLoading(valueToFade) {
    Animated.timing(
      this.state.fadeAnimLoading,
      {
        toValue: valueToFade,
        duration: 500
      }
    ).start();
    setTimeout(() => this.setState({
      fadeAnimLoading: new Animated.Value(valueToFade)
    }), 500);
  }

  _onOKPressed() {
    const { nextActionId, uid, token, addAction } = this.props;
    this.setState({isOkPressed: true});
    this._startOpacityAnimationOkButton(0);
    this._startOpacityAnimationLoading(1);
    addAction(
      uid,
      nextActionId,
      this.state.selectedSection,
      this.state.selectedAction,
      this.state.pointsFromSelectedAction,
      token
    );
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  /* --------------------------------------------------------------------------
  RENDER
  ---------------------------------------------------------------------------*/

  _renderSectionInfoButton(section) {
    let color = this._getSectionInfoButtonBackgroundColor(section.id);
    return (
      <View style={styles.sectionInfoButtonContainer}>
        <TouchableHighlight
          underlayColor={null}
          onPress={() => {
            this._sectionInfoButtonPressed(section)
          }}>
          <View
            style={
              [styles.sectionInfoButton,
              {backgroundColor: color}]}>
            <Text style={styles.sectionInfoButtonText}>
              {section.display.toUpperCase()}
            </Text>
            <View style={styles.sectionInfoButtonInfoIconContainer}>
              <Text style={styles.sectionInfoButtonInfoIconText}>
                i
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _renderActionType(action, section) {
    if(action != undefined) {
      let sectionColor = this._getSectionColor(section);
      return (
        <View
          style={styles.actionTypeContainer}
          key={action.actionId}>
          <TouchableHighlight
            style={
              [styles.iconActionTypeContainer,
                {backgroundColor: this._getIconBackgroundColor(action.id, section)},
                {borderColor: sectionColor}]}
            underlayColor={null}
            onPress={() => {
              this._onActionTypePressed(action);
            }}>
            <Image
              style={styles.icon}
              source={this._actionToImageSource(action.id)}>
            </Image>
          </TouchableHighlight>
          <Text
            style={[
              styles.textAction,
              {color: sectionColor}
            ]}>
            {action.display.toUpperCase()}
          </Text>
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
    let actionTypes = this.props.actionTypes[section];
    let actionTypesRows = this._getActionTypesRows(actionTypes)
    let fun = function(row, index) {
      return (
        <View
          key={section + "-" + index}
          style={styles.actionTypesRowContainer}>
          {thisInstance._renderActionType(row[0], section)}
          {thisInstance._renderActionType(row[1], section)}
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

  _renderOKButton() {
    return (
      <TouchableHighlight
        style={styles.okButton}
        underlayColor={null}
        onPress={() => {
          this._onOKPressed();
        }}>
        <Animated.View
          style={{opacity: this.state.fadeAnimOkButton}}>
          <Text style={styles.textOk}>OK</Text>
        </Animated.View>
      </TouchableHighlight>
    );
  }

  _renderLoading() {
    return (
      <Animated.View
        style={{opacity: this.state.fadeAnimLoading}}>
        <ActivityIndicator
          animating={true}
          style={[styles.centering, {height: 30}]}
          size="small"
          />
      </Animated.View>
    );
  }

  _renderOKButtonOrLoading(){
    if(this.state.isOkPressed) {
      return this._renderLoading();
    }
    else {
      return this._renderOKButton();
    }
  }

  _renderOKButtonAndLoading(tab) {
    if(this.state.selectedAction == null) {
      return (
        <Text style={
          [styles.textOk,
          {color: 'gray'}]}>
          OK
        </Text>
      );
    }
    else {
      return (
        <View
          style={{flexDirection: 'row'}}>
          {this._renderOKButtonOrLoading()}
        </View>
      );
    }
  }

  _renderCloseButon() {
    return (
      <TouchableHighlight
        style={styles.okButton}
        underlayColor={null}
        onPress={() => {
          this.setModalVisible(!this.state.modalVisible)
        }}>
        <Text style={styles.textOk}>Close</Text>
      </TouchableHighlight>
    );
  }

  _renderActionInTable(actions) {
    let fun = function(action) {
      return (
        <CustomCell
          contentContainerStyle={{ height: 30}}
          key={action.id}
          cellStyle="LeftDetail">
          <Text style={{
              flex: 1,
              fontSize: 10,
              color: colors.APP_COLOR,
              fontFamily: 'Helvetica',
              fontStyle: 'italic',
             }}>
            {action.display.toUpperCase()}
          </Text>
          <Text style={{
              flex: 1,
              fontSize: 10,
              color: colors.APP_COLOR,
              fontFamily: 'Helvetica',
              fontStyle: 'italic',
              textAlign: 'left'
             }}>
            {action.points}
          </Text>
        </CustomCell>
      );
    }
    return actions.map(fun);
  }

  _renderInfoTable(actions) {
    return (
      <TableView>
        <Section>
          {this._renderActionInTable(actions)}
        </Section>
      </TableView>
    );
  }

  _renderTextInfoSection(actions, section) {
    return (
      <View style={styles.infoSectionContainer}>
        <Text style={styles.textSectionTitle}>
          {"\n"}{section.display}
        </Text>
        <Text style={styles.textSectionInfo}>
          {section.info}{"\n"}
        </Text>
        {this._renderInfoTable(actions)}
      </View>
    );
  }

  _renderModal() {
    const { sections, actionTypes } = this.props;
    if (sections.length > 0) {
      let section, actions;
      if (this.state.selectedSection == null) {
        section = sections.find((element) => element.id == "food")
      }
      else {
        section = sections.find((element) => element.id == this.state.selectedSection);
      }
      let sectionId = section.id;
      return (
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}>
          <NavigationBar
            rightContainer={this._renderCloseButon()}/>
          <ScrollView
            style={{backgroundColor: colors.MAIN_BACKGROUND_COLOR, flex: 1}}>
            {this._renderTextInfoSection(actionTypes[section.id], section)}
          </ScrollView>
        </Modal>
      );
    }
  }

  render() {
    const { title, selectedTab } = this.props;
    return (
      <View style={styles.parent}>
        {this._renderModal()}
        <NavigationBar
          title={title}
          rightContainer={this._renderOKButtonAndLoading(selectedTab)}/>
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
        </View>
      );
  }
}
