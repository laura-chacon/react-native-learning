import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Chart from 'react-native-chart';
import SectionBar from './sectionBar';
import * as colors from  './colors';

const FOOD_SECTION = "FOOD_SECTION";
const WATER_SECTION = "WATER_SECTION";
const TRANSPORTATION_SECTION = "TRANSPORTATION_SECTION";
const TEMPERATURE_SECTION = "TEMPERATURE_SECTION";

const FOOD_INDEX = 0;
const WATER_INDEX = 1;
const TRANSPORTATION_INDEX = 2;
const TEMPERATURE_INDEX = 3;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: colors.MAIN_BACKGROUND_COLOR
  },
  section_bar: {
    flex: 1,
  },
  wrapper: {
    flex: 4,
    backgroundColor: 'yellow'
  },
  actions_container: {}
});

export default class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: FOOD_SECTION,
      index: FOOD_INDEX
    };
  }

  _getActionTypesPerSection(section) {
    const { actionTypes } = this.props;
    if(section == FOOD_SECTION) {
      return actionTypes.Transportation;
    }
    else if (section == WATER_SECTION) {
      return actionTypes.Water;
    }
    else if (section == WATER_SECTION) {
      return actionTypes.Water;
    }
    else if (section == WATER_SECTION) {
      return actionTypes.Water;
    }
  }

  _renderActions(actions) {
    return null;
  }

  _renderActionTypesContainer(section) {
    let {width} = Dimensions.get('window');
    var actions = this._getActionTypesPerSection(section);
    console.log(actions);
    for(let i = 0; i < actions.length; i++) {
      console.log(actions[i]);
    }

    return (
      <View style={styles.actions_container}>
        <Text>fooo</Text>
      </View>
    );
  }

  _renderActionTypesContainerWithSwipper(section) {
    return (
      <View style={styles.wrapper}>
        <View>
          {this._renderActionTypesContainer(FOOD_SECTION)}
          {this._renderActionTypesContainer(WATER_SECTION)}
          {this._renderActionTypesContainer(TRANSPORTATION_SECTION)}
          {this._renderActionTypesContainer(TEMPERATURE_SECTION)}
        </View>
      </View>
    );
  }

  render() {
    const { sections } = this.props;
    console.log(sections);
    return (
      <View style={styles.parent}>
        <SectionBar
          sections={sections}
          style={styles.section_bar}
          onSectionPressed={(section) => {
            this.setState({selectedSection: section})
          }}/>
        
      </View>);
  }
}
