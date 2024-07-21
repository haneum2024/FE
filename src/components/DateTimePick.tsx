import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Pressable} from 'react-native';

import color from '../styles/color';
import CustomText from './CustomText';
import DatePicker from 'react-native-date-picker';

const DateTimePick = ({
  title,
  placeholder,
  date,
  handleValue,
}: {
  title: string;
  placeholder: string;
  date: Date;
  handleValue: (date: Date) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const pressBirthButton = () => {
    setOpen(true);
  };

  const handleConfirm = (selectedDate: Date) => {
    setOpen(false);
    handleValue(selectedDate);
    setIsSelected(true);
  };

  return (
    <View style={styles.inputContainer}>
      <CustomText weight="600" style={styles.label}>
        {title}
      </CustomText>
      <Pressable onPress={pressBirthButton}>
        <TextInput
          value={isSelected ? date.toISOString().split('T')[0] : ''}
          placeholder={placeholder}
          editable={false}
          style={styles.input}
          placeholderTextColor={color.gray[300]}
        />
      </Pressable>
      <DatePicker
        modal
        mode="date"
        open={open}
        title="생년월일 선택"
        confirmText="확인"
        cancelText="취소"
        minimumDate={new Date('2000-01-01')}
        maximumDate={new Date()}
        date={date}
        buttonColor={color.blue[600]}
        dividerColor={color.blue[600]}
        onConfirm={selectedDate => {
          handleConfirm(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
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
    borderColor: color.gray[200],
    color: color.gray[950],
  },
});

export default DateTimePick;
