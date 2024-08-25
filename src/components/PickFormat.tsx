/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import color from '../styles/color';
import CustomText from './CustomText';

const PickFormat = ({
  datas,
  title,
  description,
  placeholder,
  value,
  isEssential = false,
  handleValue,
}: {
  datas: string[];
  title?: string;
  description?: string;
  placeholder: string;
  value: string;
  isEssential?: boolean;
  handleValue: (value: string) => void;
}) => {
  return (
    <View style={styles.inputContainer}>
      <View
        style={[
          styles.essentialContainer,
          {justifyContent: title ? 'space-between' : 'flex-end'},
        ]}>
        {title && (
          <CustomText weight="600" style={styles.label}>
            {title}
          </CustomText>
        )}
        {isEssential && (
          <CustomText weight="500" style={styles.essential}>
            * 필수
          </CustomText>
        )}
      </View>
      {description && (
        <CustomText weight="500" style={styles.description}>
          {description}
        </CustomText>
      )}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue: string) => {
            handleValue(itemValue);
          }}
          style={styles.input}>
          <Picker.Item
            label={placeholder}
            style={styles.placeholder}
            value=""
            enabled={value ? true : false}
          />

          {datas.map(breed => (
            <Picker.Item
              key={breed}
              label={breed}
              value={breed}
              style={styles.item}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: color.gray[950],
  },
  essentialContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  essential: {
    fontSize: 13,
    color: color.blue[400],
  },
  description: {
    fontSize: 12,
    marginBottom: 8,
    color: color.gray[700],
  },
  pickerWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.gray[200],
    overflow: 'hidden',
  },
  placeholder: {
    fontSize: 13,
    color: color.gray[300],
  },
  item: {
    fontSize: 14,
    color: color.gray[950],
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: color.white,
  },
});

export default PickFormat;
