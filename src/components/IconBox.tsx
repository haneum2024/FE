import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';

import CustomText from './CustomText';
import color from '../styles/color';

const IconBox = ({
  label,
  text,
  icon,
  onPress,
}: {
  label: string;
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
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <CustomText weight="600" style={styles.text}>
            {text}
          </CustomText>
        </View>
        <CustomText weight="600" style={styles.label}>
          {label}
        </CustomText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginVertical: 16,
    gap: 10,
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
  contentContainer: {
    display: 'flex',
    gap: 4,
  },
  textContainer: {
    backgroundColor: color.blue[50],
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    color: color.blue[600],
  },
  label: {
    alignItems: 'flex-start',
    marginLeft: 2,
    fontSize: 16,
    color: color.gray[950],
  },
});

export default IconBox;
