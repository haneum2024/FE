import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';

import CustomText from '../components/CustomText';
import color from '../styles/color';
import LogoIcon from '../img/LogoIcon.svg';

const Splash = ({onFinish}: {onFinish: () => void}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => onFinish());
  }, [opacity, onFinish]);

  return (
    <Animated.View style={[styles.splashContainer, {opacity}]}>
      <LogoIcon width={86} height={86} />
      <CustomText style={styles.title}>해피마루</CustomText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Cafe24OhsquareAir-v2.0',
    color: color.blue[600],
  },
});

export default Splash;
