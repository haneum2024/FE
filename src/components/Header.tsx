import React from 'react';
import {StyleSheet, View} from 'react-native';

import color from '../styles/color';
import LogoIcon from '../img/LogoIcon.svg';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <LogoIcon width={30} height={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: color.white,
  },
});

export default Header;
