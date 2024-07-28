import React, {useMemo, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Portal, Snackbar} from 'react-native-paper';

import CustomText from './CustomText';
import Diagnosis from './Diagnosis';
import StatusItem from './StatusItem';
import color from '../styles/color';

import FoodIcon from '../img/FoodIcon.svg';
import BreathIcon from '../img/BreathIcon.svg';
import HelplessIcon from '../img/HelplessIcon.svg';
import VomitIcon from '../img/VomitIcon.svg';
import RefusalIcon from '../img/RefusalIcon.svg';
import CoughIcon from '../img/CoughIcon.svg';
import WetNoseIcon from '../img/WetNoseIcon.svg';
import PoopAlertIcon from '../img/PoopAlertIcon.svg';
import TeethIcon from '../img/TeethIcon.svg';
import FatIcon from '../img/FatIcon.svg';

const statusItems = [
  {title: '음식을 잘 못 먹음', icon: <FoodIcon width={24} height={24} />},
  {title: '숨소리/호흡 이상', icon: <BreathIcon width={24} height={24} />},
  {title: '무기력함', icon: <HelplessIcon width={24} height={24} />},
  {title: '구토 증상', icon: <VomitIcon width={24} height={24} />},
  {title: '스킨쉽 거부', icon: <RefusalIcon width={24} height={24} />},
  {title: '잦은 기침', icon: <CoughIcon width={24} height={24} />},
  {title: '코가 축축함', icon: <WetNoseIcon width={24} height={24} />},
  {title: '배변 색/상태 이상', icon: <PoopAlertIcon width={24} height={24} />},
  {title: '잇몸색 변화', icon: <TeethIcon width={24} height={24} />},
  {title: '체중 변화', icon: <FatIcon width={24} height={24} />},
];

const Status = () => {
  const [checkedItems, setCheckedItems] = useState(
    new Array(statusItems.length).fill(false),
  );
  const [isEditMode, setIsEditMode] = useState(true);
  const [visible, setVisible] = useState(false);

  const statusStyle = useMemo(() => {
    const trueCount = checkedItems.filter(Boolean).length;

    let text = '';
    let backgroundColor = '';
    if (trueCount === 0) {
      text = '좋음';
      backgroundColor = color.blue[600];
    } else if (trueCount <= 2) {
      text = '보통';
      backgroundColor = color.blue[400];
    } else if (trueCount <= 5) {
      text = '주의';
      backgroundColor = color.orange[400];
    } else if (trueCount <= 8) {
      text = '경계';
      backgroundColor = color.orange[600];
    } else {
      text = '위험';
      backgroundColor = color.orange[800];
    }
    return {text, backgroundColor};
  }, [checkedItems]);

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const handleCheckboxToggle = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const submitStatus = () => {
    setIsEditMode(false);
    setVisible(true);
  };

  return (
    <View style={styles.statusContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.statusView}>
          <CustomText weight="700" style={styles.title}>
            상태
          </CustomText>
          {!isEditMode && (
            <CustomText
              weight="500"
              style={[
                styles.statusBox,
                {backgroundColor: statusStyle.backgroundColor},
              ]}>
              {statusStyle.text}
            </CustomText>
          )}
        </View>
        {!isEditMode && (
          <TouchableOpacity style={styles.changeBox} onPress={handleEditMode}>
            <CustomText weight="500" style={styles.change}>
              수정
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
      {isEditMode ? (
        <CustomText weight="500" style={styles.subTitle}>
          반려견의 상태에서 이상 증세가 발견된다면 해당하는 항목을 체크해주세요.
        </CustomText>
      ) : (
        <Diagnosis
          type={statusStyle.text}
          borderColor={statusStyle.backgroundColor}
        />
      )}
      {statusItems.map((item, index) => (
        <StatusItem
          key={index}
          label={item.title}
          checked={checkedItems[index]}
          isEditMode={isEditMode}
          icon={item.icon}
          onPress={() => handleCheckboxToggle(index)}
        />
      ))}
      {isEditMode && (
        <Button mode="contained" style={styles.button} onPress={submitStatus}>
          기록하기
        </Button>
      )}
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: '확인',
            onPress: () => {
              setVisible(false);
            },
            labelStyle: {color: color.white},
          }}
          duration={3000}
          style={styles.snackbarContainer}>
          건강일지 저장 완료!
        </Snackbar>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.gray[200],
    borderRadius: 10,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBox: {
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 12,
    color: color.white,
  },
  title: {
    fontSize: 22,
    color: color.gray[900],
  },
  changeBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: color.gray[200],
    backgroundColor: color.gray[50],
  },
  change: {
    fontSize: 12,
    color: color.gray[600],
  },
  subTitle: {
    marginBottom: 16,
    fontSize: 13,
  },
  button: {
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: color.blue[600],
  },
  snackbarContainer: {
    backgroundColor: color.blue[900],
    borderRadius: 8,
  },
});

export default Status;
