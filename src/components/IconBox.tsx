import React from 'react';
import {StyleSheet, Pressable} from 'react-native';

import CustomText from './CustomText';
import color from '../styles/color';

const IconBox = ({
  text,
  icon,
  onPress,
}: {
  text: string;
  icon: React.ReactNode;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.iconBoxContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      {icon}
      <CustomText weight="500" style={styles.title}>
        {text}
      </CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconBoxContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    gap: 7,
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.gray[200],
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.75,
    borderColor: color.blue[300],
    backgroundColor: color.blue[50],
  },
  title: {
    fontSize: 14,
    color: color.gray[950],
  },
});

export default IconBox;
