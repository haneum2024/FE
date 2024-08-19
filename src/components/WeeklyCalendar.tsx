import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import color from '../styles/color';
import CalendarIcon from '../img/CalendarIcon.svg';
import CustomText from './CustomText';
import {getAccessToken} from '../storage/auth';
import type {MainPageNavigation} from '../../types/navigation';
import {getWeeklyStatusApi} from '../api/statusApi';

type WeeklyCalendarDogProp = StackNavigationProp<MainPageNavigation, 'Home'>;

interface StatusDataItem {
  date: string;
  symptomColor: string;
}

const WeeklyCalendar = ({handleDate}: {handleDate: (date: string) => void}) => {
  const navigation = useNavigation<WeeklyCalendarDogProp>();

  const [selectedDate, setSelectedDate] = useState(moment());
  const [statusData, setStatusData] = useState<StatusDataItem[]>([]);
  const startOfWeek = selectedDate.clone().startOf('week');
  const daysOfWeek = [];

  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(startOfWeek.clone().add(i, 'days'));
  }

  const moveToHealthPage = () => {
    navigation.navigate('Health');
  };

  useEffect(() => {
    handleDate(selectedDate.format('YYYY-MM-DD'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    const fetchStatus = async () => {
      const accessToken = await getAccessToken();
      console.log('selectedDate', selectedDate.format('YYYY-MM-DD'));
      const status = await getWeeklyStatusApi({
        accessToken: accessToken as string,
        date: selectedDate.format('YYYY-MM-DD'),
      });
      const statusInfo = status.data;
      console.log('statusInfo', statusInfo);
      setStatusData(statusInfo);
    };

    fetchStatus();
  }, [selectedDate]);

  return (
    <View style={styles.weeklyContainer}>
      <TouchableOpacity activeOpacity={1} onPress={moveToHealthPage}>
        <View style={styles.navigationContainer}>
          <CalendarIcon width={30} height={30} />
          <CustomText weight="600" style={styles.navigationText}>
            {selectedDate.format('MM월 DD일')}
          </CustomText>
        </View>
      </TouchableOpacity>
      <View style={styles.daysLabelContainer}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <View key={index} style={styles.dayLabelBox}>
            <CustomText weight="500" style={styles.dayLabelText}>
              {day}
            </CustomText>
          </View>
        ))}
      </View>

      <View style={styles.daysContainer}>
        {daysOfWeek.map((day, index) => {
          const isSelected = day.isSame(selectedDate, 'day');

          const dateStatus = statusData.find(
            (status: any) => status.date === day.format('YYYY-MM-DD'),
          );
          const symptomColor = dateStatus
            ? dateStatus.symptomColor
            : color.gray[50];

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDate(day)}
              activeOpacity={0.8}
              style={[
                styles.dayBox,
                {backgroundColor: isSelected ? color.white : symptomColor},
                {
                  borderColor:
                    !dateStatus && isSelected ? color.blue[400] : symptomColor,
                },
              ]}>
              <CustomText
                weight={isSelected ? '700' : '500'}
                style={[
                  styles.dayText,
                  {
                    color: isSelected
                      ? dateStatus
                        ? symptomColor
                        : color.blue[600]
                      : dateStatus
                      ? color.white + '80'
                      : color.gray[400],
                  },
                ]}>
                {day.format('D')}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weeklyContainer: {
    padding: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    backgroundColor: color.white,
    borderRadius: 8,
    shadowColor: color.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  navigationText: {
    fontSize: 16,
    color: color.gray[950],
  },
  daysLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayLabelBox: {
    width: 40,
    alignItems: 'center',
  },
  dayLabelText: {
    fontSize: 14,
    color: color.gray[500],
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
  },
  dayText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: color.blue[600],
  },
});

export default WeeklyCalendar;
