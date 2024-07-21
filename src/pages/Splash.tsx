import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';

import color from '../styles/color';
import SplashLogoIcon from '../img/SplashLogoIcon.svg';

const Splash = ({onFinish}: {onFinish: () => void}) => {
  const opacity = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => onFinish());
  }, [opacity, onFinish]);

  return (
    <Animated.View style={[styles.splashContainer, {opacity}]}>
      <SplashLogoIcon width={75} height={75} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.blue[600],
  },
});

export default Splash;
