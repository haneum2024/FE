import React, {useCallback, useRef, useState} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {getOtherMissApi, getUserMissApi} from '../../api/petSearchApi';
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
  const [userMissBoard, setUserMissBoard] = useState<any[]>([]);
  const [otherMissBoard, setOtherMissBoard] = useState<any[]>([]);
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

  const callbackFunction = () => {
    fetchMissBoards();
  };

  const fetchMissBoards = async () => {
    try {
      const accessToken = await getAccessToken();
      const userMissPost = await getUserMissApi({
        accessToken: accessToken as string,
      });
      const otherMissPost = await getOtherMissApi({
        accessToken: accessToken as string,
        page: 1,
        size: 100,
      });
      setUserMissBoard(userMissPost.data);
      setOtherMissBoard(otherMissPost.data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMissBoards();
    }, []),
  );

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.missFoundContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {userMissBoard.length > 0 &&
          userMissBoard.map(post => (
            <MissCard
              key={post.id}
              id={post.id}
              isMyPost={true}
              image={post.imageUrlList[0] || ''}
              title={post.title}
              dogGender={post.petGender === 'MALE' ? '수컷' : '암컷'}
              dogBreed={post.petBreed}
              dogAge={post.age}
              missingLocation={post.specificLocation}
              missingDate={post.lostDateTime.replace('T', ' ').slice(0, 16)}
              callback={callbackFunction}
            />
          ))}
        {otherMissBoard.length > 0 &&
          otherMissBoard.map(post => (
            <MissCard
              key={post.id}
              id={post.id}
              image={post.imageUrlList[0] || ''}
              title={post.title}
              dogGender={post.petGender === 'MALE' ? '수컷' : '암컷'}
              dogBreed={post.petBreed}
              dogAge={post.age}
              missingLocation={post.specificLocation}
              missingDate={post.lostDateTime.replace('T', ' ').slice(0, 16)}
            />
          ))}
        <MissCard
          id="1"
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
          id="2"
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
          id="3"
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
          id="4"
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
