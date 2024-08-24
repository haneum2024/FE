import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

import color from '../styles/color';
import HeaderIcon from '../img/HeaderIcon.svg';
import ReadNotificationIcon from '../img/ReadNotificationIcon.svg';

interface HeaderProps {
  navigation: NavigationProp<any>;
}

const Header = ({navigation}: HeaderProps) => {
  const moveToNotificationPage = () => {
    navigation.navigate('Notification');
  };
  return (
    <View style={styles.headerContainer}>
      <HeaderIcon style={styles.logo} width={40} height={40} />
      <TouchableOpacity activeOpacity={0.8} onPress={moveToNotificationPage}>
        <ReadNotificationIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: color.white,
  },
  logo: {
    top: 6,
  },
});

export default Header;
