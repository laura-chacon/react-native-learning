import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Chart from 'react-native-chart';
import SectionBar from './sectionBar';
import * as colors from  './colors';

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: colors.MAIN_BACKGROUND_COLOR
  },
  sectionBar: {
    flex: 1,
  },
  sectionsActionTypes: {
    flex: 4,
    backgroundColor: 'yellow',
    flexDirection: 'row'
  },
  sectionActionTypes: {
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

  _renderActionTypesForSection(section) {
    let {width} = Dimensions.get('window');
    return (
      <Animated.View
        key={section}
        style={{
          width: width,
          transform: [{
            translateX: this.state.translateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [this.state.xPreviousPosition, this.state.xPosition]
            })
          }]
        }}>
        <Text>{section}</Text>
      </Animated.View>);
  }

  _renderActionTypesForAllSections() {
    let thisInstance = this;
    let fun = function(section) {
      return thisInstance._renderActionTypesForSection(section.id);
    }
    return this.props.sections.map(fun);
  }

  render() {
    return (
      <View style={styles.parent}>
        <SectionBar
          sections={this.props.sections}
          style={styles.sectionBar}
          onSectionPressed={(selectedSection) => {
            let xPreviousPosition = this.state.xPosition;
            let xPosition = this._calculateNextXPosition(selectedSection);
            this.setState({selectedSection, xPreviousPosition, xPosition});
            this._startAnimation();
          }}/>
        <View style={styles.sectionsActionTypes}>
          {this._renderActionTypesForAllSections()}
        </View>
      </View>);
  }
}
