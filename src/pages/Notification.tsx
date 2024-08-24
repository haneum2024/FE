import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {getAlarmApi, patchAlarmApi} from '../api/fcmAlarmApi';
import CustomText from '../components/CustomText';
import NotificationCard from '../components/NotificationCard';
import LeftArrowIcon from '../img/LeftArrowIcon.svg';
import {getAccessToken} from '../storage/auth';
import {
  markNotificationAsRead,
  setNotifications,
} from '../store/reducers/notificationReducer';
import color from '../styles/color';
import type {ReportDogPageNavigation} from '../../types/navigation';
import type {NotificationType} from '../../types/notification';

interface NotificationProps {
  navigation: StackNavigationProp<ReportDogPageNavigation, 'Notification'>;
}

interface NotificationsState {
  notifications: NotificationType[];
}

const Notification = ({navigation}: NotificationProps) => {
  const dispatch = useDispatch();
  const notificationList = useSelector(
    (state: {notifications: NotificationsState}) =>
      state.notifications.notifications,
  );
  const [isLoading, setIsLoading] = useState(false);

  const moveToDetailPage = async ({
    id,
    boardId,
    type,
  }: {
    id: string;
    boardId: string;
    type: string;
  }) => {
    const accessToken = await getAccessToken();
    await patchAlarmApi({
      accessToken: accessToken as string,
      alarmId: id,
    });
    dispatch(markNotificationAsRead(id));

    if (type === 'LOST_DOG_FOUND') {
      navigation.navigate('FoundDetail', {id: boardId});
    } else {
      navigation.navigate('MissDetail', {id: boardId});
    }
  };

  const moveToPrevPage = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchNotification = async () => {
      setIsLoading(true);
      const accessToken = await getAccessToken();
      const alarmData = await getAlarmApi({
        accessToken: accessToken as string,
      });
      const alarmList = alarmData.data;

      dispatch(setNotifications(alarmList));
      setIsLoading(false);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotification();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <ScrollView style={styles.notificationContainer}>
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
      <Divider style={styles.divider200} />
      {isLoading ? (
        <View style={styles.empty}>
          <ActivityIndicator size={50} color={color.blue[600]} />
        </View>
      ) : (
        <>
          {notificationList.length === 0 ? (
            <View style={styles.empty}>
              <CustomText weight="500" style={styles.noText}>
                수신한 알림이 없습니다
              </CustomText>
            </View>
          ) : (
            notificationList.map((item: NotificationType) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.5}
                onPress={() =>
                  moveToDetailPage({
                    id: item.id,
                    boardId: item.boardId,
                    type: item.alarmType,
                  })
                }>
                <NotificationCard
                  alarmTitle={item.alarmTitle}
                  alarmDescription={item.alarmDescription}
                  type={item.alarmType}
                  location={item.location}
                  isRead={item.read}
                />
                <Divider style={styles.divider100} />
              </TouchableOpacity>
            ))
          )}
        </>
      )}
    </ScrollView>
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
    padding: 10,
    left: 14,
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
  divider200: {
    backgroundColor: color.gray[200],
  },
  divider100: {
    backgroundColor: color.gray[100],
  },
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 100,
  },
  noText: {
    fontSize: 14,
    color: color.gray[500],
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Notification;
