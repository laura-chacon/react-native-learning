import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightseagreen'
  }
});

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return <View style={styles.container}>
      <Text>
        ROOT
      </Text>
    </View>
  }
}
