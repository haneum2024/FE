import React from 'react';
import {StyleSheet, View} from 'react-native';

import color from '../styles/color';
import CustomText from './CustomText';
import ReportIcon from './Icons/ReportIcon';
import MissFoundIcon from './Icons/MissFoundIcon';

const NotificationCard = ({
  alarmTitle,
  alarmDescription,
  type,
  location,
  isRead,
}: {
  alarmTitle: string;
  alarmDescription: string;
  type: string;
  location: string;
  isRead: boolean;
}) => {
  const isFoundNotification = type === 'LOST_DOG_FOUND';
  const notificationColor = isRead
    ? color.gray[400]
    : isFoundNotification
    ? color.orange[600]
    : color.blue[600];

  return (
    <View style={styles.notificationCardContainer}>
      <View style={styles.header}>
        <View style={styles.main}>
          {isFoundNotification ? (
            <ReportIcon width={20} height={20} fill={notificationColor} />
          ) : (
            <MissFoundIcon
              width={20}
              height={20}
              fill={notificationColor}
              stroke={notificationColor}
            />
          )}
          <CustomText
            weight="500"
            style={[styles.title, {color: notificationColor}]}>
            {alarmTitle}
          </CustomText>
        </View>
        <CustomText
          weight="400"
          style={[styles.title, {color: color.gray[400]}]}>
          {location}
        </CustomText>
      </View>
      <CustomText
        weight="500"
        style={[
          styles.content,
          {color: isRead ? color.gray[400] : color.gray[700]},
        ]}>
        {alarmDescription}
      </CustomText>
      {!isRead && <View style={styles.dot} />}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationCardContainer: {
    display: 'flex',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    backgroundColor: color.white,
  },
  title: {
    fontSize: 13,
  },
  content: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  dot: {
    position: 'absolute',
    width: 6,
    height: 6,
    top: 12,
    right: 12,
    borderRadius: 100,
    backgroundColor: color.orange[700],
  },
});

export default NotificationCard;
