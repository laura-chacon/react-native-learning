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
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  sectionActionTypes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Action types
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


  /* --------------------------------------------------------------------------
  RENDER
  ---------------------------------------------------------------------------*/

  _renderSectionInfoButton(section) {
    return (
      <View style={styles.sectionInfoButtonContainer}>
        <View
          style={styles.sectionInfoButton}
          onPress={() => this._sectionInfoButtonPressed(section)}>
          <Text style={styles.sectionInfoButtonText}>
            {section.display}
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

  _renderActionTypesForSection(section) {
    return (
      <Text>{section}</Text>
    );
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
