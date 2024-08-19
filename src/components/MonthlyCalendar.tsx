import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {Menu} from 'react-native-paper';

import {getMonthlyStatusApi} from '../api/statusApi';
import BottomArrowIcon from '../img/BottomArrowIcon.svg';
import CalendarIcon from '../img/CalendarIcon.svg';
import {getAccessToken} from '../storage/auth';
import color from '../styles/color';
import CustomText from './CustomText';

interface StatusDataItem {
  date: string;
  symptomColor: string;
}

const MonthlyCalendar = ({
  handleDate,
}: {
  handleDate: (date: string) => void;
}) => {
  const currentYear = moment().year();
  const currentDay = moment().date();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [statusData, setStatusData] = useState<StatusDataItem[]>([]);
  const [yearMenuVisible, setYearMenuVisible] = useState(false);
  const [monthMenuVisible, setMonthMenuVisible] = useState(false);

  const startOfMonth = moment([selectedYear, selectedMonth]);
  const daysInMonth = startOfMonth.daysInMonth();
  const daysArray: (moment.Moment | null)[][] = [];

  let weeks: (moment.Moment | null)[] = [];

  const startDayOfWeek = startOfMonth.day();
  for (let i = 0; i < startDayOfWeek; i++) {
    weeks.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    weeks.push(startOfMonth.clone().date(i));

    if (weeks.length === 7) {
      daysArray.push(weeks);
      weeks = [];
    }
  }

  if (weeks.length > 0) {
    while (weeks.length < 7) {
      weeks.push(null);
    }
    daysArray.push(weeks);
  }

  useEffect(() => {
    handleDate(selectedDate.format('YYYY-MM-DD'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    const fetchStatus = async () => {
      const accessToken = await getAccessToken();
      const formatMonth =
        selectedMonth + 1 < 10 ? `0${selectedMonth + 1}` : selectedMonth + 1;
      const status = await getMonthlyStatusApi({
        accessToken: accessToken as string,
        date: `${selectedYear}-${formatMonth}-15`,
      });
      setStatusData(status.data);
    };

    fetchStatus();
  }, [selectedYear, selectedMonth, selectedDate]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedDate(moment([year, selectedMonth]));
    setYearMenuVisible(false);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setSelectedDate(moment([selectedYear, month, currentDay]));
    setMonthMenuVisible(false);
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.headerContainer}>
        <CalendarIcon width={30} height={30} />
        <View style={styles.slideContainer}>
          <Menu
            visible={yearMenuVisible}
            contentStyle={styles.menuContent}
            onDismiss={() => setYearMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => setYearMenuVisible(true)}>
                <View style={styles.buttonView}>
                  <CustomText weight="500" style={styles.text}>
                    {selectedYear}
                  </CustomText>
                  <BottomArrowIcon
                    width={12}
                    height={12}
                    fill={color.gray[700]}
                  />
                </View>
              </TouchableOpacity>
            }>
            {[...Array(currentYear - 2020 + 1)].map((_, index) => (
              <Menu.Item
                key={index}
                style={styles.menuItem}
                titleStyle={styles.text}
                onPress={() => handleYearChange(2020 + index)}
                title={2020 + index}
              />
            ))}
          </Menu>

          <Menu
            visible={monthMenuVisible}
            contentStyle={styles.menuContent}
            onDismiss={() => setMonthMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => setMonthMenuVisible(true)}>
                <View style={styles.buttonView}>
                  <CustomText weight="500" style={styles.text}>
                    {selectedMonth + 1}
                  </CustomText>
                  <BottomArrowIcon
                    width={12}
                    height={12}
                    fill={color.gray[700]}
                  />
                </View>
              </TouchableOpacity>
            }>
            {moment.months().map((_, index) => (
              <Menu.Item
                key={index}
                style={styles.menuItem}
                titleStyle={styles.text}
                onPress={() => handleMonthChange(index)}
                title={index + 1}
              />
            ))}
          </Menu>
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <CustomText weight="600" style={styles.navigationText}>
          {selectedDate.format('YYYY년 MM월 DD일')}
        </CustomText>
      </View>

      <View style={styles.daysLabelContainer}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <View key={index} style={styles.dayLabelBox}>
            <CustomText weight="500" style={styles.dayLabelText}>
              {day}
            </CustomText>
          </View>
        ))}
      </View>

      {daysArray.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekContainer}>
          {week.map((day, dayIndex) => {
            if (day === null) {
              return <View key={dayIndex} style={styles.emptyDayBox} />;
            }

            const isSelected = day.isSame(selectedDate, 'day');

            const dateStatus = statusData.find(
              (status: any) => status.date === day.format('YYYY-MM-DD'),
            );
            const symptomColor = dateStatus
              ? dateStatus.symptomColor
              : color.gray[50];

            return (
              <TouchableOpacity
                key={dayIndex}
                onPress={() => setSelectedDate(day)}
                activeOpacity={0.8}
                style={[
                  styles.dayBox,
                  {backgroundColor: isSelected ? color.white : symptomColor},
                  {
                    borderColor:
                      !dateStatus && isSelected
                        ? color.blue[400]
                        : symptomColor,
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
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  slideContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  navigationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.blue[200],
    backgroundColor: color.blue[50],
  },
  navigationText: {
    fontSize: 16,
    color: color.blue[950],
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.gray[200],
    backgroundColor: color.gray[50],
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuContent: {
    borderRadius: 10,
    backgroundColor: color.gray[50],
  },
  menuItem: {
    height: 35,
    backgroundColor: color.gray[50],
  },
  text: {
    fontSize: 12,
    color: color.gray[700],
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
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  emptyDayBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default MonthlyCalendar;
