import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Checkbox} from 'react-native-paper';
import color from '../styles/color';
import CustomText from './CustomText';

interface StatusItemProps {
  label: string;
  checked: boolean;
  isEditMode: boolean;
  icon: React.ReactNode;
  onPress: () => void;
}

const StatusItem = ({
  label,
  checked,
  isEditMode,
  icon,
  onPress,
}: StatusItemProps) => {
  const getCheckedTextColor = () => {
    if (checked && isEditMode) {
      return color.blue[600];
    } else if (checked && !isEditMode) {
      return color.gray[900];
    }
    return color.gray[400];
  };

  const getCheckedBackgroundColor = () => {
    if (checked && isEditMode) {
      return color.blue[100];
    } else if (checked && !isEditMode) {
      return color.gray[100];
    }
    return color.gray[50];
  };

  return (
    <TouchableOpacity
      style={[
        styles.statusItemContainer,
        isEditMode
          ? styles.statusItemContainer
          : styles.statusItemIconContainer,
        {backgroundColor: getCheckedBackgroundColor()},
      ]}
      disabled={!isEditMode}
      onPress={onPress}>
      {isEditMode ? (
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          color={color.blue[600]}
        />
      ) : (
        checked && icon
      )}
      <CustomText
        disabled={!isEditMode}
        style={[
          styles.label,
          {color: getCheckedTextColor()},
          checked ? styles.checkedLabel : styles.uncheckedLabel,
        ]}>
        {label}
      </CustomText>
    </TouchableOpacity>
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
    height: 40,
  },
  statusItemIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 16,
    gap: 10,
  },
  label: {
    marginLeft: 8,
    fontSize: 13,
  },
  checkedLabel: {
    fontWeight: 700,
  },
  uncheckedLabel: {
    fontWeight: 400,
  },
});

export default StatusItem;
