import React from 'react';
import {View, StyleSheet} from 'react-native';

import color from '../styles/color';
import CustomText from './CustomText';
import IconBox from './IconBox';

import ProfileIcon from './Icons/ProfileIcon';
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
      <CustomText weight="700" style={styles.title}>
        실종/발견
      </CustomText>
      <View style={styles.iconContainer}>
        <IconBox
          label={'반려견 실종'}
          text={'반려견을 찾아요'}
          icon={<ProfileIcon width={40} height={40} fill={color.blue[600]} />}
          onPress={pressMissingReport}
        />
        <IconBox
          label={'유기견 발견'}
          text={'주인을 찾아요'}
          icon={<SearchNoticeIcon width={40} height={40} />}
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
    color: color.gray[950],
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
});

export default MissFound;
