import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import * as colors from  './colors';

const FOOD_SECTION_SELECTED_ICON = require('../img/bike_white.png');
const FOOD_SECTION_UNSELECTED_ICON = require('../img/bike_green.png');
const WATER_SECTION_SELECTED_ICON = require('../img/water_white.png');
const WATER_SECTION_UNSELECTED_ICON = require('../img/water_blue.png');
const TRANSPORTATION_SECTION_SELECTED_ICON = require('../img/transportation_white.png');
const TRANSPORTATION_SECTION_UNSELECTED_ICON = require('../img/transportation_green.png');
const TEMPERATURE_SECTION_SELECTED_ICON = require('../img/add_white.png');
const TEMPERATURE_SECTION_UNSELECTED_ICON = require('../img/add.png');

const styles = StyleSheet.create({
  sectionBar: {
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: colors.BORDER_COLOR,
    flexDirection: "row",
    alignItems: "center"
  },
  icon_container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAIN_BACKGROUND_COLOR,
  },
  image_icon_container: {
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
    let firstSelectedSection = props.sections.length > 0 ?
      props.sections[0].id : null;
    this.state = {
      selectedSection: firstSelectedSection
    };
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
        style={styles.icon_container}>
        <TouchableHighlight
          style={
            [styles.image_icon_container,
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
      <View style={styles.sectionBar}>
        {this._renderSections()}
      </View>
    );
  }
}
