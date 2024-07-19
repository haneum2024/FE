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
  placeholder,
  value,
  multiline = false,
  handleValue,
}: {
  title: string;
  placeholder: string;
  value: string;
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
        <CustomText weight="600" style={styles.label}>
          {title}
        </CustomText>
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
    marginBottom: 8,
    color: color.gray[950],
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: color.white,
  },
});

export default InputFormat;