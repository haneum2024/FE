/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInput,
} from 'react-native';

import color from '../styles/color';
import CustomText from './CustomText';

const InputFormat = ({
  title,
  description,
  placeholder,
  value,
  isEssential = false,
  multiline = false,
  handleValue,
}: {
  title?: string;
  description?: string;
  placeholder: string;
  value: string;
  isEssential?: boolean;
  multiline?: boolean;
  handleValue: (value: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
        <TextInput
          value={value}
          placeholder={placeholder}
          editable={true}
          multiline={multiline}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={handleValue}
          style={[
            styles.input,
            {borderColor: isFocused ? color.blue[300] : color.gray[200]},
          ]}
          placeholderTextColor={color.gray[300]}
        />
      </View>
    </TouchableWithoutFeedback>
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
    lineHeight: 16,
    color: color.blue[400],
  },
  input: {
    fontSize: 13,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.white,
  },
});

export default InputFormat;
