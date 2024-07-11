import React from 'react';
import {View, StyleSheet} from 'react-native';
import color from '../styles/color';
import CustomText from './CustomText';
import IconBox from './IconBox';

import CautionIcon from '../img/CautionIcon.svg';
import SearchNoticeIcon from '../img/SearchNoticeIcon.svg';

const MissFound = () => {
  const pressMissingReport = () => {
    console.log('missing report');
  };

  const pressSearchingReport = () => {
    console.log('searching report');
  };

  return (
    <View style={styles.missFoundContainer}>
      <CustomText style={styles.title}>실종/발견</CustomText>
      <View style={styles.iconContainer}>
        <IconBox
          text={'실종 신고'}
          icon={<CautionIcon />}
          onPress={pressMissingReport}
        />
        <IconBox
          text={'발견 검색/신고'}
          icon={<SearchNoticeIcon />}
          onPress={pressSearchingReport}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  missFoundContainer: {
    marginHorizontal: 24,
    marginVertical: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: color.gray[950],
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
});

export default MissFound;
