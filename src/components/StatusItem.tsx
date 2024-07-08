import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';
import color from '../styles/color';
import CustomText from './CustomText';

interface StatusItemProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

const StatusItem = ({label, checked, onPress}: StatusItemProps) => {
  return (
    <View
      style={[
        styles.statusItemContainer,
        {backgroundColor: checked ? color.blue[100] : color.gray[50]},
      ]}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={onPress}
        color={color.blue[600]}
      />
      <CustomText
        onPress={onPress}
        style={[
          styles.label,
          checked ? styles.checkedLabel : styles.uncheckedLabel,
        ]}>
        {label}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  statusItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  label: {
    marginLeft: 8,
    fontSize: 13,
  },
  checkedLabel: {
    color: color.blue[900],
    fontWeight: 700,
  },
  uncheckedLabel: {
    color: color.gray[700],
    fontWeight: 400,
  },
});

export default StatusItem;
