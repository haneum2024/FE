import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import StatusItem from './StatusItem';
import color from '../styles/color';
import CustomText from './CustomText';

const statusItems = [
  '음식을 잘 못 먹음',
  '숨소리/호흡 이상',
  '무기력함',
  '구토 증상',
  '스킨쉽 거부',
  '잦은 기침',
  '코가 축축함',
  '배변 색/상태 이상',
  '잇몸색 변화',
  '체중 변화',
];

const Status = () => {
  const [checkedItems, setCheckedItems] = React.useState(
    new Array(statusItems.length).fill(false),
  );

  const handleCheckboxToggle = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <View style={styles.statusContainer}>
      <CustomText style={styles.title}>상태</CustomText>
      <CustomText style={styles.subTitle}>
        반려견의 상태에서 이상 증세가 발견된다면 해당하는 항목을 체크해주세요.
      </CustomText>
      {statusItems.map((item, index) => (
        <StatusItem
          key={index}
          label={item}
          checked={checkedItems[index]}
          onPress={() => handleCheckboxToggle(index)}
        />
      ))}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => console.log('기록하기 pressed')}>
        기록하기
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    padding: 16,
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.gray[200],
    borderRadius: 10,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  title: {
    marginBottom: 16,
    fontSize: 22,
    fontWeight: 700,
  },
  subTitle: {
    marginBottom: 16,
    fontSize: 13,
    fontWeight: 500,
  },
  button: {
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: color.blue[600],
  },
});

export default Status;
