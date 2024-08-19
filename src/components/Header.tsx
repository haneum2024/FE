import React from 'react';
import {StyleSheet, View} from 'react-native';

import color from '../styles/color';
import HeaderIcon from '../img/HeaderIcon.svg';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <HeaderIcon width={40} height={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 4,
    backgroundColor: color.white,
  },
});

export default Header;
