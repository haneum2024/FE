import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Pressable} from 'react-native';

import color from '../styles/color';
import CustomText from './CustomText';
import DatePicker from 'react-native-date-picker';

const DateTimePick = ({
  title,
  placeholder,
  date,
  mode,
  handleValue,
}: {
  title: string;
  placeholder: string;
  date: string;
  mode: 'date' | 'datetime';
  handleValue: (date: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  // date가 유효한지 확인하고, 유효하지 않으면 현재 날짜로 설정
  const stringToDate = date ? new Date(date) : new Date();
  const isValidDate = !isNaN(stringToDate.getTime());

  const pressBirthButton = () => {
    setOpen(true);
  };

  const handleConfirm = (selectedDate: Date) => {
    setOpen(false);

    const formatDate = (newDate: Date) => {
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
      const day = String(newDate.getDate()).padStart(2, '0');
      const hours = String(newDate.getHours()).padStart(2, '0');
      const minutes = String(newDate.getMinutes()).padStart(2, '0');

      if (mode === 'date') {
        return `${year}-${month}-${day}`;
      } else if (mode === 'datetime') {
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }
    };

    const stringDate = formatDate(selectedDate) as string;
    handleValue(stringDate);
    setIsSelected(true);
  };

  return (
    <View style={styles.inputContainer}>
      <CustomText weight="600" style={styles.label}>
        {title}
      </CustomText>
      <Pressable onPress={pressBirthButton}>
        <TextInput
          value={isSelected ? date.toString() : ''}
          placeholder={placeholder}
          editable={false}
          style={styles.input}
          placeholderTextColor={color.gray[300]}
        />
      </Pressable>
      <DatePicker
        modal
        mode={mode}
        open={open}
        title={`${title} 선택`}
        confirmText="확인"
        cancelText="취소"
        minimumDate={new Date('2000-01-01')}
        maximumDate={new Date()}
        date={isValidDate ? stringToDate : new Date()}
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.white,
    borderColor: color.gray[200],
    color: color.gray[950],
  },
});

export default DateTimePick;
