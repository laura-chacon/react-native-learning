import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import * as colors from  './colors';

const FOOD_SECTION_SELECTED_ICON = require('../img/food/food_white.png');
const FOOD_SECTION_UNSELECTED_ICON = require('../img/food/food_red.png');
const WATER_SECTION_SELECTED_ICON = require('../img/water/water_white.png');
const WATER_SECTION_UNSELECTED_ICON = require('../img/water/water_blue.png');
const TRANSPORTATION_SECTION_SELECTED_ICON =
  require('../img/transportation/transportation_white.png');
const TRANSPORTATION_SECTION_UNSELECTED_ICON =
  require('../img/transportation/transportation_green.png');
const TEMPERATURE_SECTION_SELECTED_ICON =
  require('../img/temperature/smart_home_white.png');
const TEMPERATURE_SECTION_UNSELECTED_ICON =
  require('../img/temperature/smart_home_purple.png');

const styles = StyleSheet.create({
  sectionsBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.MAIN_BACKGROUND_COLOR,
  },
  iconContainerImage: {
    borderRadius: 30,
    padding: 10,
    borderWidth: 3,
  },
  icon: {
    width: 30,
    height: 30
  }
});

export default class SectionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: this._getDefaultSelectedSection(props)
    };
  }

  componentWillUpdate() {
    if (this.state.selectedSection == null) {
      this.setState({selectedSection: this._getDefaultSelectedSection(this.props)});
    }
  }

  _getDefaultSelectedSection(props) {
    let firstSelectedSection = props.sections.length > 0 ?
      props.sections[0].id : null;
    return firstSelectedSection;
  }

  _onSectionPressed(section) {
    this.props.onSectionPressed(section);
    this.setState({selectedSection: section});
  }

  _sectionToImageSource(section) {
    let isSelected = this.state.selectedSection == section ?
      "SELECTED" : "UNSELECTED";
    let imageSourceConst =
      section.toUpperCase() + "_SECTION_" + isSelected + "_ICON";
    return eval(imageSourceConst);
  }

  _getIconBackgroundColor(section) {
    if (this.state.selectedSection == section) {
      return eval("colors." + section.toUpperCase() + "_SECTION_COLOR");
    }
    else {
      return colors.MAIN_BACKGROUND_COLOR;
    }
  }

  _getBorderColor(section) {
    return eval("colors." + section.toUpperCase() + "_SECTION_COLOR");
  }

  _renderSection(section) {
    return (
      <View
        key={section}
        style={styles.iconContainer}>
        <TouchableHighlight
          style={
            [styles.iconContainerImage,
              {backgroundColor: this._getIconBackgroundColor(section)},
              {borderColor: this._getBorderColor(section)}]}
          underlayColor={null}
          onPress={() => {
            this._onSectionPressed(section);
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image style={styles.icon}
              source={this._sectionToImageSource(section)}/>
          </View>
          </TouchableHighlight>
      </View>
    );
  }

  _renderSections() {
    let thisInstance = this;
    let fun = function(section) {
      return thisInstance._renderSection(section.id);
    }
    return this.props.sections.map(fun);
  }

  render() {
    return (
      <View style={styles.sectionsBar}>
        {this._renderSections()}
      </View>
    );
  }
}
