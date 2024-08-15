import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {getBoardApi} from '../../api/petSearchApi';
import CustomText from '../../components/CustomText';
import MissCard from '../../components/MissCard';
import ReportIcon from '../../components/Icons/ReportIcon';
import {getAccessToken} from '../../storage/auth';
import color from '../../styles/color';
import TopArrowIcon2 from '../../img/TopArrowIcon2.svg';
import type {ReportDogPageNavigation} from '../../../types/navigation';

type MissNavigationProp = StackNavigationProp<
  ReportDogPageNavigation,
  'MissPost'
>;

function Miss() {
  const navigation = useNavigation<MissNavigationProp>();

  const scrollViewRef = useRef<ScrollView>(null);
  const [missBoard, setMissBoard] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowButton(offsetY > 200);
  };

  const moveToPostPage = () => {
    navigation.navigate('MissPost');
  };

  const getMissDog = async () => {
    const accessToken = await getAccessToken();
    const missDog = await getBoardApi({
      accessToken: accessToken as string,
      postType: 'OWNER',
      page: 1,
      size: 100,
    });
    console.log(missDog.data);
  };

  // useEffect(() => {
  //   const getMissBoard = async () => {
  //     const accessToken = await getAccessToken();
  //     const missBoardPosts = await getBoardApi({
  //       accessToken: accessToken as string,
  //       postType: 'OWNER',
  //       page: 1,
  //       size: 100,
  //     });
  //     console.log(missBoardPosts.data);
  //   };

  //   getMissBoard();
  // }, []);

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.missFoundContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <MissCard
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-4.png'
          }
          title="강아지를 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          dogAge={8}
          missingLocation="동작구"
          missingDate="2023년 12월 23일"
        />
        <MissCard
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-5.png'
          }
          title="강아지를 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          dogAge={8}
          missingLocation="동작구"
          missingDate="2023년 12월 23일"
        />
        <MissCard
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-6.png'
          }
          title="강아지를 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          dogAge={8}
          missingLocation="동작구"
          missingDate="2023년 12월 23일"
        />
        <MissCard
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-1.png'
          }
          title="강아지를 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          dogAge={8}
          missingLocation="동작구"
          missingDate="2023년 12월 23일"
        />
      </ScrollView>
      {showButton && (
        <TouchableOpacity style={styles.arrowButton} onPress={scrollToTop}>
          <TopArrowIcon2 />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.reportButton}
        onPress={moveToPostPage}
        activeOpacity={0.8}>
        <ReportIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  missFoundContainer: {},
  reportButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: color.blue[600],
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.gray[200],
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Miss;
