import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const netgenLogo = require('../../assets/logo_simple.png');

const styles = StyleSheet.create({
  header: {
    height: 90,
    backgroundColor: '#ef4134',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftItem: {
    marginLeft: 5,
  },
  centerItem: {
    height: 50,
    width: 50,
  },
  rightItem: {
    marginRight: 10,
    transform: [{ rotate: '90deg' }],
  },
});

export default class Header extends Component {
  static propTypes = {
    isMenuOpened: PropTypes.bool.isRequired,
    onPressMenu: PropTypes.func.isRequired,
    onSearchPress: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isMenuOpened, onPressMenu } = this.props;
    const leftIcon = isMenuOpened ? 'cross' : 'menu';

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onPressMenu()}>
          <Icon
            name={leftIcon}
            size={40}
            color="#fff"
            style={styles.leftItem}
          />
        </TouchableOpacity>
        <Image
          style={styles.centerItem}
          source={netgenLogo}
        />
        <Icon
          name="magnifying-glass"
          size={32}
          color="#fff"
          style={styles.rightItem}
        />
      </View>
    );
  }
}
