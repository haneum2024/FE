import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {getAlarmApi} from '../api/fcmAlarmApi';
import CustomText from '../components/CustomText';
import LeftArrowIcon from '../img/LeftArrowIcon.svg';
import {getAccessToken} from '../storage/auth';
import color from '../styles/color';
import type {ReportDogPageNavigation} from '../../types/navigation';
import {Divider} from 'react-native-paper';

interface NotificationProps {
  navigation: StackNavigationProp<ReportDogPageNavigation, 'Notification'>;
}

const Notification = ({navigation}: NotificationProps) => {
  const [notificationList, setNotificationList] = useState([]);
  const [boardId, setBoardId] = useState('');

  const moveToDetailPage = () => {
    navigation.navigate('FoundDetail', {id: boardId});
  };

  const moveToPrevPage = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchNotification = async () => {
      const accessToken = await getAccessToken();
      const alarmData = await getAlarmApi({
        accessToken: accessToken as string,
      });
      const alarmList = alarmData.data;
      setNotificationList(alarmList);
      console.log('alarmList', alarmList);
    };

    fetchNotification();
  }, []);

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.prevBox}
          onPress={moveToPrevPage}
          activeOpacity={0.8}>
          <LeftArrowIcon width={15} height={15} fill={color.blue[600]} />
          <CustomText weight="500" style={styles.prevText}>
            뒤로
          </CustomText>
        </TouchableOpacity>
        <CustomText weight="600" style={styles.title}>
          알림
        </CustomText>
      </View>
      <Divider />
      {notificationList.length !== 0 ? (
        <View>
          <CustomText weight="500" style={styles.noText}>
            수신한 알림이 없습니다
          </CustomText>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    // paddingHorizontal: 24,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginVertical: 14,
  },
  prevBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 24,
    gap: 10,
  },
  prevText: {
    fontSize: 12,
    color: color.blue[600],
  },
  title: {
    fontSize: 16,
    color: color.gray[950],
  },
  noText: {
    fontSize: 14,
    color: color.gray[500],
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default Notification;
