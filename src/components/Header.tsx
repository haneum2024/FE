import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import HeaderIcon from '../img/HeaderIcon.svg';
import ReadNotificationIcon from '../img/ReadNotificationIcon.svg';
import UnReadNotificationIcon from '../img/UnReadNotificationIcon.svg';
import {RootState} from '../store/reducer';
import {addNotification} from '../store/reducers/notificationReducer';
import color from '../styles/color';
import type {NotificationType} from '../../types/notification';

interface HeaderProps {
  navigation: NavigationProp<any>;
}

const Header = ({navigation}: HeaderProps) => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications,
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const newNotification: NotificationType = {
        id: remoteMessage.messageId || '',
        alarmTitle: remoteMessage.notification?.title || '',
        alarmDescription: remoteMessage.notification?.body || '',
        alarmType: remoteMessage.data?.alarmType as string,
        boardId: remoteMessage.data?.boardId as string,
        location: remoteMessage.data?.location as string,
        read: false,
      };
      dispatch(addNotification(newNotification));
    });

    return unsubscribe;
  }, [dispatch]);

  const moveToNotificationPage = () => {
    navigation.navigate('Notification');
  };

  const hasUnreadNotifications = notifications.some(
    (notification: any) => !notification.read,
  );

  return (
    <View style={styles.headerContainer}>
      <HeaderIcon style={styles.logo} width={40} height={40} />
      <TouchableOpacity
        style={styles.alarm}
        activeOpacity={0.8}
        onPress={moveToNotificationPage}>
        {hasUnreadNotifications ? (
          <UnReadNotificationIcon width={22} height={22} />
        ) : (
          <ReadNotificationIcon width={20} height={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 14,
    paddingVertical: 8,
    backgroundColor: color.white,
  },
  logo: {
    top: 7,
  },
  alarm: {
    padding: 10,
  },
});

export default Header;
