import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';

import CustomText from '../components/CustomText';

LocaleConfig.locales.kr = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};

LocaleConfig.defaultLocale = 'kr';

const Calendar = () => {
  const today = new Date().toISOString().split('T')[0]; // 현재 날짜를 'YYYY-MM-DD' 형식으로 가져옴

  return (
    <View style={styles.CalendarContainer}>
      <View style={styles.CalendarText}>
        <CustomText>{today}</CustomText>
      </View>
      <CalendarList
        // Enable horizontal scrolling
        horizontal
        // Enable paging on horizontal, default = false
        pagingEnabled
        // Specify a custom height for the calendar
        calendarHeight={300}
        // Initially visible month. Default = Date()
        current={today}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        //   minDate={'2023-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        //   maxDate={'2023-07-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={false}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onVisibleMonthsChange={months => {
          console.log('now these months are visible', months);
        }}
        markedDates={{
          [today]: {
            selected: true,
            marked: true,
            selectedColor: 'blue',
            selectedTextColor: 'yellow',
            dotColor: 'red',
            activeOpacity: 0.5,
            disabled: false,
            disableTouchEvent: false,
            customStyles: {
              container: {
                backgroundColor: 'green',
              },
              text: {
                color: 'yellow',
                fontWeight: 'bold',
              },
            },
          },
          ['2023-06-11']: {
            marked: true,
            dotColor: 'orange',
          },
          '2023-06-12': {
            disabled: true,
            disableTouchEvent: true,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  CalendarContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  CalendarText: {
    backgroundColor: 'red',
  },
  agenda: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default Calendar;
